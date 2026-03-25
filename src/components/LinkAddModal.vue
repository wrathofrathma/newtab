<template>
  <BaseModal @close="close">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gruvbox-dark-fg-1">Add Link</h2>
        <p class="mt-1 text-sm text-gruvbox-dark-fg-3">
          Quick form for adding a link to a category.
        </p>
      </div>
      <button
        class="rounded-md border border-gruvbox-dark-bg-3 px-3 py-1 text-sm text-gruvbox-dark-fg-2 hover:border-gruvbox-dark-bg-4 hover:text-gruvbox-dark-fg-1"
        @click="close"
      >
        Esc
      </button>
    </div>

    <form class="mt-5 space-y-4" @submit.prevent="submit">
      <label class="block">
        <div class="mb-1 text-sm font-bold text-gruvbox-dark-fg-1">
          Category
        </div>
        <select
          v-model="category"
          class="w-full rounded-md border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-0 px-3 py-2 text-sm text-gruvbox-dark-fg-1 outline-none focus:border-gruvbox-dark-blue-1"
        >
          <option disabled value="">Select a category</option>
          <option v-for="name in categoryNames" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </label>

      <label class="block">
        <div class="mb-1 text-sm font-bold text-gruvbox-dark-fg-1">Title</div>
        <input
          v-model="title"
          type="text"
          placeholder="GitHub"
          class="w-full rounded-md border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-0 px-3 py-2 text-sm text-gruvbox-dark-fg-1 outline-none focus:border-gruvbox-dark-blue-1"
        />
      </label>

      <label class="block">
        <div class="mb-1 text-sm font-bold text-gruvbox-dark-fg-1">URL</div>
        <input
          v-model="url"
          type="text"
          placeholder="https://github.com"
          class="w-full rounded-md border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-0 px-3 py-2 text-sm text-gruvbox-dark-fg-1 outline-none focus:border-gruvbox-dark-blue-1"
        />
      </label>

      <p v-if="error" class="text-sm text-gruvbox-dark-red-1">{{ error }}</p>

      <div
        class="flex justify-end gap-3 border-t border-gruvbox-dark-bg-2 pt-4"
      >
        <button
          type="button"
          class="rounded-md border border-gruvbox-dark-bg-3 px-4 py-2 text-sm text-gruvbox-dark-fg-2 hover:border-gruvbox-dark-bg-4 hover:text-gruvbox-dark-fg-1"
          @click="close"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md border border-gruvbox-dark-aqua-0 bg-gruvbox-dark-aqua-0/20 px-4 py-2 text-sm text-gruvbox-dark-aqua-1 hover:bg-gruvbox-dark-aqua-0/30"
        >
          Add Link
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import BaseModal from "./BaseModal.vue";
import { useCategoryStore } from "../store/category";
import { useUiStore } from "../store/ui";

const categoryStore = useCategoryStore();
const uiStore = useUiStore();

const categories = storeToRefs(categoryStore).categories;
const categoryNames = computed(() => Object.keys(categories.value));

const category = ref(categoryNames.value[0] ?? "");
const title = ref("");
const url = ref("");
const error = ref("");

function close() {
  uiStore.closeModal();
}

function submit() {
  if (!category.value) {
    error.value = "Select a category.";
    return;
  }

  if (!title.value.trim()) {
    error.value = "Title is required.";
    return;
  }

  if (!url.value.trim()) {
    error.value = "URL is required.";
    return;
  }

  categoryStore.addLink(category.value, title.value.trim(), url.value.trim());
  close();
}
</script>
