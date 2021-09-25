const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: ID
    title: String
    authors: [String]
    pages: Int
    description: String
    image: String
    link: String
  }

  type User{
    _id:ID
    username: String
    email:String
    bookCount: Int
    savedBooks:[Book]
  }

  type Query {
    me: User
  }
  input BookInput{
    authors: [String]
    description: String
    image: String
    link: String
    bookId: ID
    title: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData:BookInput!): User
    removeBook(bookId:ID): User
  }
  type Auth{
      token:ID!
      user: User
  }
`;

module.exports = typeDefs;