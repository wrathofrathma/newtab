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
          @input="oninput"
          class="focus:outline-none bg-transparent"
          @keyup.delete="backspace"
          v-model.trim="query"
          @keyup.enter="submit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTerminalStore } from "../store/terminal";
import { processCommand, commandList } from "../composables/terminal";

const terminalStore = useTerminalStore();

const PS1 = terminalStore.PS1;
const command = ref("");
const query = ref("");

function submit() {
  processCommand(command.value, query.value);
  command.value = "";
  query.value = "";
}

function backspace() {
  if (query.value.length === 0) {
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
