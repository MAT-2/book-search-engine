const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    login: async (paren, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }
      const correctPass = await user.isCorrectPassword(password);

      if (!correctPass) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return Book.findOneAndUpdate(
          { _id: bookId },
          { $addToSet: { Book: bookId } }
        );
      }
    },
    removeBook: async (parent, { user, body }, context) => {
      if (context.user) {
        return Book.findOneAndUpdate({ _id: User });
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
