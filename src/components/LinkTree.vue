<template>
  <div>
    <div class="font-bold text-xl" v-if="category.link">
      <a :href="category.link">{{ title }}</a>
    </div>
    <div class="font-bold text-xl" v-else>
      {{ title }}
    </div>
    <div>
      <div
        v-for="entry in links"
        :key="entry.title"
        class="text-gruvbox-dark-blue-1 text-base font-medium"
        style=""
      >
        <a :href="entry.url">{{ entry.title }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCategoryStore } from "../store/category";

const props = defineProps<{
  title: string;
  category: { link: string; links: { [key: string]: string } };
}>();

const categoryStore = useCategoryStore();
const links = computed(() => categoryStore.orderedLinks(props.title));
</script>
