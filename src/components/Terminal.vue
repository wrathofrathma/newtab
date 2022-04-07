<template>
  <div class="font-bold ml-10">
    <div class="flex flex-row gap-2">
      <div class="text-4xl">
        {{ PS1 }}
      </div>
      <div class="flex flex-row items-center text-3xl gap-0">
        <div class="gap-2 flex flex-row">
          <div class="text-gruvbox-dark-red-1 flex-none" v-if="command">
            {{ command }}
          </div>
          <div class="text-gruvbox-dark-blue-2 flex-none" v-if="subcommand">
            {{ subcommand }}
          </div>
        </div>
        <input
          autofocus
          spellcheck="false"
          type="text"
          class="focus:outline-none bg-transparent"
          @input="parseCommand"
          @keydown.delete="store.backspace"
          v-model="query"
          @keyup.enter="submit"
        />
        <input ref="file" hidden type="file" @change="importSettings" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTerminalStore } from "../store/terminal";
import { processCommand, parseCommand } from "../scripts/terminal";
import { importSettings } from "../composables/settings";
import { storeToRefs } from "pinia";

// TODO Make this component a contenteditable instead. It'll be more seamless.
// TODO Support bash style PS1 settings
// TODO Support fuzzy finding through history
const store = useTerminalStore();

const PS1 = storeToRefs(store).PS1;
const command = storeToRefs(store).command;
const subcommand = storeToRefs(store).subcommand;
const query = storeToRefs(store).query;

const file = ref<HTMLElement | null>(null);

function submit() {
  // Submit behavior changes for file imports (whether it's a JSON for settings or an image)
  if (command.value === "import") {
    if (file.value !== null) {
      file.value.click();
    }
  }

  store.submit();
}
</script>
