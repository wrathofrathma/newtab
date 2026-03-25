export default {
  action: (query: string, subcommand: string = "") => {
    const subreddit = query.trim();
    const location = subreddit
      ? "https://www.reddit.com/r/" + encodeURIComponent(subreddit)
      : "https://www.reddit.com";
    window.location.href = location;
  },
  description: "Go to a subreddit",
  subcommands: {},
};
