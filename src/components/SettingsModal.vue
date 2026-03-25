<template>
  <BaseModal @close="close">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gruvbox-dark-fg-1">Settings</h2>
        <p class="mt-1 text-sm text-gruvbox-dark-fg-3">
          Configure terminal behavior and display preferences.
        </p>
      </div>
      <button
        class="rounded-md border border-gruvbox-dark-bg-3 px-3 py-1 text-sm text-gruvbox-dark-fg-2 hover:border-gruvbox-dark-bg-4 hover:text-gruvbox-dark-fg-1"
        @click="close"
      >
        Esc
      </button>
    </div>

    <div class="mt-5 space-y-4">
      <label
        class="flex items-center justify-between gap-4 rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div>
          <div class="text-sm font-bold text-gruvbox-dark-fg-1">
            Prompt (PS1)
          </div>
          <div class="text-xs text-gruvbox-dark-fg-3">
            Terminal prompt shown before each command.
          </div>
        </div>
        <input
          v-model="PS1"
          type="text"
          class="w-40 rounded-md border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-0 px-3 py-2 text-sm text-gruvbox-dark-fg-1 outline-none focus:border-gruvbox-dark-blue-1"
        />
      </label>

      <label
        class="flex items-center justify-between gap-4 rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div>
          <div class="text-sm font-bold text-gruvbox-dark-fg-1">Theme</div>
          <div class="text-xs text-gruvbox-dark-fg-3">
            Choose the active palette for the page.
          </div>
        </div>
        <select
          v-model="theme"
          class="rounded-md border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-0 px-3 py-2 text-sm text-gruvbox-dark-fg-1 outline-none focus:border-gruvbox-dark-blue-1"
        >
          <option
            v-for="themeOption in themeOptions"
            :key="themeOption.id"
            :value="themeOption.id"
          >
            {{ themeOption.label }}
          </option>
        </select>
      </label>

      <label
        class="flex items-center justify-between gap-4 rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div>
          <div class="text-sm font-bold text-gruvbox-dark-fg-1">
            Terminal Panel Contrast
          </div>
          <div class="text-xs text-gruvbox-dark-fg-3">
            Add a subtle panel behind the terminal input.
          </div>
        </div>
        <input
          v-model="terminalPanelContrast"
          type="checkbox"
          class="h-5 w-5 accent-gruvbox-dark-aqua-1"
        />
      </label>

      <div
        class="rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-sm font-bold text-gruvbox-dark-fg-1">
              Hero Image
            </div>
            <div class="text-xs text-gruvbox-dark-fg-3">
              Upload a custom image for the top hero image.
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input
              ref="heroImageRef"
              hidden
              type="file"
              accept="image/*"
              @change="onHeroImageChange"
            />
            <button
              class="rounded-md border border-gruvbox-dark-bg-3 px-3 py-1.5 text-sm text-gruvbox-dark-fg-2 hover:border-gruvbox-dark-bg-4 hover:text-gruvbox-dark-fg-1"
              @click="triggerHeroImageUpload"
            >
              Upload
            </button>
            <button
              class="rounded-md border border-gruvbox-dark-bg-3 px-3 py-1.5 text-sm text-gruvbox-dark-fg-2 hover:border-gruvbox-dark-bg-4 hover:text-gruvbox-dark-fg-1"
              @click="clearHeroImage"
            >
              Reset
            </button>
          </div>
        </div>

        <p
          v-if="heroImageMessage"
          class="mt-2 text-xs text-gruvbox-dark-aqua-1"
        >
          {{ heroImageMessage }}
        </p>
      </div>

      <label
        class="flex items-center justify-between gap-4 rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div>
          <div class="text-sm font-bold text-gruvbox-dark-fg-1">
            History Autocomplete
          </div>
          <div class="text-xs text-gruvbox-dark-fg-3">
            Suggest previously used commands while typing.
          </div>
        </div>
        <input
          v-model="autocompleteFromHistory"
          type="checkbox"
          class="h-5 w-5 accent-gruvbox-dark-aqua-1"
        />
      </label>

      <label
        class="flex items-center justify-between gap-4 rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div>
          <div class="text-sm font-bold text-gruvbox-dark-fg-1">
            Default Search Engine
          </div>
          <div class="text-xs text-gruvbox-dark-fg-3">
            Used when text does not match a command.
          </div>
        </div>
        <select
          v-model="searchEngine"
          class="rounded-md border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-0 px-3 py-2 text-sm text-gruvbox-dark-fg-1 outline-none focus:border-gruvbox-dark-blue-1"
        >
          <option value="google">Google</option>
          <option value="duckduckgo">DuckDuckGo</option>
          <option value="youtube">YouTube</option>
          <option value="amazon">Amazon</option>
        </select>
      </label>

      <label
        class="flex items-center justify-between gap-4 rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div>
          <div class="text-sm font-bold text-gruvbox-dark-fg-1">Show Clock</div>
          <div class="text-xs text-gruvbox-dark-fg-3">
            Display clock above the command line.
          </div>
        </div>
        <input
          v-model="showClock"
          type="checkbox"
          class="h-5 w-5 accent-gruvbox-dark-aqua-1"
        />
      </label>

      <label
        class="flex items-center justify-between gap-4 rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div>
          <div class="text-sm font-bold text-gruvbox-dark-fg-1">
            Time Format
          </div>
          <div class="text-xs text-gruvbox-dark-fg-3">
            Choose 24-hour or 12-hour clock display.
          </div>
        </div>
        <select
          v-model="timeFormat"
          class="rounded-md border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-0 px-3 py-2 text-sm text-gruvbox-dark-fg-1 outline-none focus:border-gruvbox-dark-blue-1"
        >
          <option value="24h">24h</option>
          <option value="12h">12h</option>
        </select>
      </label>

      <label
        class="flex items-center justify-between gap-4 rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div>
          <div class="text-sm font-bold text-gruvbox-dark-fg-1">
            Show Seconds
          </div>
          <div class="text-xs text-gruvbox-dark-fg-3">
            Include seconds in the clock display.
          </div>
        </div>
        <input
          v-model="showSeconds"
          :disabled="!showClock"
          type="checkbox"
          class="h-5 w-5 accent-gruvbox-dark-aqua-1 disabled:opacity-50"
        />
      </label>

      <div
        class="rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-sm font-bold text-gruvbox-dark-fg-1">
              Data Management
            </div>
            <div class="text-xs text-gruvbox-dark-fg-3">
              Clear command history or reset categories and links.
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="rounded-md border border-gruvbox-dark-orange-1/40 px-3 py-1.5 text-sm text-gruvbox-dark-orange-1 hover:bg-gruvbox-dark-orange-1/10"
              @click="clearHistory"
            >
              Clear History
            </button>
            <button
              class="rounded-md border border-gruvbox-dark-red-1/40 px-3 py-1.5 text-sm text-gruvbox-dark-red-1 hover:bg-gruvbox-dark-red-1/10"
              @click="clearAllData"
            >
              Clear All
            </button>
          </div>
        </div>

        <p v-if="dataMessage" class="mt-2 text-xs text-gruvbox-dark-aqua-1">
          {{ dataMessage }}
        </p>
      </div>

      <div
        class="flex items-center justify-end gap-3 border-t border-gruvbox-dark-bg-2 pt-4"
      >
        <input
          ref="importRef"
          hidden
          type="file"
          accept="application/json"
          @change="importSettings"
        />
        <button
          class="rounded-md border border-gruvbox-dark-bg-3 px-4 py-2 text-sm text-gruvbox-dark-fg-2 hover:border-gruvbox-dark-bg-4 hover:text-gruvbox-dark-fg-1"
          @click="triggerImport"
        >
          Import Settings
        </button>
        <button
          class="rounded-md border border-gruvbox-dark-aqua-0 bg-gruvbox-dark-aqua-0/20 px-4 py-2 text-sm text-gruvbox-dark-aqua-1 hover:bg-gruvbox-dark-aqua-0/30"
          @click="exportSettings"
        >
          Export Settings
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import BaseModal from "./BaseModal.vue";
import { exportSettings, importSettings } from "../composables/settings";
import { useCategoryStore } from "../store/category";
import { useSettingsStore } from "../store/settings";
import { useTerminalStore } from "../store/terminal";
import { useUiStore } from "../store/ui";
import { themes } from "../theme/themes";

