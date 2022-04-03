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
        v-for="(link, index) in category.links"
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
  title: string;
  category: { link: string; links: { [key: string]: string } };
}>();
</script>
