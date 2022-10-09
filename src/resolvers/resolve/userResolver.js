module.exports = {
  Query: {
    users: async (parent, args, { dbMethors }) => await dbMethors.getAllUsers(),
    user: async (parent, args, { dbMethors }) =>
      await dbMethors.getUserById(args._id),
  },
};
