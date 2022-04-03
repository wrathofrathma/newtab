export default {
  action: (query: string) => {
    const location = "https://www.duckduckgo.com/?q=" + query.replace(" ", "+");
    window.location.href = location;
  },
  description: "DuckDuckGo search engine",
};