const uiStore = useUiStore();
const settingsStore = useSettingsStore();
const terminalStore = useTerminalStore();
const categoryStore = useCategoryStore();

const {
  theme,
  terminalPanelContrast,
  searchEngine,
  showClock,
  showSeconds,
  autocompleteFromHistory,
  timeFormat,
} = storeToRefs(settingsStore);

const themeOptions = Object.values(themes);
const { PS1 } = storeToRefs(terminalStore);

const importRef = ref<HTMLInputElement | null>(null);
const heroImageRef = ref<HTMLInputElement | null>(null);
const heroImageMessage = ref("");
const dataMessage = ref("");

function close() {
  uiStore.closeModal();
}

function triggerImport() {
  importRef.value?.click();
}

function triggerHeroImageUpload() {
  heroImageRef.value?.click();
}

function clearHeroImage() {
  settingsStore.resetHeroImage();
  heroImageMessage.value = "Reverted to default image.";
}

function clearHistory() {
  terminalStore.clearHistory();
  dataMessage.value = "Command history cleared.";
}

function clearAllData() {
  terminalStore.clearHistory();
  categoryStore.resetToDefaults();
  dataMessage.value = "History cleared and categories reset to defaults.";
}

function onHeroImageChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) {
    return;
  }

  const maxBytes = 2 * 1024 * 1024;

  if (file.size > maxBytes) {
    heroImageMessage.value = "Image too large. Use a file smaller than 2 MB.";
    input.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const result = reader.result;

    if (typeof result !== "string") {
      heroImageMessage.value = "Could not read image.";
      return;
    }

    settingsStore.setHeroImage(result);
    heroImageMessage.value = "Custom image saved.";
    input.value = "";
  };

  reader.onerror = () => {
    heroImageMessage.value = "Could not read image.";
    input.value = "";
  };

  reader.readAsDataURL(file);
}
</script>
