import { defineStore } from "pinia";
import prependHttp from "prepend-http";
import { persistedState } from "./index";

type Category = {
  link: string;
  links: {
    [key: string]: string;
  };
};

type Categories = {
  [key: string]: Category;
};

const defaultRepoUrl = "https://github.com/wrathofrathma/newtab";
const defaultReleasesUrl = `${defaultRepoUrl}/releases`;
const defaultChromeStoreUrl = "https://chromewebstore.google.com/";
const defaultFirefoxStoreUrl =
  "https://addons.mozilla.org/en-US/firefox/addon/cattab/";

const webDefaultCategories: Categories = {
  project: {
    link: defaultRepoUrl,
    links: {
      "GitHub Repo": defaultRepoUrl,
      Releases: defaultReleasesUrl,
    },
  },
  downloads: {
    link: defaultReleasesUrl,
    links: {
      "Latest Release": defaultReleasesUrl,
      "Chrome Web Store (TBD)": defaultChromeStoreUrl,
      "Firefox Add-ons": defaultFirefoxStoreUrl,
    },
  },
};

const extensionDefaultCategories: Categories = {
  dev: {
    link: "https://github.com",
    links: {
      github: "https://github.com",
      stackoverflow: "https://stackoverflow.com",
      chatgpt: "https://chatgpt.com",
      "aws console": "https://console.aws.amazon.com",
    },
  },
  news: {
    link: "https://news.ycombinator.com",
    links: {
      hackernews: "https://news.ycombinator.com",
      "garbage collection": "https://devlog.kyso.dev/",
      lobsters: "https://lobste.rs",
    },
  },
  social: {
    link: "https://www.reddit.com",
    links: {
      reddit: "https://www.reddit.com",
      x: "https://x.com",
      gmail: "https://mail.google.com",
      youtube: "https://www.youtube.com",
    },
  },
  media: {
    link: "https://open.spotify.com",
    links: {
      spotify: "https://open.spotify.com",
      netflix: "https://www.netflix.com",
      "youtube music": "https://music.youtube.com",
      steam: "https://store.steampowered.com",
    },
  },
};

function cloneCategories(categories: Categories): Categories {
  return Object.fromEntries(
    Object.entries(categories).map(([name, category]) => {
      return [
        name,
        {
          link: category.link,
          links: { ...category.links },
        },
      ];
    }),
  );
}

function getDefaultCategories(): Categories {
  if (import.meta.env.VITE_APP_TARGET === "extension") {
    return cloneCategories(extensionDefaultCategories);
  }

  return cloneCategories(webDefaultCategories);
}

type PersistedCategoryState = {
  categories?: Categories;
  categoryOrder?: string[];
  linkOrderByCategory?: Record<string, string[]>;
};

function moveInArray<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length ||
    fromIndex === toIndex
  ) {
    return items;
  }

  const copy = items.slice();
  const [item] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, item);
  return copy;
}

function normalizeCategories(raw: unknown): Categories {
  if (!raw || typeof raw !== "object") {
    return {};
  }

  const entries = Object.entries(raw as Record<string, unknown>);
  const normalized: Categories = {};

  entries.forEach(([name, value]) => {
    const normalizedName = name.trim();

    if (!normalizedName) {
      return;
    }

    if (!value || typeof value !== "object") {
      return;
    }

    const category = value as Record<string, unknown>;
    const link = typeof category.link === "string" ? category.link : "";
    const linksRaw =
      category.links && typeof category.links === "object"
        ? (category.links as Record<string, unknown>)
        : {};

    const links: Record<string, string> = {};
    Object.entries(linksRaw).forEach(([title, url]) => {
      if (typeof url === "string") {
        links[title] = url;
      }
    });

    normalized[normalizedName] = {
      link,
      links,
    };
  });

  return normalized;
}

function normalizeCategoryOrder(
  categories: Categories,
  rawOrder: unknown,
): string[] {
  const keys = Object.keys(categories);

  if (!Array.isArray(rawOrder)) {
    return keys;
  }

  const filtered = rawOrder.filter((name): name is string => {
    return typeof name === "string" && name in categories;
  });

  keys.forEach((key) => {
    if (!filtered.includes(key)) {
      filtered.push(key);
    }
  });

  return filtered;
}

