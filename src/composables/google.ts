export default {
  action: (query: string) => {
    const location =
      "https://www.google.com/search?q=" + query.replace(" ", "+");
    window.location.href = location;
  },
  description: "Google search engine",
};
