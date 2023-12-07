import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!) {
    addUser(username: $username, email: $email) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($title: String!) {
    saveBook(title: $title) {
      bookId
      title
      description
      image: String
      link: String
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook(bookId: ID!) {
    removeBook (bookId: $bookId) {
      bookId
      title
      description
      image: String
      link: String
    }
  }
`;
