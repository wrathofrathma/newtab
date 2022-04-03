<template>
  <default class="h-screen">
    <template #image>
      <img alt="Vue logo" src="@/assets/cat.gif" class="w-1/3" />
    </template>

    <div class="flex flex-col p-24 gap-16">
      <terminal></terminal>
      <div class="flex flex-row gap-20">
        <link-tree
          v-for="category in categories"
          :category="category"
        ></link-tree>
      </div>
    </div>
  </default>
</template>

<script setup lang="ts">
import Default from "@/layouts/Default.vue";
import LinkTree from "@/components/LinkTree.vue";
import Terminal from "@/components/Terminal.vue";
import { useCategoryStore } from "../store/category";
import { storeToRefs } from "pinia";

const store = useCategoryStore();
const categories = storeToRefs(store).categoryList;
</script>
