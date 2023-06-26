import gql from 'graphql-tag';

export default gql`
  # Scalars
  scalar DateTime

  type Query {
    sayHi: String!
    getAllTodos: [Todo]!
    getTodoById(id: ID!): Todo!
  }

  type Mutation {
    createTodo(todo: TodoInput!): Todo!
    updateTodo(id: ID!, update: TodoUpdate!): Todo!
    deleteTodo(id: ID!): Boolean!
    markAsDone(id: ID!): Boolean!
  }

  # Todo

  input TodoInput {
    title: String!
    description: String!
    dueDate: DateTime!
  }

  input TodoUpdate {
    title: String
    description: String
    dueDate: DateTime
  }

  type Todo {
    id: ID!
    title: String!
    description: String!
    isComplete: Boolean!
    dueDate: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    completedAt: DateTime
  }
`;
