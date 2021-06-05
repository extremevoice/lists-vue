import { ActionContext } from "vuex";

export interface IList {
    id: number
    items: Array<IListItem>
    status: 'sorted' | 'mixed'
}

export interface IListItem {
    id: number
    value: number
    color: string
}

export type TPayload = {
    listId: IList['id']
    listItemId: IListItem['id']
}

export type TListItemPayload = TPayload & {
    data: IListItem['value'] | IListItem['color']
}

export interface IListPayload {
    listId: number
    status: IList['status']
}

export interface IListsState {
    lists: {[key: number]: IList}
}

export interface ISelectState {
    selected: TSelect
}

export interface ISelectItemPayload {
    listId: IList['id']
    listItemId: IListItem['id']
}

export interface ISelectListPayload {
    listId: IList['id']
    selectedItems: Array<number>
}

export type TSelect = {[key: number]: Array<number>};

export type TSelectContext = ActionContext<ISelectState, IRootState>;

export type TListsContext = ActionContext<IListsState, IRootState>;

export interface IRootState {
    lists: IListsState
    select: ISelectState
}
