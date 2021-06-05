<template>
    <article class="list-block">
        <h3 class="list-block__title">List {{ list.id }}</h3>

        <button class="list-block__toggle-switch" @click="toggleListStatus">
            {{ list.status === 'sorted' ? 'Mix' : 'Sort' }}
        </button>

        <!-- Blocks (if sorted) -->
        <div
            class="list-block__blocks-wrapper"
            v-if="list.status === 'sorted'"
        >
            <div
                class="list-block__blocks"
                v-for="listItem in list.items"
                :key="listItem.id"
                v-show="listItem.value > 0"
            >
                <div
                    class="list-block__item-block"
                    v-for="i in listItem.value"
                    :key="i"
                    :style="{'background-color': listItem.color}"
                    @click="removeBlock(listItem.id)"
                >
                </div>
            </div>
        </div>

        <!-- Blocks (if mixed) -->
        <div
            class="list-block__blocks-wrapper"
            v-else
        >
            <div class="list-block__blocks">
                <div
                    class="list-block__item-block"
                    v-for="(obj, idx) in mixListItems()"
                    :key="idx"
                    :style="{'background-color': obj.color}"
                    @click="removeBlock(obj.listItemId)"
                >
                </div>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
import { IList, IListItem } from '@/store/types';
import Vue, { PropType } from 'vue';

export default Vue.extend({
    name: 'ListBlock',
    props: {
        list: Object as PropType<IList>,
    },
    methods: {
        mixListItems(): Array<{ listItemId: IListItem['id'], color: IListItem['color'] }> {
            // eslint-disable-next-line arrow-body-style
            return this.list.items.flatMap((listItem) => {
                return Array.from({ length: listItem.value }, () => ({
                    listItemId: listItem.id,
                    color: listItem.color,
                }));
            }).sort(() => Math.random() - 0.5);
        },
        removeBlock(listItemId: IListItem['id']): void {
            this.$store.dispatch(
                'decreaseListItemValue',
                {
                    listId: this.list.id,
                    listItemId,
                },
            );
        },
        toggleListStatus(): void {
            this.$store.dispatch(
                'setListStatus',
                {
                    listId: this.list.id,
                    status: this.list.status === 'sorted' ? 'mixed' : 'sorted',
                },
            );
        },
    },
});
</script>

<style lang="scss" scoped>
.list-block {
    position: relative;
    padding: 1rem;
    border: 1px solid #000;
    border-radius: 0.5rem;
}

.list-block__title {
    margin-bottom: 1.5rem;
}

.list-block__toggle-switch {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.4rem;
    cursor: pointer;
}

.list-block__blocks {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.7rem;

    &:last-child {
        margin-bottom: 0;
    }
}

.list-block__item-block {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #000;
    border-radius: 0.2rem;
    margin-right: 0.3rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
}
</style>
