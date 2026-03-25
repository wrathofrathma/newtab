import { defineStore } from "pinia";

type ModalName =
  | ""
  | "help"
  | "settings"
  | "history"
  | "linkAdd"
  | "linkEdit"
  | "categoryEdit"
  | "editLayout";

type LinkEditContext = {
  category: string;
  title: string;
};

type CategoryEditContext = {
  name: string;
};

export const useUiStore = defineStore("ui", {
  state: () => {
    return {
      activeModal: "" as ModalName,
      linkEditContext: null as LinkEditContext | null,
      categoryEditContext: null as CategoryEditContext | null,
    };
  },
  actions: {
    openHelp() {
      this.activeModal = "help";
    },
    openSettings() {
      this.activeModal = "settings";
    },
    openHistory() {
      this.activeModal = "history";
    },
    openLinkAdd() {
      this.activeModal = "linkAdd";
    },
    openLinkEdit(context: LinkEditContext) {
      this.linkEditContext = context;
      this.activeModal = "linkEdit";
    },
    openCategoryEdit(context: CategoryEditContext) {
      this.categoryEditContext = context;
      this.activeModal = "categoryEdit";
    },
    openEditLayout() {
      this.activeModal = "editLayout";
    },
    closeModal() {
      this.activeModal = "";
      this.linkEditContext = null;
      this.categoryEditContext = null;
    },
  },
});
