export const getAllTodosQuery = `
  query GET_ALL_TODOS {
    getAllTodos {
      id
      title
      description
      isComplete
      dueDate
      createdAt
      updatedAt
      completedAt
    }
  }
`;

export const getTodoById = `
  query GET_TODO_BY_ID($id: ID!) {
    getTodoById(id: $id) {
      id
      title
      description
      isComplete
      dueDate
      createdAt
      updatedAt
      completedAt
    }
  }
`;

export const createTodoMutation = `
  mutation CREATE_TODO($todo: TodoInput!) {
    createTodo(todo: $todo) {
      id
      title
      description
      isComplete
      dueDate
      createdAt
      updatedAt
      completedAt
    }
  }
`;

export const updateTodoMutation = `
  mutation UPDATE_TODO($id: ID!, $update: TodoUpdate!) {
    updateTodo(id: $id, update: $update) {
      id
      title
      description
      isComplete
      dueDate
      createdAt
      updatedAt
      completedAt
    }
  }
`;

export const deleteTodoMutation = `
  mutation DELETE_TODO($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const markTodoAsDone = `
  mutation MARK_AS_DONE($id: ID!) {
    markAsDone(id: $id)
  }
`;
