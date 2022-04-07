export default {
  action: (query: string, subcommand: string = "") => {
    const location =
      "https://www.youtube.com/results?search_query=" + query.replace(" ", "+");
    window.location.href = location;
  },
  description: "Search Youtube",
  subcommands: {},
};
