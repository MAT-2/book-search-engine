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

export const ADD_BOOK = gql``;

export const REMOVE_BOOK = gql``;
