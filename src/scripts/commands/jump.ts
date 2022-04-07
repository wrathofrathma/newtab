import prependHttp from "prepend-http";

export default {
  action: (query: string) => {
    const location = prependHttp(query);
    window.location.href = location;
  },
  description: "Go to the link",
  subcommands: {},
};
