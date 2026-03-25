import { searchTargets } from "../searchTargets";
import { buildSearchUrl } from "../searchUrl";

export function openSearch(
  baseUrl: string,
  queryParam: string,
  query: string,
  fallbackUrl: string = baseUrl,
  extraParams: Record<string, string> = {},
) {
  window.location.href = buildSearchUrl(
    baseUrl,
    queryParam,
    query,
    fallbackUrl,
    extraParams,
  );
}

export function openSearchTarget(
  target: keyof typeof searchTargets,
  query: string,
) {
  const meta = searchTargets[target];

  openSearch(
    meta.baseUrl,
    meta.queryParam,
    query,
    meta.fallbackUrl,
    meta.extraParams ?? {},
  );
}
