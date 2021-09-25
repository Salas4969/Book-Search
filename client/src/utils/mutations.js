import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($id:ID) {
    removeBook(bookId: $id) {
      id
      username
      email
      savedBooks{
    bookId
    title 
    authors
    pages 
    description 
    image 
    link
    }}
  }
`;
export const SAVE_BOOK = gql`
  mutation saveBook($bookData:BookInput) {
    saveBook(bookData: $bookData) {
      id
      username
      email
      savedBooks{
    bookId 
    title 
    authors 
    pages
    description 
    image 
    link 
    }}
  }
`;