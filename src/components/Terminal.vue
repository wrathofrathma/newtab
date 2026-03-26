<template>
  <div
    :class="[
      'text-left font-bold transition-colors',
      terminalPanelContrast
        ? 'rounded-xl border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s px-4 py-3 shadow-lg shadow-gruvbox-dark-bg-h/35'
        : '',
    ]"
  >
    <div class="flex flex-row items-baseline gap-2">
      <div class="-translate-y-px text-4xl leading-none">
        {{ PS1 }}
      </div>

      <div
        class="relative min-w-[36rem] flex-1 overflow-hidden text-3xl leading-none"
      >
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre text-3xl"
        >
          <div
            class="flex items-baseline"
            :style="{ transform: `translateX(-${inputScrollLeft}px)` }"
          >
            <span v-if="parsed.command" class="text-gruvbox-dark-red-1">{{
              parsed.command
            }}</span>
            <span v-if="parsed.subcommand" class="text-gruvbox-dark-blue-1">
              {{ ` ${parsed.subcommand}` }}
            </span>
            <span
              v-if="highlightQuery && (parsed.command || parsed.subcommand)"
              class="text-gruvbox-dark-fg-1"
            >
              {{ ` ${highlightQuery}` }}
            </span>
            <span
              v-if="!parsed.command && !parsed.subcommand && highlightQuery"
              class="text-gruvbox-dark-fg-1"
              >{{ highlightQuery }}</span
            >
          </div>
        </div>

        <input
          ref="inputRef"
          autofocus
          spellcheck="false"
          type="text"
          class="relative w-full bg-transparent text-transparent caret-gruvbox-dark-fg-1 focus:outline-none disabled:cursor-not-allowed"
          :disabled="Boolean(activeModal)"
          :value="rawInput"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @click="syncInputScroll"
          @keyup="syncInputScroll"
          @select="syncInputScroll"
          @scroll="syncInputScroll"
          @keydown="onKeydown"
        />

        <div
          v-if="showSuggestions"
          class="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-full max-w-xl rounded-lg border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-0 text-base shadow-2xl"
        >
          <button
            v-for="(suggestion, index) in displayedSuggestions"
            :key="`${suggestion.value}-${suggestion.type}`"
            :class="[
              'block w-full px-3 py-2 text-left',
              selectedSuggestionIndex === index
                ? 'bg-gruvbox-dark-bg-1 text-gruvbox-dark-fg-0'
                : 'text-gruvbox-dark-fg-2 hover:bg-gruvbox-dark-bg-s',
            ]"
            @mousedown.prevent="applySuggestionFromClick(index)"
          >
            <span class="inline-flex items-center gap-2">
              <span
                class="rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide"
                :class="
                  suggestion.type === 'history'
                    ? 'bg-gruvbox-dark-purple-0/25 text-gruvbox-dark-purple-1'
                    : 'bg-gruvbox-dark-blue-0/25 text-gruvbox-dark-blue-1'
                "
              >
                {{ suggestion.type === "history" ? "history" : "command" }}
              </span>
              <span>{{ suggestion.value }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <input ref="fileRef" hidden type="file" @change="importSettings" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { storeToRefs } from "pinia";
import { importSettings } from "../composables/settings";
import {
  applySuggestion,
  formatHistoryEntry,
  getAutocompleteSuggestions,
  parseInput,
} from "../scripts/terminal";
import { useSettingsStore } from "../store/settings";
import { useTerminalStore } from "../store/terminal";
import { useUiStore } from "../store/ui";

const terminalStore = useTerminalStore();
const settingsStore = useSettingsStore();
const uiStore = useUiStore();

const rawInput = storeToRefs(terminalStore).rawInput;
const PS1 = storeToRefs(terminalStore).PS1;
const activeModal = storeToRefs(uiStore).activeModal;
const autocompleteFromHistory =
  storeToRefs(settingsStore).autocompleteFromHistory;
const terminalPanelContrast = storeToRefs(settingsStore).terminalPanelContrast;

const inputRef = ref<HTMLInputElement | null>(null);
const fileRef = ref<HTMLInputElement | null>(null);
const selectedSuggestionIndex = ref(0);
const inputScrollLeft = ref(0);
const isInputFocused = ref(false);
const tabCycleBaseInput = ref<string | null>(null);
const tabCycleSuggestions = ref<SuggestionItem[] | null>(null);
const tabCycleIndex = ref(-1);

type SuggestionItem = {
  value: string;
  type: "history" | "command";
};

const parsed = computed(() => parseInput(rawInput.value));

const highlightQuery = computed(() => {
  if (!parsed.value.isKnownCommand) {
    return rawInput.value;
  }

  return parsed.value.query;
});

const commandSuggestions = computed(() => {
  return getAutocompleteSuggestions(rawInput.value).map((value) => ({
    value,
    type: "command" as const,
  }));
});

const historySuggestions = computed(() => {
  if (!autocompleteFromHistory.value) {
    return [] as SuggestionItem[];
  }

  const needle = rawInput.value.trim().toLowerCase();

  if (!needle) {
    return [] as SuggestionItem[];
  }

  const seen = new Set<string>();
  const items: SuggestionItem[] = [];

  terminalStore.history.forEach((entry) => {
    const command = formatHistoryEntry(entry);

    if (!command) {
      return;
    }

    const lower = command.toLowerCase();

    if (lower === needle || !lower.startsWith(needle) || seen.has(lower)) {
      return;
    }

    seen.add(lower);
    items.push({ value: command, type: "history" });
  });

  return items;
});

const suggestions = computed(() => {
  const seen = new Set<string>();
  const merged: SuggestionItem[] = [];

  historySuggestions.value.forEach((item) => {
    const key = item.value.toLowerCase();

    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    merged.push(item);
  });

  commandSuggestions.value.forEach((item) => {
    const key = item.value.toLowerCase();

    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    merged.push(item);
  });

  return merged;
});

const displayedSuggestions = computed(() => {
  return tabCycleSuggestions.value ?? suggestions.value;
});

const showSuggestions = computed(() => {
  if (Boolean(activeModal.value)) {
    return false;
  }

  if (!isInputFocused.value) {
    return false;
  }

  if (rawInput.value.trim().length === 0) {
    return false;
  }

  return displayedSuggestions.value.length > 0;
});

function resetTabCycle() {
  tabCycleBaseInput.value = null;
  tabCycleSuggestions.value = null;
  tabCycleIndex.value = -1;
}

function onFocus() {
  isInputFocused.value = true;
  syncInputScroll();
}

function onBlur() {
  isInputFocused.value = false;
  inputScrollLeft.value = 0;
  resetTabCycle();
}

function syncInputScroll() {
  nextTick(() => {
    inputScrollLeft.value = inputRef.value?.scrollLeft ?? 0;
  });
}

function clampSuggestionIndex() {
  if (displayedSuggestions.value.length === 0) {
    selectedSuggestionIndex.value = 0;
    return;
  }

  if (selectedSuggestionIndex.value >= displayedSuggestions.value.length) {
    selectedSuggestionIndex.value = displayedSuggestions.value.length - 1;
  }

  if (selectedSuggestionIndex.value < 0) {
    selectedSuggestionIndex.value = 0;
  }
}

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  resetTabCycle();
  terminalStore.setRawInput(target.value);
  clampSuggestionIndex();
  syncInputScroll();
}

