import { buildSearchUrl } from "./searchUrl";

export type SearchTargetMeta = {
  aliases: string[];
  queryPlaceholder: string;
  baseUrl: string;
  queryParam: string;
  fallbackUrl: string;
  extraParams?: Record<string, string>;
};

export const searchTargets: Record<string, SearchTargetMeta> = {
  google: {
    aliases: [],
    queryPlaceholder: "search terms",
    baseUrl: "https://www.google.com/search",
    queryParam: "q",
    fallbackUrl: "https://www.google.com",
  },
  duckduckgo: {
    aliases: ["ddg"],
    queryPlaceholder: "search terms",
    baseUrl: "https://duckduckgo.com",
    queryParam: "q",
    fallbackUrl: "https://duckduckgo.com",
  },
  youtube: {
    aliases: [],
    queryPlaceholder: "search terms",
    baseUrl: "https://www.youtube.com/results",
    queryParam: "search_query",
    fallbackUrl: "https://www.youtube.com",
  },
  amazon: {
    aliases: [],
    queryPlaceholder: "search terms",
    baseUrl: "https://www.amazon.com/s",
    queryParam: "k",
    fallbackUrl: "https://www.amazon.com",
  },
  github: {
    aliases: ["gh"],
    queryPlaceholder: "search terms",
    baseUrl: "https://github.com/search",
    queryParam: "q",
    fallbackUrl: "https://github.com",
  },
  stackoverflow: {
    aliases: ["so"],
    queryPlaceholder: "search terms",
    baseUrl: "https://stackoverflow.com/search",
    queryParam: "q",
    fallbackUrl: "https://stackoverflow.com",
  },
  wikipedia: {
    aliases: ["wiki"],
    queryPlaceholder: "search terms",
    baseUrl: "https://en.wikipedia.org/w/index.php",
    queryParam: "search",
    fallbackUrl: "https://en.wikipedia.org",
  },
  twitter: {
    aliases: ["x"],
    queryPlaceholder: "search terms",
    baseUrl: "https://twitter.com/search",
    queryParam: "q",
    fallbackUrl: "https://twitter.com",
    extraParams: {
      src: "typed_query",
    },
  },
  imdb: {
    aliases: [],
    queryPlaceholder: "search terms",
    baseUrl: "https://www.imdb.com/find",
    queryParam: "q",
    fallbackUrl: "https://www.imdb.com",
  },
  ebay: {
    aliases: [],
    queryPlaceholder: "search terms",
    baseUrl: "https://www.ebay.com/sch/i.html",
    queryParam: "_nkw",
    fallbackUrl: "https://www.ebay.com",
  },
  urbandictionary: {
    aliases: [],
    queryPlaceholder: "search terms",
    baseUrl: "https://www.urbandictionary.com/define.php",
    queryParam: "term",
    fallbackUrl: "https://www.urbandictionary.com",
  },
  chatgpt: {
    aliases: ["gpt"],
    queryPlaceholder: "prompt",
    baseUrl: "https://chatgpt.com",
    queryParam: "q",
    fallbackUrl: "https://chatgpt.com",
  },
};

export function validateSearchTargets(): string[] {
  const errors: string[] = [];
  const sampleQuery = "a+b c/d?e&f";

  Object.entries(searchTargets).forEach(([name, meta]) => {
    try {
      new URL(meta.baseUrl);
      new URL(meta.fallbackUrl);
    } catch {
      errors.push(`${name}: invalid base or fallback URL`);
      return;
    }

    const fallback = buildSearchUrl(
      meta.baseUrl,
      meta.queryParam,
      "   ",
      meta.fallbackUrl,
      meta.extraParams,
    );

    if (fallback !== meta.fallbackUrl) {
      errors.push(`${name}: blank query should use fallback URL`);
    }

    const generated = buildSearchUrl(
      meta.baseUrl,
      meta.queryParam,
      sampleQuery,
      meta.fallbackUrl,
      meta.extraParams,
    );

    let parsed: URL;

    try {
      parsed = new URL(generated);
    } catch {
      errors.push(`${name}: generated URL is invalid`);
      return;
    }

    if (parsed.searchParams.get(meta.queryParam) !== sampleQuery) {
      errors.push(`${name}: query parameter encoding mismatch`);
    }

    Object.entries(meta.extraParams ?? {}).forEach(([paramName, expected]) => {
      if (parsed.searchParams.get(paramName) !== expected) {
        errors.push(`${name}: missing extra param \"${paramName}\"`);
      }
    });
  });

  return errors;
}
