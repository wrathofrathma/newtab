import { defineStore } from "pinia";
import { persistedState } from "./index";
import prependHttp from "prepend-http";

// Need some type definitions
type Category = {
  link: string;
  links: {
    [key: string]: string;
  };
};

type Categories = {
  [key: string]: Category;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCategoryStore = defineStore("category", {
  // other options...
  state: () => {
    return {
      categories: persistedState.category?.categories
        ? persistedState.category.categories
        : {},
    };
  },

  getters: {
    categoryList: (state) => {
      return Object.keys(state.categories);
    },
    category: (state) => {
      return (name: string): Category => {
        const categories: Categories = state.categories;

        return categories[name];
      };
    },
    categoryLink: (state) => {
      return (category: string): string => {
        const categories: Categories = state.categories;

        return categories[category].link;
      };
    },
    links: (state) => {
      return (category: string): { [key: string]: string } => {
        const categories: Categories = state.categories;

        return categories[category].links;
      };
    },
  },
  actions: {
    addCategory(category: string, link: string = "") {
      if (!(category in this.categories)) {
        this.categories[category] = {
          link: prependHttp(link),
          links: {},
        };
      }
    },
    removeCategory(category: string) {
      if (category in this.categories) {
        delete this.categories[category];
      }
    },
    addLink(category: string, title: string, link: string) {
      if (category in this.categories) {
        this.categories[category].links[title] = prependHttp(link);
      }
    },
    removeLink(category: string, title: string) {
      if (category in this.categories) {
        if (title in this.categories[category].links) {
          delete this.categories[category].links[title];
        }
      }
    },
    setCategory(settings) {
      this.categories = settings.categories;
    },
  },
});
