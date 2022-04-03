import { defineStore } from "pinia";

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
      categories: {
        reddit: {
          link: "https://reddit.com",
          links: {
            programming: "https://reddit.com/r/programming",
            selfhosted: "https://reddit.com/r/selfhosted",
            unixporn: "https://reddit.com/r/unixporn",
            manga: "https://reddit.com/r/manga",
          },
        },
        play: {
          link: "",
          links: {
            youtube: "https://youtube.com",
            twitch: "https://twitch.tv",
            speedcube: "https://speedcube.app",
            wordle: "https://www.nytimes.com/games/wordle/index.html",
          },
        },
        dev: {
          link: "",
          links: {
            github: "https://github.com",
            mankier: "https://mankier.com",
            devdocs: "https://devdocs.io",
            hackernews: "https://news.ycombinator.com/",
          },
        },
        work: {
          link: "",
          links: {
            foreman: "https://hslinux.salisbury.edu",
            docker: "https://hslinux.salisbury.edu:9443",
            outlook: "https://outlook.office.com/mail/",
            gullnet: "https://www.salisbury.edu/employees/gullnet/",
          },
        },
      },
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
    addCategory(category) {
      if (category in this.categories) {
        console.log("Already exists");
      } else {
        console.log("DNE");
      }
    },
  },
});
