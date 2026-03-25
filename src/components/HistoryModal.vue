<template>
  <BaseModal @close="close">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gruvbox-dark-fg-1">
          Command History
        </h2>
        <p class="mt-1 text-sm text-gruvbox-dark-fg-3">
          <span class="text-gruvbox-dark-yellow-1">j</span>/<span
            class="text-gruvbox-dark-yellow-1"
            >k</span
          >
          navigate,
          <span class="text-gruvbox-dark-yellow-1">y</span> yank,
          <span class="text-gruvbox-dark-yellow-1">Enter</span> run,
          <span class="text-gruvbox-dark-yellow-1">Esc</span> close
        </p>
        <p v-if="copyMessage" class="mt-1 text-xs text-gruvbox-dark-aqua-1">
          {{ copyMessage }}
        </p>
      </div>
      <button
        class="rounded-md border border-gruvbox-dark-bg-3 px-3 py-1 text-sm text-gruvbox-dark-fg-2 hover:border-gruvbox-dark-bg-4 hover:text-gruvbox-dark-fg-1"
        @click="close"
      >
        Esc
      </button>
    </div>

    <div
      ref="listRef"
      class="mt-5 max-h-[60vh] overflow-y-auto rounded-lg border border-gruvbox-dark-bg-2"
    >
      <div
        v-if="!history.length"
        class="px-4 py-6 text-sm text-gruvbox-dark-fg-3"
      >
        No command history yet.
      </div>

      <button
        v-for="(entry, index) in history"
        :key="`${entry.command}-${entry.subcommand}-${entry.query}-${index}`"
        :data-history-index="index"
        :class="[
          'block w-full border-b border-gruvbox-dark-bg-2 px-4 py-3 text-left text-sm last:border-b-0',
          selectedIndex === index
            ? 'bg-gruvbox-dark-bg-1 text-gruvbox-dark-fg-0'
            : 'text-gruvbox-dark-fg-2 hover:bg-gruvbox-dark-bg-s',
        ]"
        @click="selectedIndex = index"
        @dblclick="executeSelected"
      >
        <span class="font-bold text-gruvbox-dark-red-1">{{
          entry.command
        }}</span>
        <span
          v-if="entry.subcommand"
          class="ml-2 font-bold text-gruvbox-dark-blue-1"
        >
          {{ entry.subcommand }}
        </span>
        <span v-if="entry.query" class="ml-2">{{ entry.query }}</span>
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import BaseModal from "./BaseModal.vue";
import { processCommand } from "../scripts/terminal";
import { useTerminalStore } from "../store/terminal";
import { useUiStore } from "../store/ui";

type HistoryItem = {
  command: string;
  subcommand: string;
  query: string;
};

const uiStore = useUiStore();
const terminalStore = useTerminalStore();
const historyRef = storeToRefs(terminalStore).history;
const history = computed<HistoryItem[]>(
  () => historyRef.value as HistoryItem[],
);

const selectedIndex = ref(0);
const copyMessage = ref("");
const listRef = ref<HTMLElement | null>(null);
let copyMessageTimeout: number | undefined;

watch(
  history,
  (items) => {
    if (items.length === 0) {
      selectedIndex.value = 0;
      return;
    }

    if (selectedIndex.value >= items.length) {
      selectedIndex.value = items.length - 1;
    }
  },
  { immediate: true },
);

watch(selectedIndex, () => {
  scrollSelectedIntoView();
});

function close() {
  uiStore.closeModal();
}

function selectNext() {
  if (selectedIndex.value < history.value.length - 1) {
    selectedIndex.value += 1;
  }
}

function selectPrev() {
  if (selectedIndex.value > 0) {
    selectedIndex.value -= 1;
  }
}

function selectedCommandText(): string {
  const entry = history.value[selectedIndex.value];

  if (!entry) {
    return "";
  }

  return [entry.command, entry.subcommand, entry.query]
    .filter(Boolean)
    .join(" ");
}

async function yankSelected() {
  const text = selectedCommandText();

  if (!text) {
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }
    setCopyMessage("Yanked to clipboard");
  } catch {
    try {
      fallbackCopy(text);
      setCopyMessage("Yanked to clipboard");
    } catch {
      setCopyMessage("Clipboard copy failed");
    }
  }
}

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("execCommand copy failed");
  }
}

function setCopyMessage(message: string) {
  copyMessage.value = message;

  if (copyMessageTimeout) {
    window.clearTimeout(copyMessageTimeout);
  }

  copyMessageTimeout = window.setTimeout(() => {
    copyMessage.value = "";
  }, 1600);
}

function scrollSelectedIntoView() {
  const list = listRef.value;

  if (!list) {
    return;
  }

  const selected = list.querySelector<HTMLElement>(
    `[data-history-index="${selectedIndex.value}"]`,
  );

  selected?.scrollIntoView({ block: "nearest" });
}

function executeSelected() {
  const entry = history.value[selectedIndex.value];

  if (!entry) {
    return;
  }

  close();
  processCommand(entry.command, entry.subcommand, entry.query);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "j" || e.key === "ArrowDown") {
    e.preventDefault();
    selectNext();
    return;
  }

  if (e.key === "k" || e.key === "ArrowUp") {
    e.preventDefault();
    selectPrev();
    return;
  }

  if (e.key === "y") {
    e.preventDefault();
    void yankSelected();
    return;
  }

  if (e.key === "Enter") {
    e.preventDefault();
    executeSelected();
  }
}

onMounted(() => {
  scrollSelectedIntoView();
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);

  if (copyMessageTimeout) {
    window.clearTimeout(copyMessageTimeout);
  }
});
</script>
