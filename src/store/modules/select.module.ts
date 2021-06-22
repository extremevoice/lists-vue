import { Module } from "vuex";
import { ADD_SELECTED_ITEM, ADD_WHOLE_LIST, REMOVE_SELECTED_ITEM, REMOVE_WHOLE_LIST } from "../mutation-types";
import { IList, IRootState, ISelectItemPayload, ISelectListPayload, ISelectState, TSelectContext } from "../types";

const defaultState: ISelectState = {
    selected: {
    },
};

export const mutations = {
    [ADD_SELECTED_ITEM](state: ISelectState, { listId, listItemId }: ISelectItemPayload): void {
        const items = state.selected[listId]
        if (items) {
            items.push(listItemId);
            state.selected[listId] = items;
        } else {
            state.selected[listId] = [listItemId];
        }
        
        state.selected = {...state.selected};
    },
    [REMOVE_SELECTED_ITEM](state: ISelectState, { listId, listItemId }: ISelectItemPayload): void {
        state.selected[listId] = state.selected[listId].filter((value) => value !== listItemId);
    },
    [ADD_WHOLE_LIST](state: ISelectState, { listId, selectedItems }: ISelectListPayload): void {
        state.selected[listId] = selectedItems;
        state.selected = {...state.selected};
    },
    [REMOVE_WHOLE_LIST](state: ISelectState, listId: IList['id'] ): void {
        state.selected[listId] = [];
    },
};

export const actions = {
    addSelectedItem(ctx: TSelectContext, payload: ISelectItemPayload): void {
        ctx.commit(ADD_SELECTED_ITEM, payload);
    },
    removeSelectedItem(ctx: TSelectContext, payload: ISelectItemPayload): void {
        ctx.commit(REMOVE_SELECTED_ITEM, payload);
    },
    addWholeList(ctx: TSelectContext, payload: ISelectListPayload): void {
        ctx.commit(ADD_WHOLE_LIST, payload);
    },
    removeWholeList(ctx: TSelectContext, payload: any): void {
        ctx.commit(REMOVE_WHOLE_LIST, payload);
    },
};

export const getters = {
    selectedItems: (state: ISelectState) => (listId: IList['id']): Array<number> => {
        return state.selected[listId] || [];
    },
};

const selectModule: Module<ISelectState, IRootState> = {
    state: () => defaultState,
    mutations,
    actions,
    getters,
};

export default selectModule;
