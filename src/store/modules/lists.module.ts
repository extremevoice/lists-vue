import { Module } from 'vuex';
import { DECREASE_LIST_ITEM_VALUE, SET_LIST_ITEM_COLOR, SET_LIST_ITEM_VALUE, SET_LIST_STATUS } from '../mutation-types';
import { IListsState, TPayload, IRootState, TListItemPayload, IListItem, TListsContext, IListPayload } from '../types';

const pallet = [
    '#ffadad', '#ffd6a5', 
    '#fdffb6', '#caffbf', 
    '#9bf6ff', '#a0c4ff', 
    '#bdb2ff', '#ffc6ff', 
    '#fffffc', '#6d6875',
];

/**
 * Changes ListItem field according to provided fn
 */
function changeListItem(
    state: IListsState,
    listId: number, 
    listItemId: number,
    fn: (listItem: IListItem) => void,
): void {
    state.lists[listId]?.items.every(listItem => {
        if (listItem.id === listItemId) {
            fn(listItem);
            return false;
        }

        return true;
    });
}

export const defaultState: IListsState = {
    lists: {
        1: {
            id: 1,
            items: [
                {
                    id: 1,
                    value: 10,
                    color: pallet[0],
                },
                {
                    id: 2,
                    value: 16,
                    color: pallet[1],
                },
                {
                    id: 3,
                    value: 40,
                    color: pallet[3],
                },
                {
                    id: 4,
                    value: 0,
                    color: pallet[4],
                },
            ],
            status: 'sorted',
        },
        2: {
            id: 2,
            items: [
                {
                    id: 1,
                    value: 1,
                    color: pallet[5],
                },
                {
                    id: 2,
                    value: 12,
                    color: pallet[6],
                },
                {
                    id: 3,
                    value: 20,
                    color: pallet[7],
                },
                {
                    id: 4,
                    value: 6,
                    color: pallet[8],
                },
            ],
            status: 'sorted',
        },
        3: {
            id: 3,
            items: [
                {
                    id: 1,
                    value: 32,
                    color: pallet[9],
                },
                {
                    id: 2,
                    value: 9,
                    color: pallet[0],
                },
                {
                    id: 3,
                    value: 50,
                    color: pallet[1],
                },
                {
                    id: 4,
                    value: 4,
                    color: pallet[2],
                },
            ],
            status: 'sorted',
        },
        4: {
            id: 4,
            items: [
                {
                    id: 1,
                    value: 15,
                    color: pallet[3],
                },
                {
                    id: 2,
                    value: 12,
                    color: pallet[4],
                },
                {
                    id: 3,
                    value: 20,
                    color: pallet[5],
                },
                {
                    id: 4,
                    value: 100,
                    color: pallet[6],
                },
            ],
            status: 'mixed',
        },
        5: {
            id: 5,
            items: [
                {
                    id: 2,
                    value: 1,
                    color: pallet[7],
                },
                {
                    id: 3,
                    value: 12,
                    color: pallet[8],
                },
                {
                    id: 4,
                    value: 20,
                    color: pallet[9],
                },
                {
                    id: 5,
                    value: 6,
                    color: pallet[0],
                },
            ],
            status: 'mixed',
        },
    },
};

export const mutations = {
    [DECREASE_LIST_ITEM_VALUE](state: IListsState, { listId, listItemId }: TPayload): void {
        changeListItem(
            state, 
            listId, 
            listItemId, 
            (listItem) => { listItem.value -= 1; },
        );
    },
    [SET_LIST_ITEM_VALUE](
        state: IListsState, 
        { listId, listItemId, data: value }: TListItemPayload
    ): void {
        changeListItem(
            state,
            listId,
            listItemId,
            (listItem) => { listItem.value = Number(value); },
        );
    },
    [SET_LIST_ITEM_COLOR](
        state: IListsState, 
        { listId, listItemId, data: color }: TListItemPayload
    ): void {
        changeListItem(
            state,
            listId,
            listItemId,
            (listItem) => { listItem.color = String(color); },
        );
    },
    [SET_LIST_STATUS](state: IListsState, { listId, status }: IListPayload): void {
        const list = state.lists[listId];
        if (list) {
            list.status = status;
        }
    },
};

export const actions = {
    decreaseListItemValue(ctx: TListsContext, payload: TPayload): void {
        ctx.commit(DECREASE_LIST_ITEM_VALUE, payload);
    },
    setListItemValue(ctx: TListsContext, payload: TListItemPayload): void {
        ctx.commit(SET_LIST_ITEM_VALUE, payload);
    },
    setListItemColor(ctx: TListsContext, payload: TListItemPayload): void {
        ctx.commit(SET_LIST_ITEM_COLOR, payload);
    },
    setListStatus(ctx: TListsContext, payload: IListPayload): void {
        ctx.commit(SET_LIST_STATUS, payload);
    }
};

const listsModule: Module<IListsState, IRootState> = {
    state: () => defaultState,
    mutations,
    actions,
    getters: {},
};

export default listsModule;
