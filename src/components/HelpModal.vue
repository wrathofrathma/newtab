<template>
  <BaseModal @close="close">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gruvbox-dark-fg-1">Command Help</h2>
        <p class="mt-1 text-sm text-gruvbox-dark-fg-3">
          Run commands like
          <span class="text-gruvbox-dark-yellow-1">google cats</span> or
          <span class="text-gruvbox-dark-yellow-1"
            >link add dev Github https://github.com</span
          >
        </p>
        <p class="mt-1 text-xs text-gruvbox-dark-fg-4">
          Subcommands use the form
          <span class="text-gruvbox-dark-blue-1"
            >command subcommand ...args</span
          >
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
        class="border-b border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-1 px-4 py-2 text-xs font-bold uppercase tracking-wide text-gruvbox-dark-blue-1"
      >
        Utility And Management Commands
      </div>

      <div
        v-for="entry in utilityDisplayEntries"
        :key="entry.primary"
        :data-help-index="entry.displayIndex"
        :class="[
          'border-b border-gruvbox-dark-bg-2 px-4 py-3 text-sm',
          selectedIndex === entry.displayIndex ? 'bg-gruvbox-dark-bg-1' : '',
        ]"
      >
        <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3">
          <div>
            <div class="font-bold text-gruvbox-dark-yellow-1">
              {{ entry.primary }}
              <span
                v-if="entry.aliases.length"
                class="font-medium text-gruvbox-dark-fg-4"
              >
                (alias: {{ entry.aliases.join(", ") }})
              </span>
            </div>
            <div
              v-if="entry.subcommands.length"
              class="mt-1 text-xs text-gruvbox-dark-blue-1"
            >
              subcommands: {{ entry.subcommands.join(", ") }}
            </div>
            <div class="mt-2 space-y-1 text-xs text-gruvbox-dark-fg-3">
              <div
                v-for="syntax in entry.commandSyntax"
                :key="`${entry.primary}-${syntax}`"
                class="truncate"
              >
                {{ syntax }}
              </div>
            </div>
            <div
              v-if="entry.subcommandSyntax.length"
              class="mt-2 space-y-1 text-xs text-gruvbox-dark-aqua-1"
            >
              <div
                v-for="syntax in entry.subcommandSyntax"
                :key="`${entry.primary}-sub-${syntax}`"
                class="truncate"
              >
                {{ syntax }}
              </div>
            </div>
          </div>
          <div class="text-gruvbox-dark-fg-2">{{ entry.description }}</div>
        </div>
      </div>

      <div
        class="border-b border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-1 px-4 py-2 text-xs font-bold uppercase tracking-wide text-gruvbox-dark-aqua-1"
      >
        Search Commands
      </div>

      <div
        v-for="entry in searchDisplayEntries"
        :key="entry.primary"
        :data-help-index="entry.displayIndex"
        :class="[
          'border-b border-gruvbox-dark-bg-2 px-4 py-3 text-sm last:border-b-0',
          selectedIndex === entry.displayIndex ? 'bg-gruvbox-dark-bg-1' : '',
        ]"
      >
        <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3">
          <div>
            <div class="font-bold text-gruvbox-dark-yellow-1">
              {{ entry.primary }}
              <span
                v-if="entry.aliases.length"
                class="font-medium text-gruvbox-dark-fg-4"
              >
                (alias: {{ entry.aliases.join(", ") }})
              </span>
            </div>
            <div class="mt-2 space-y-1 text-xs text-gruvbox-dark-fg-3">
              <div
                v-for="syntax in entry.commandSyntax"
                :key="`${entry.primary}-${syntax}`"
                class="truncate"
              >
                {{ syntax }}
              </div>
            </div>
          </div>
          <div class="text-gruvbox-dark-fg-2">{{ entry.description }}</div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import BaseModal from "./BaseModal.vue";
import { commands, Command } from "../scripts/terminal";
import { searchTargets } from "../scripts/searchTargets";
import { useUiStore } from "../store/ui";

type CommandEntry = {
  primary: string;
  aliases: string[];
  description: string;
  subcommands: string[];
  commandSyntax: string[];
  subcommandSyntax: string[];
};

type IndexedCommandEntry = CommandEntry & {
  index: number;
};

type DisplayCommandEntry = CommandEntry & {
  displayIndex: number;
};

