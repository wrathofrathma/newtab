export default {
  action: (query: string, subcommand: string = "") => {
    const location = "https://www.amazon.com/s?k=" + query.replace(" ", "+");
    window.location.href = location;
  },
  description: "Search Amazon",
  subcommands: {},
};
