<template>
  <BaseModal @close="close">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gruvbox-dark-fg-1">Layout Editor</h2>
        <p class="mt-1 text-sm text-gruvbox-dark-fg-3">
          Drag categories to reorder. Drag links between categories to move
          them.
        </p>
      </div>
      <button
        class="rounded-md border border-gruvbox-dark-bg-3 px-3 py-1 text-sm text-gruvbox-dark-fg-2 hover:border-gruvbox-dark-bg-4 hover:text-gruvbox-dark-fg-1"
        @click="close"
      >
        Done
      </button>
    </div>

    <p class="mt-3 text-xs text-gruvbox-dark-purple-1">
      If a moved link title already exists in the target category, it is
      auto-renamed (for example: "GitHub (1)").
    </p>

    <div
      ref="scrollRef"
      class="mt-5 grid max-h-[65vh] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 xl:grid-cols-3"
    >
      <div
        v-for="(categoryName, categoryIndex) in categoryOrder"
        :key="categoryName"
        draggable="true"
        :class="[
          'relative rounded-lg border bg-gruvbox-dark-bg-s p-3 transition-all duration-150',
          isCategoryHover(categoryIndex)
            ? 'border-gruvbox-dark-aqua-1 ring-1 ring-gruvbox-dark-aqua-1/60'
            : 'border-gruvbox-dark-bg-2',
        ]"
        @dragstart="onCategoryDragStart($event, categoryIndex)"
        @dragend="onDragEnd"
        @dragover="onCategoryDragOver($event, categoryIndex)"
        @drop="onCategoryDrop($event, categoryIndex)"
      >
        <div
          v-if="isCategoryHover(categoryIndex)"
          class="pointer-events-none absolute inset-x-2 top-1 h-0.5 rounded bg-gruvbox-dark-aqua-1/80 transition-all duration-150"
        ></div>

        <div class="mb-2 text-sm font-bold text-gruvbox-dark-yellow-1">
          {{ categoryName }}
        </div>

        <div
          :class="[
            'space-y-2 rounded-md border border-dashed p-2 transition-all duration-150',
            isContainerHover(categoryName)
              ? 'border-gruvbox-dark-aqua-1 bg-gruvbox-dark-bg-0/40'
              : 'border-gruvbox-dark-bg-3',
          ]"
          @dragover="onLinkContainerDragOver($event, categoryName)"
          @drop="onLinkDropToCategory($event, categoryName)"
        >
          <div
            v-for="(entry, linkIndex) in orderedLinks(categoryName)"
            :key="`${categoryName}-${entry.title}`"
            draggable="true"
            class="relative cursor-grab rounded border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-0 px-2 py-1 text-sm text-gruvbox-dark-blue-1 transition-all duration-150"
            @dragstart="
              onLinkDragStart($event, categoryName, linkIndex, entry.title)
            "
            @dragend="onDragEnd"
            @dragover="onLinkItemDragOver($event, categoryName, linkIndex)"
            @drop="onLinkDropOnItem($event, categoryName, linkIndex)"
          >
            <div
              v-if="isLinkIndicator(categoryName, linkIndex, 'before')"
              class="pointer-events-none absolute -top-1 left-1 right-1 h-0.5 rounded bg-gruvbox-dark-aqua-1/90 transition-all duration-150"
            ></div>

            {{ entry.title }}

            <div
              v-if="isLinkIndicator(categoryName, linkIndex, 'after')"
              class="pointer-events-none absolute -bottom-1 left-1 right-1 h-0.5 rounded bg-gruvbox-dark-aqua-1/90 transition-all duration-150"
            ></div>
          </div>

          <div
            v-if="orderedLinks(categoryName).length === 0"
            :class="[
              'rounded border px-2 py-3 text-center text-xs transition-all duration-150',
              isContainerHover(categoryName)
                ? 'border-gruvbox-dark-aqua-1 text-gruvbox-dark-aqua-1'
                : 'border-gruvbox-dark-bg-3 text-gruvbox-dark-fg-4',
            ]"
          >
            Drop links here
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import BaseModal from "./BaseModal.vue";
import { useCategoryStore } from "../store/category";
import { useUiStore } from "../store/ui";

type DragLinkState = {
  fromCategory: string;
  fromIndex: number;
  title: string;
};

type HoverLinkTarget = {
  category: string;
  index: number;
  position: "before" | "after" | "inside";
};

const uiStore = useUiStore();
const categoryStore = useCategoryStore();

const categoryOrder = storeToRefs(categoryStore).categoryOrder;
const scrollRef = ref<HTMLElement | null>(null);

const draggedCategoryIndex = ref<number | null>(null);
const draggedLink = ref<DragLinkState | null>(null);
const hoverCategoryIndex = ref<number | null>(null);
const hoverLinkTarget = ref<HoverLinkTarget | null>(null);

function orderedLinks(categoryName: string) {
  return categoryStore.orderedLinks(categoryName);
}

function close() {
  uiStore.closeModal();
}

function resetDragState() {
  draggedCategoryIndex.value = null;
  draggedLink.value = null;
  hoverCategoryIndex.value = null;
  hoverLinkTarget.value = null;
}