const searchCommandSyntaxMap = Object.fromEntries(
  Object.entries(searchTargets).map(([command, meta]) => {
    return [command, [`${command} <${meta.queryPlaceholder}>`]];
  }),
) as Record<string, string[]>;

const commandSyntaxMap: Record<string, string[]> = {
  ...searchCommandSyntaxMap,
  jump: ["jump <url-or-domain>"],
  go: ["go <url-or-domain>"],
  "r/": ["r/ <subreddit>"],
  ps1: ["ps1 <prompt>"],
  history: ["history"],
  import: ["import"],
  export: ["export"],
  help: ["help"],
  settings: ["settings"],
  theme: ["theme <theme-id>"],
  edit: ["edit"],
  clear: ["clear <subcommand>"],
  category: ["category <subcommand> ...args"],
  link: ["link <subcommand> ...args"],
};

const subcommandSyntaxMap: Record<string, Record<string, string>> = {
  category: {
    add: "category add <category> [category-url]",
    edit: "category edit <category>",
    rm: "category rm <category>",
  },
  link: {
    add: "link add <category> <title...> <url>",
    edit: "link edit <category> <title...>",
    rm: "link rm <category> <title...>",
  },
  clear: {
    all: "clear all",
    history: "clear history",
  },
};

const uiStore = useUiStore();
const selectedIndex = ref(0);
const listRef = ref<HTMLElement | null>(null);

const commandEntries = computed<CommandEntry[]>(() => {
  const grouped = new Map<Command, string[]>();

  Object.entries(commands).forEach(([name, command]) => {
    if (!grouped.has(command)) {
      grouped.set(command, [name]);
      return;
    }

    grouped.get(command)?.push(name);
  });

  return Array.from(grouped.entries())
    .map(([command, names]) => {
      const primary = names[0];
      const subcommands = Object.keys(command.subcommands);

      return {
        primary,
        aliases: names.slice(1),
        description: command.description,
        subcommands,
        commandSyntax: commandSyntaxMap[primary] ?? [`${primary} <args>`],
        subcommandSyntax: subcommands.map((subcommand) => {
          const knownSyntax = subcommandSyntaxMap[primary]?.[subcommand];

          if (knownSyntax) {
            return knownSyntax;
          }

          return `${primary} ${subcommand} <args>`;
        }),
      };
    })
    .sort((a, b) => a.primary.localeCompare(b.primary));
});

const indexedEntries = computed<IndexedCommandEntry[]>(() => {
  return commandEntries.value.map((entry, index) => ({
    ...entry,
    index,
  }));
});

const searchCommandEntries = computed<IndexedCommandEntry[]>(() => {
  return indexedEntries.value.filter((entry) => entry.primary in searchTargets);
});

const otherCommandEntries = computed<IndexedCommandEntry[]>(() => {
  return indexedEntries.value.filter(
    (entry) => !(entry.primary in searchTargets),
  );
});

const utilityDisplayEntries = computed<DisplayCommandEntry[]>(() => {
  return otherCommandEntries.value.map((entry, index) => ({
    ...entry,
    displayIndex: index,
  }));
});

const searchDisplayEntries = computed<DisplayCommandEntry[]>(() => {
  const offset = utilityDisplayEntries.value.length;

  return searchCommandEntries.value.map((entry, index) => ({
    ...entry,
    displayIndex: offset + index,
  }));
});

const displayEntriesCount = computed(() => {
  return utilityDisplayEntries.value.length + searchDisplayEntries.value.length;
});

watch(displayEntriesCount, (count) => {
  if (count === 0) {
    selectedIndex.value = 0;
    return;
  }

  if (selectedIndex.value >= count) {
    selectedIndex.value = count - 1;
  }
});

watch(selectedIndex, () => {
  const selected = listRef.value?.querySelector<HTMLElement>(
    `[data-help-index="${selectedIndex.value}"]`,
  );

  selected?.scrollIntoView({ block: "nearest" });
});

function selectNext() {
  if (selectedIndex.value < displayEntriesCount.value - 1) {
    selectedIndex.value += 1;
  }
}

function selectPrev() {
  if (selectedIndex.value > 0) {
    selectedIndex.value -= 1;
  }
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
  }
}

function close() {
  uiStore.closeModal();
}

onMounted(() => {
  const selected = listRef.value?.querySelector<HTMLElement>(
    `[data-help-index="${selectedIndex.value}"]`,
  );
  selected?.scrollIntoView({ block: "nearest" });
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>
