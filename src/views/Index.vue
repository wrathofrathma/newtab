<template>
  <default class="h-screen">
    <template #image>
      <img alt="Vue logo" src="@/assets/cat.gif" class="w-1/3" />
    </template>

    <div class="flex flex-col p-24 gap-16">
      <search></search>
      <div class="flex flex-row gap-20">
        <link-tree category="work"></link-tree>
        <link-tree category="dev"></link-tree>
        <link-tree category="reddit"></link-tree>
        <link-tree category="play"></link-tree>
      </div>
    </div>
  </default>
</template>

<script setup lang="ts">
import Default from "@/layouts/Default.vue";
import LinkTree from "@/components/LinkTree.vue";
import Search from "@/components/Search.vue";
</script>
