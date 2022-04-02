<template>
  <div class="font-bold text-4xl">> cd ~/<span class="blinking">_</span></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.blinking {
  animation: blink 1.5s ease-in-out infinite;
  opacity: 1;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
