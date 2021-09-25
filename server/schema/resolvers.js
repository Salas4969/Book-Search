const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
// const { findOneAndUpdate } = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    
  },

  Mutation: {
    addUser: async (parent, args) => {
      console.log("add user running")
      const user = await User.create(args);
      console.log("user created")
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne( {email} );

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent,{bookData},context)=>{
      if (context.user){
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { savedBooks: bookData } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    }},
    removeBook: async (parent, {bookId},context)=>{
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }
      return updatedUser;
    
    }

  }
};

module.exports = resolvers;