function applyCurrentSuggestion() {
  if (!showSuggestions.value) {
    return;
  }

  const suggestion = displayedSuggestions.value[selectedSuggestionIndex.value];

  if (!suggestion) {
    return;
  }

  if (suggestion.type === "history") {
    terminalStore.setRawInput(suggestion.value);
  } else {
    terminalStore.setRawInput(
      applySuggestion(rawInput.value, suggestion.value),
    );
  }
  selectedSuggestionIndex.value = 0;

  nextTick(() => {
    if (inputRef.value) {
      const cursor = inputRef.value.value.length;
      inputRef.value.setSelectionRange(cursor, cursor);
    }

    syncInputScroll();
  });
}

function cycleSuggestion(step: number) {
  if (!showSuggestions.value) {
    return;
  }

  if (!tabCycleSuggestions.value || tabCycleBaseInput.value === null) {
    tabCycleBaseInput.value = rawInput.value;
    tabCycleSuggestions.value = suggestions.value.slice();
    tabCycleIndex.value = -1;
  }

  if (
    tabCycleSuggestions.value.length === 0 ||
    tabCycleBaseInput.value === null
  ) {
    return;
  }

  const length = tabCycleSuggestions.value.length;
  const nextIndex = (tabCycleIndex.value + step + length) % length;
  const suggestion = tabCycleSuggestions.value[nextIndex];

  if (!suggestion) {
    return;
  }

  if (suggestion.type === "history") {
    terminalStore.setRawInput(suggestion.value);
  } else {
    terminalStore.setRawInput(
      applySuggestion(tabCycleBaseInput.value, suggestion.value),
    );
  }

  tabCycleIndex.value = nextIndex;
  selectedSuggestionIndex.value = nextIndex;
  moveCursorToEnd();
}

function applySuggestionFromClick(index: number) {
  resetTabCycle();
  selectedSuggestionIndex.value = index;
  applyCurrentSuggestion();
}

function onSubmit() {
  if (parsed.value.command === "import") {
    fileRef.value?.click();
  }

  terminalStore.submitRawInput();
  resetTabCycle();
  selectedSuggestionIndex.value = 0;
  inputScrollLeft.value = 0;
}

function moveCursorToEnd() {
  nextTick(() => {
    if (!inputRef.value) {
      return;
    }

    const cursor = inputRef.value.value.length;
    inputRef.value.setSelectionRange(cursor, cursor);
    syncInputScroll();
  });
}

function onKeydown(e: KeyboardEvent) {
  if (Boolean(activeModal.value)) {
    return;
  }

  if (e.key === "Tab") {
    e.preventDefault();
    cycleSuggestion(e.shiftKey ? -1 : 1);
    return;
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    resetTabCycle();
    terminalStore.historyPrev();
    selectedSuggestionIndex.value = 0;
    moveCursorToEnd();
    return;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    resetTabCycle();
    terminalStore.historyNext();
    selectedSuggestionIndex.value = 0;
    moveCursorToEnd();
    return;
  }

  if (e.key === "Escape") {
    resetTabCycle();
    selectedSuggestionIndex.value = 0;
    return;
  }

  if (e.key === "Enter") {
    e.preventDefault();
    onSubmit();
    return;
  }

  if (e.key !== "Shift") {
    resetTabCycle();
  }
}
</script>
