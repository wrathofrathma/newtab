<template>
  <Default class="h-screen">
    <img
      alt="Vue logo"
      :src="heroImage || defaultHeroImage"
      class="h-auto w-[clamp(12rem,28vw,26rem)] object-contain"
    />

    <div class="flex flex-col p-24 gap-16">
      <Clock v-if="showClock" />
      <terminal></terminal>
      <div class="flex flex-row gap-20">
        <link-tree
          v-for="name in categoryList"
          :key="name"
          :title="name"
          :category="categories[name]"
        ></link-tree>
      </div>

      <div v-if="showPrivacyLink" class="mt-2 flex justify-end">
        <RouterLink
          to="/privacy"
          class="text-xs font-bold uppercase tracking-[0.24em] text-gruvbox-dark-fg-4 transition hover:text-gruvbox-dark-aqua-1"
        >
          Privacy
        </RouterLink>
      </div>
    </div>

    <HelpModal v-if="activeModal === 'help'" />
    <HistoryModal v-if="activeModal === 'history'" />
    <SettingsModal v-if="activeModal === 'settings'" />
    <LinkAddModal v-if="activeModal === 'linkAdd'" />
    <LinkEditModal v-if="activeModal === 'linkEdit'" />
    <CategoryEditModal v-if="activeModal === 'categoryEdit'" />
    <EditLayoutModal v-if="activeModal === 'editLayout'" />
  </Default>
</template>

<script setup lang="ts">
import defaultHeroImage from "@/assets/cat.gif";
import CategoryEditModal from "@/components/CategoryEditModal.vue";
import EditLayoutModal from "@/components/EditLayoutModal.vue";
import HistoryModal from "@/components/HistoryModal.vue";
import LinkAddModal from "@/components/LinkAddModal.vue";
import LinkEditModal from "@/components/LinkEditModal.vue";
import SettingsModal from "@/components/SettingsModal.vue";
import Default from "@/layouts/Default.vue";
import HelpModal from "@/components/HelpModal.vue";
import LinkTree from "@/components/LinkTree.vue";
import Terminal from "@/components/Terminal.vue";
import Clock from "@/components/Clock.vue";
import { useCategoryStore } from "../store/category";
import { useSettingsStore } from "../store/settings";
import { useUiStore } from "../store/ui";
import { storeToRefs } from "pinia";

const store = useCategoryStore();
const settingsStore = useSettingsStore();
const uiStore = useUiStore();
const categories = storeToRefs(store).categories;
const categoryList = storeToRefs(store).categoryList;
const showClock = storeToRefs(settingsStore).showClock;
const heroImage = storeToRefs(settingsStore).heroImage;
const activeModal = storeToRefs(uiStore).activeModal;
const showPrivacyLink = import.meta.env.VITE_APP_TARGET !== "extension";
</script>
