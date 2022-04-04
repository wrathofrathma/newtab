<template>
  <div class="font-bold ml-10">
    <div class="flex flex-row gap-2">
      <div class="text-4xl">
        {{ PS1 }}
      </div>
      <div class="flex flex-row items-center text-3xl gap-2">
        <div class="text-gruvbox-dark-red-1 flex-none" v-if="command">
          {{ command }}
        </div>
        <input
          autofocus
          spellcheck="false"
          type="text"
          class="focus:outline-none bg-transparent"
          @input="oninput"
          @keyup.delete="backspace"
          v-model.trim="query"
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
import { processCommand, commandList } from "../composables/terminal";
import { importSettings } from "../composables/settings";
import { storeToRefs } from "pinia";

const terminalStore = useTerminalStore();

const PS1 = storeToRefs(terminalStore).PS1;
const command = ref("");
const query = ref("");
const file = ref<HTMLElement | null>(null);

function submit() {
  // Submit behavior changes for file imports (whether it's a JSON for settings or an image)
  if (command.value === "import") {
    if (file.value !== null) {
      file.value.click();
    }
  }

  processCommand(command.value, query.value);
  command.value = "";
  query.value = "";
}

function backspace() {
  if (query.value.length === 0) {
    query.value = command.value.substring(0, command.value.length);
    command.value = "";
  }
}

function oninput(input) {
  query.value = query.value.trimStart();
  const splitValue = query.value.split(" ");

  if (!command.value && commandList.includes(splitValue[0])) {
    query.value = query.value.substring(splitValue[0].length + 1);
    command.value = splitValue[0];
  }
}
</script>
