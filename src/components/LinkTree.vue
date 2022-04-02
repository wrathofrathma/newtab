<template>
  <div>
    <div class="font-bold text-xl" v-if="category_link">
      <a :href="category_link">{{ category }}</a>
    </div>
    <div class="font-bold text-xl" v-if="!category_link">
      {{ category }}
    </div>
    <div>
      <div
        v-for="(link, index) in links"
        class="text-gruvbox-dark-blue-1 text-base font-medium"
        style=""
      >
        <a :href="link">{{ index }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string;
}>();

import { useStore } from "../store";

const store = useStore();

const links = store.links(props.category);

const category_link = store.categoryLink(props.category);
</script>
