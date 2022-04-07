export default {
  action: (query: string, subcommand: string = "") => {
    const location = "https://www.reddit.com/r/" + query;
    window.location.href = location;
  },
  description: "Go to a subreddit",
  subcommands: {},
};
