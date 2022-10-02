const resolver = {
  Query: {
    users: async (parent, args) => {
      console.log("hello");
    },
  },
};
module.exports = resolver;
