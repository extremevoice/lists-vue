<template>
    <li class="list-item">
        <div class="list-item__right-section">
            <slot name="checkbox" />
            <label :for="`list-item-choice-${listItem.id}`">
                <h4 class="list_item__title">Item {{ listItem.id }}</h4>
            </label>
        </div>
        <div class="list-item__left-section">
            <input
                class="list-item__value"
                type="number"
                min="0"
                :value="listItem.value"
                @change="changeValue($event.target.value)"
            />
            <input
                class="list-item__color"
                type="color"
                :value="listItem.color"
                @change="changeColor($event.target.value)"
            />
        </div>
    </li>
</template>

<script lang="ts">2
import Vue, { PropType } from 'vue';
import { IListItem } from '@/store/types';

export default Vue.extend({
    name: 'ListItem',
    props: {
        listId: Number as PropType<number>,
        listItem: Object as PropType<IListItem>,
    },
    methods: {
        changeValue(value: number): void {
            this.$store.dispatch(
                'setListItemValue',
                {
                    listId: this.listId,
                    listItemId: this.listItem.id,
                    data: value,
                },
            );
        },
        changeColor(color: string): void {
            this.$store.dispatch(
                'setListItemColor',
                {
                    listId: this.listId,
                    listItemId: this.listItem.id,
                    data: color,
                },
            );
        },
    },
});
</script>

<style lang="scss" scoped>
.list-item {
    max-width: 60rem;
    display: flex;
    justify-content: space-between;

    &__right-section, &__left-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__checkbox, &__value {
        margin-right: 1rem;
    }

    &__value {
        width: 10rem;
    }
}
</style>
