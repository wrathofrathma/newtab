<template>
  <div
    class="font-mono text-2xl font-bold text-gruvbox-dark-aqua-1 tracking-wide"
  >
    {{ formattedTime }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useSettingsStore } from "../store/settings";

const settingsStore = useSettingsStore();
const timeFormat = storeToRefs(settingsStore).timeFormat;
const showSeconds = storeToRefs(settingsStore).showSeconds;

const now = ref(new Date());

const formattedTime = computed(() => {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds.value ? "2-digit" : undefined,
    hour12: timeFormat.value === "12h",
  }).format(now.value);
});

let intervalId: number | undefined;

onMounted(() => {
  intervalId = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (intervalId) {
    window.clearInterval(intervalId);
  }
});
</script>