function maybeAutoScroll(e: DragEvent) {
  const scroller = scrollRef.value;

  if (!scroller) {
    return;
  }

  const rect = scroller.getBoundingClientRect();
  const threshold = 56;
  const maxStep = 18;
  const topDist = e.clientY - rect.top;
  const bottomDist = rect.bottom - e.clientY;

  if (topDist < threshold) {
    const ratio = Math.max(0, (threshold - topDist) / threshold);
    scroller.scrollTop -= Math.ceil(maxStep * ratio);
    return;
  }

  if (bottomDist < threshold) {
    const ratio = Math.max(0, (threshold - bottomDist) / threshold);
    scroller.scrollTop += Math.ceil(maxStep * ratio);
  }
}

function onCategoryDragStart(e: DragEvent, index: number) {
  e.stopPropagation();
  draggedLink.value = null;
  draggedCategoryIndex.value = index;
  hoverCategoryIndex.value = null;
}

function onCategoryDragOver(e: DragEvent, categoryIndex: number) {
  if (draggedCategoryIndex.value === null || draggedLink.value) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();
  hoverCategoryIndex.value = categoryIndex;
  maybeAutoScroll(e);
}

function onCategoryDrop(e: DragEvent, targetIndex: number) {
  e.preventDefault();
  e.stopPropagation();

  if (draggedCategoryIndex.value === null || draggedLink.value) {
    resetDragState();
    return;
  }

  categoryStore.moveCategory(draggedCategoryIndex.value, targetIndex);
  resetDragState();
}

function onLinkDragStart(
  e: DragEvent,
  fromCategory: string,
  fromIndex: number,
  title: string,
) {
  e.stopPropagation();
  draggedCategoryIndex.value = null;
  draggedLink.value = { fromCategory, fromIndex, title };
  hoverLinkTarget.value = null;
}

function onLinkItemDragOver(e: DragEvent, category: string, index: number) {
  if (!draggedLink.value) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const midpoint = rect.top + rect.height / 2;
  const position = e.clientY < midpoint ? "before" : "after";

  hoverLinkTarget.value = { category, index, position };
  maybeAutoScroll(e);
}

function onLinkContainerDragOver(e: DragEvent, category: string) {
  if (!draggedLink.value) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  const length = orderedLinks(category).length;
  hoverLinkTarget.value = { category, index: length, position: "inside" };
  maybeAutoScroll(e);
}

function resolveDropIndex(
  category: string,
  fallbackIndex: number,
  fallbackPosition: "before" | "after" | "inside",
): number {
  const target = hoverLinkTarget.value;

  if (!target || target.category !== category) {
    if (fallbackPosition === "before") {
      return fallbackIndex;
    }

    if (fallbackPosition === "after") {
      return fallbackIndex + 1;
    }

    return orderedLinks(category).length;
  }

  if (target.position === "before") {
    return target.index;
  }

  if (target.position === "after") {
    return target.index + 1;
  }

  return orderedLinks(category).length;
}

function onLinkDropOnItem(
  e: DragEvent,
  toCategory: string,
  fallbackIndex: number,
) {
  e.preventDefault();
  e.stopPropagation();

  if (!draggedLink.value) {
    resetDragState();
    return;
  }

  const { fromCategory, fromIndex, title } = draggedLink.value;
  const dropIndex = resolveDropIndex(toCategory, fallbackIndex, "before");

  if (fromCategory === toCategory) {
    const order = categoryStore.linkOrderByCategory[toCategory] ?? [];
    let adjusted = dropIndex;

    if (fromIndex < adjusted) {
      adjusted -= 1;
    }

    if (adjusted < 0) {
      adjusted = 0;
    }

    if (adjusted > order.length - 1) {
      adjusted = Math.max(0, order.length - 1);
    }

    categoryStore.moveLinkWithinCategory(fromCategory, fromIndex, adjusted);
  } else {
    categoryStore.moveLinkAcrossCategories(
      fromCategory,
      toCategory,
      title,
      dropIndex,
    );
  }

  resetDragState();
}

function onLinkDropToCategory(e: DragEvent, toCategory: string) {
  e.preventDefault();
  e.stopPropagation();

  if (!draggedLink.value) {
    resetDragState();
    return;
  }

  const { fromCategory, fromIndex, title } = draggedLink.value;
  const dropIndex = resolveDropIndex(
    toCategory,
    orderedLinks(toCategory).length,
    "inside",
  );

  if (fromCategory === toCategory) {
    const order = categoryStore.linkOrderByCategory[toCategory] ?? [];
    let adjusted = dropIndex;

    if (fromIndex < adjusted) {
      adjusted -= 1;
    }

    if (adjusted < 0) {
      adjusted = 0;
    }

    if (adjusted > order.length - 1) {
      adjusted = Math.max(0, order.length - 1);
    }

    categoryStore.moveLinkWithinCategory(fromCategory, fromIndex, adjusted);
  } else {
    categoryStore.moveLinkAcrossCategories(
      fromCategory,
      toCategory,
      title,
      dropIndex,
    );
  }

  resetDragState();
}

function onDragEnd() {
  resetDragState();
}

function isCategoryHover(index: number): boolean {
  return (
    draggedCategoryIndex.value !== null && hoverCategoryIndex.value === index
  );
}

function isLinkIndicator(
  category: string,
  index: number,
  position: "before" | "after",
): boolean {
  return (
    !!draggedLink.value &&
    hoverLinkTarget.value?.category === category &&
    hoverLinkTarget.value?.index === index &&
    hoverLinkTarget.value?.position === position
  );
}

function isContainerHover(category: string): boolean {
  return (
    !!draggedLink.value &&
    hoverLinkTarget.value?.category === category &&
    hoverLinkTarget.value?.position === "inside"
  );
}
</script>
