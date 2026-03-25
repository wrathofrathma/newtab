export function buildSearchUrl(
  baseUrl: string,
  queryParam: string,
  query: string,
  fallbackUrl: string = baseUrl,
  extraParams: Record<string, string> = {},
): string {
  const trimmed = query.trim();

  if (!trimmed) {
    return fallbackUrl;
  }

  const url = new URL(baseUrl);
  url.searchParams.set(queryParam, trimmed);

  Object.entries(extraParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}
