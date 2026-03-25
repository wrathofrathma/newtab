<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-gruvbox-dark-bg-h/80 p-4"
    @click.self="emit('close')"
  >
    <div
      ref="dialogRef"
      class="w-full max-w-3xl rounded-xl border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-0 p-6 text-left shadow-2xl"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const emit = defineEmits<{
  close: [];
}>();

const dialogRef = ref<HTMLElement | null>(null);
let originalOverflow = "";

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    emit("close");
  }
}

onMounted(() => {
  originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  dialogRef.value?.focus();
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.body.style.overflow = originalOverflow;
  window.removeEventListener("keydown", onKeydown);
});
</script>
