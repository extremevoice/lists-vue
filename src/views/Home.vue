<template>
  <div class="home fullscreen-wrapper">
      <section class="home__lists">
        <app-list
            class="home__list"
            v-for="list in lists"
            :key="list.id"
            :list="list"
        ></app-list>
      </section>
      <section class="home__list-blocks">
          <app-list-block
            class="home__list-block"
            v-for="list in lists"
            :key="list.id"
            :list="list"
          ></app-list-block>
      </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import List from '@/components/list/List.vue';
import ListBlock from '@/components/list/ListBlock.vue';

export default Vue.extend({
    name: 'Home',
    components: {
        'app-list': List,
        'app-list-block': ListBlock,
    },
    computed: mapState({
        lists: (state: any) => state.lists.lists,
    }),
});
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    justify-content: space-between;
    padding: 2rem;

    &__lists, &__list-blocks {
        width: 45%;
    }

    &__lists {
        border: 0.1rem solid #000;
        border-radius: 0.5rem;
        padding: 1rem;
    }

    &__list {
        margin-bottom: 2rem;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__list-block {
        margin-bottom: 2rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

@media screen and (max-width: 780px) {
    .home {
        
        &__lists, &__list-blocks {
            width: 49%;
        }
    }
}

@media screen and (max-width: 700px) {
    .home {
        flex-direction: column;

        &__lists, &__list-blocks {
            width: 100%;
        }

        &__lists {
            margin-bottom: 2rem;
        }
    }
}
</style>