function normalizeLinkOrderByCategory(
  categories: Categories,
  rawOrder: unknown,
): Record<string, string[]> {
  const source =
    rawOrder && typeof rawOrder === "object"
      ? (rawOrder as Record<string, unknown>)
      : {};

  const normalized: Record<string, string[]> = {};

  Object.entries(categories).forEach(([categoryName, category]) => {
    const titles = Object.keys(category.links);
    const raw = Array.isArray(source[categoryName])
      ? (source[categoryName] as unknown[])
      : [];

    const filtered = raw.filter((title): title is string => {
      return typeof title === "string" && title in category.links;
    });

    titles.forEach((title) => {
      if (!filtered.includes(title)) {
        filtered.push(title);
      }
    });

    normalized[categoryName] = filtered;
  });

  return normalized;
}

function getUniqueTitle(
  targetLinks: Record<string, string>,
  preferred: string,
): string {
  if (!(preferred in targetLinks)) {
    return preferred;
  }

  let i = 1;
  while (`${preferred} (${i})` in targetLinks) {
    i += 1;
  }

  return `${preferred} (${i})`;
}

const persistedCategory = (persistedState.category ??
  {}) as PersistedCategoryState;
const persistedCategories = normalizeCategories(persistedCategory.categories);
const initialCategories =
  Object.keys(persistedCategories).length > 0
    ? persistedCategories
    : getDefaultCategories();

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categories: initialCategories,
      categoryOrder: normalizeCategoryOrder(
        initialCategories,
        persistedCategory.categoryOrder,
      ),
      linkOrderByCategory: normalizeLinkOrderByCategory(
        initialCategories,
        persistedCategory.linkOrderByCategory,
      ),
    };
  },

  getters: {
    categoryList: (state) => {
      return state.categoryOrder;
    },
    category: (state) => {
      return (name: string): Category => {
        return state.categories[name];
      };
    },
    categoryLink: (state) => {
      return (category: string): string => {
        return state.categories[category].link;
      };
    },
    links: (state) => {
      return (category: string): { [key: string]: string } => {
        return state.categories[category].links;
      };
    },
    orderedLinks: (state) => {
      return (categoryName: string): { title: string; url: string }[] => {
        const category = state.categories[categoryName];

        if (!category) {
          return [];
        }

        const order = state.linkOrderByCategory[categoryName] ?? [];
        return order
          .filter((title) => title in category.links)
          .map((title) => ({ title, url: category.links[title] }));
      };
    },
  },
  actions: {
    syncOrders() {
      this.categoryOrder = normalizeCategoryOrder(
        this.categories,
        this.categoryOrder,
      );
      this.linkOrderByCategory = normalizeLinkOrderByCategory(
        this.categories,
        this.linkOrderByCategory,
      );
    },
    addCategory(category: string, link: string = "") {
      const trimmedCategory = category.trim();

      if (!trimmedCategory) {
        return;
      }

      if (!(trimmedCategory in this.categories)) {
        this.categories[trimmedCategory] = {
          link: prependHttp(link),
          links: {},
        };
        this.categoryOrder.push(trimmedCategory);
        this.linkOrderByCategory[trimmedCategory] = [];
      }
    },
    removeCategory(category: string) {
      const trimmedCategory = category.trim();

      if (!trimmedCategory) {
        if ("" in this.categories) {
          delete this.categories[""];
          this.categoryOrder = this.categoryOrder.filter((name) => name !== "");
          delete this.linkOrderByCategory[""];
        }
        return;
      }

      if (trimmedCategory in this.categories) {
        delete this.categories[trimmedCategory];
        this.categoryOrder = this.categoryOrder.filter(
          (name) => name !== trimmedCategory,
        );
        delete this.linkOrderByCategory[trimmedCategory];
      }
    },
    renameCategory(currentName: string, nextName: string) {
      const trimmedNext = nextName.trim();

      if (!(currentName in this.categories)) {
        return false;
      }

      if (!trimmedNext) {
        return false;
      }

      if (trimmedNext === currentName) {
        return true;
      }

      if (trimmedNext in this.categories) {
        return false;
      }

      this.categories[trimmedNext] = this.categories[currentName];
      delete this.categories[currentName];

      const index = this.categoryOrder.indexOf(currentName);
      if (index >= 0) {
        this.categoryOrder[index] = trimmedNext;
      }

      this.linkOrderByCategory[trimmedNext] =
        this.linkOrderByCategory[currentName] ?? [];
      delete this.linkOrderByCategory[currentName];

      return true;
    },
    addLink(category: string, title: string, link: string) {
      if (category in this.categories) {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
          return;
        }

        const exists = trimmedTitle in this.categories[category].links;
        this.categories[category].links[trimmedTitle] = prependHttp(link);

        if (!this.linkOrderByCategory[category]) {
          this.linkOrderByCategory[category] = [];
        }

        if (!exists) {
          this.linkOrderByCategory[category].push(trimmedTitle);
        }
      }
    },
    removeLink(category: string, title: string) {
      if (category in this.categories) {
        if (title in this.categories[category].links) {
          delete this.categories[category].links[title];
          this.linkOrderByCategory[category] = (
            this.linkOrderByCategory[category] ?? []
          ).filter((name) => name !== title);
        }
      }
    },
    editLink(
      currentCategory: string,
      currentTitle: string,
      nextCategory: string,
      nextTitle: string,
      nextLink: string,
    ) {
      const trimmedTitle = nextTitle.trim();
      const trimmedLink = nextLink.trim();

      if (!(currentCategory in this.categories)) {
        return false;
      }

      if (!(currentTitle in this.categories[currentCategory].links)) {
        return false;
      }

      if (!(nextCategory in this.categories)) {
        return false;
      }

      if (!trimmedTitle || !trimmedLink) {
        return false;
      }

      const targetLinks = this.categories[nextCategory].links;
      const keepSameSlot =
        currentCategory === nextCategory && currentTitle === trimmedTitle;
      const uniqueTitle = keepSameSlot
        ? trimmedTitle
        : getUniqueTitle(targetLinks, trimmedTitle);

      this.removeLink(currentCategory, currentTitle);
      this.addLink(nextCategory, uniqueTitle, trimmedLink);
      return true;
    },
    moveCategory(fromIndex: number, toIndex: number) {
      this.categoryOrder = moveInArray(this.categoryOrder, fromIndex, toIndex);
    },
    moveLinkWithinCategory(
      category: string,
      fromIndex: number,
      toIndex: number,
    ) {
      const order = this.linkOrderByCategory[category] ?? [];
      this.linkOrderByCategory[category] = moveInArray(
        order,
        fromIndex,
        toIndex,
      );
    },
    moveLinkAcrossCategories(
      fromCategory: string,
      toCategory: string,
      title: string,
      toIndex?: number,
    ) {
      if (
        !(fromCategory in this.categories) ||
        !(toCategory in this.categories)
      ) {
        return null;
      }

      const link = this.categories[fromCategory].links[title];

      if (!link) {
        return null;
      }

      const nextTitle = getUniqueTitle(
        this.categories[toCategory].links,
        title,
      );

      delete this.categories[fromCategory].links[title];
      this.linkOrderByCategory[fromCategory] = (
        this.linkOrderByCategory[fromCategory] ?? []
      ).filter((name) => name !== title);

      this.categories[toCategory].links[nextTitle] = link;

      if (!this.linkOrderByCategory[toCategory]) {
        this.linkOrderByCategory[toCategory] = [];
      }

      const targetOrder = this.linkOrderByCategory[toCategory];
      const insertAt =
        typeof toIndex === "number" &&
        toIndex >= 0 &&
        toIndex <= targetOrder.length
          ? toIndex
          : targetOrder.length;

      targetOrder.splice(insertAt, 0, nextTitle);
      return nextTitle;
    },
    setCategory(settings: {
      categories?: Categories;
      categoryOrder?: string[];
      linkOrderByCategory?: Record<string, string[]>;
    }) {
      const normalized = normalizeCategories(settings.categories);
      this.categories = normalized;
      this.categoryOrder = normalizeCategoryOrder(
        normalized,
        settings.categoryOrder,
      );
      this.linkOrderByCategory = normalizeLinkOrderByCategory(
        normalized,
        settings.linkOrderByCategory,
      );
    },
    resetToDefaults() {
      const defaults = getDefaultCategories();
      this.categories = defaults;
      this.categoryOrder = Object.keys(defaults);
      this.linkOrderByCategory = normalizeLinkOrderByCategory(defaults, {});
    },
  },
});
