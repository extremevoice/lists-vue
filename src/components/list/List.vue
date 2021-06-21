<template>
    <article class="list">
        <header class="list__header">
            <b-icon-caret-right-fill
                class="list__caret-icon"
                :class="{'list__caret-icon--active': opened}"
                @click="toggleList"
            />

            <input
                class="list__checkbox"
                :id="`full-list-choice-${list.id}`"
                type="checkbox"
                :indeterminate.prop="indeterminate"
                :checked="listSelected"
                @change="onListChange($event.target.checked)"
            />
            <label :for="`full-list-choice-${list.id}`">
                <h3 class="list__title">List {{ list.id }}</h3>
            </label>
        </header>

        <ul
            class="list__list-items" 
            :class="{'list__list-items--opened': opened}"
            ref="listItems"
        >
            <app-list-item
                class="list__list-item"
                v-for="listItem in list.items"
                :key="listItem.id"
                :listItem="listItem"
                :list-id="list.id"
            >
                <template #checkbox>
                    <input
                        class="list-item__checkbox"
                        :id="`list-item-choice-${listItem.id}`"
                        type="checkbox"
                        :value="listItem.id"
                        :checked="(selected[list.id] || []).includes(listItem.id)"
                        @change="onListItemChange(listItem.id, $event.target.checked)"
                    />
                </template>
            </app-list-item>
        </ul>
    </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { BIconCaretRightFill } from 'bootstrap-vue';

import { IList, IListItem } from '@/store/types';
import ListItem from './ListItem.vue';
import { mapState } from 'vuex';

export default Vue.extend({
    name: 'List',
    components: {
        'app-list-item': ListItem,
        BIconCaretRightFill,
    },
    props: {
        list: Object as PropType<IList>,
    },
    data: () => ({
        opened: false,
        listSelected: false,
        indeterminate: false,
    }),
    methods: {
        toggleList(): void {
            this.opened = !this.opened;
            const listItems = this.$refs.listItems as any;
            listItems.classList.toggle('list__list-items--opened');
            if (this.opened) {
                listItems.style.maxHeight = `${listItems.scrollHeight}px`;
            } else {
                listItems.style.maxHeight = null;
            }
        },
        onListItemChange(listItemId: IListItem['id'], checked: boolean): void {
            if (checked) {
                this.$store.dispatch(
                    'addSelectedItem',
                    {
                        listId: this.list.id,
                        listItemId,
                    },
                );
            } else {
                this.$store.dispatch(
                    'removeSelectedItem',
                    {
                        listId: this.list.id,
                        listItemId,
                    },
                );
            }
            this.indeterminate = this.isIndeterminate();
            this.listSelected = this.allSelected();
        },
        onListChange(checked: boolean): void {
            if (checked) {
                this.$store.dispatch(
                    'addWholeList',
                    {
                        listId: this.list.id,
                        selectedItems: this.list.items.map(ListItem => ListItem.id),
                    },
                );
            } else {
                this.$store.dispatch(
                    'removeWholeList',
                    this.list.id,
                );
            }
            this.listSelected = !this.listSelected;
        },
        isIndeterminate(): boolean {
            const selectedItems = this.selected[this.list.id] || [];
            return selectedItems.length > 0 && 
                selectedItems.length < this.list.items.length;
        },
        allSelected(): boolean {
            return (this.selected[this.list.id] || []).length >= this.list.items.length;
        },
    },
    computed: {
        ...mapState({
            selected: (state: any) => state.select.selected,
        }),
    },
});
</script>

<style lang="scss" scoped>
.list__header {
    width: 10.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .list__title {
        display: inline-block;
    }
}

.list__list-items {
    padding-left: 4.5rem;
    max-height: 0;
    will-change: max-height;
    overflow: hidden;
    transition: all 0.25s ease-out;
    opacity: 0;

    &--opened {
        opacity: 1;
    }
}

.list__list-item {
    margin-bottom: 1.1rem;

    &:first-child {
        margin-top: 1.1rem;
    }

    &:last-child {
        margin-bottom: 0;
    }
}

.list__caret-icon {
    cursor: pointer;
    transition: all 0.5s;

    &--active {
        transform: rotateZ(90deg);
    }
}
</style>
