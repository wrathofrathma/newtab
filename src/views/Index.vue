<template>
  <default class="h-screen">
    <template #image>
      <img alt="Vue logo" src="@/assets/cat.gif" class="w-1/3" />
    </template>

    <div class="flex flex-col p-24 gap-16">
      <terminal></terminal>
      <div class="flex flex-row gap-20">
        <link-tree
          v-for="(category, index) in categories"
          :title="index"
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
const categories = storeToRefs(store).categories;
// TODO Fix scaling / styling
// TODO ADd maximium number of categories? MAke them btiches wrap?
// TODO Fix the favicon
// TODO Add theme support
</script>
