<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: var(--nt-font-family, "Fira Code", monospace);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--nt-text-primary, #ebdbb2);
  background-color: var(--nt-surface-canvas, #282828);
  min-height: 100vh;
}
</style>
