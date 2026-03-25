<template>
  <BaseModal @close="close">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gruvbox-dark-fg-1">
          Rename Category
        </h2>
        <p class="mt-1 text-sm text-gruvbox-dark-fg-3">
          Rename an existing category while keeping all links.
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
        <div class="mb-1 text-sm font-bold text-gruvbox-dark-fg-1">Current</div>
        <input
          :value="originalName"
          type="text"
          disabled
          class="w-full rounded-md border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-3 py-2 text-sm text-gruvbox-dark-fg-3"
        />
      </label>

      <label class="block">
        <div class="mb-1 text-sm font-bold text-gruvbox-dark-fg-1">
          New Name
        </div>
        <input
          v-model="nextName"
          type="text"
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
          Rename
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import BaseModal from "./BaseModal.vue";
import { useCategoryStore } from "../store/category";
import { useUiStore } from "../store/ui";

const uiStore = useUiStore();
const categoryStore = useCategoryStore();

const categoryEditContext = storeToRefs(uiStore).categoryEditContext;

const originalName = ref("");
const nextName = ref("");
const error = ref("");

watch(
  categoryEditContext,
  (context) => {
    if (!context) {
      return;
    }

    originalName.value = context.name;
    nextName.value = context.name;
    error.value = "";
  },
  { immediate: true },
);

function close() {
  uiStore.closeModal();
}

function submit() {
  const ok = categoryStore.renameCategory(originalName.value, nextName.value);

  if (!ok) {
    error.value = "Could not rename category (duplicate or empty name).";
    return;
  }

  close();
}
</script>
