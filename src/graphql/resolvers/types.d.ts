export interface TodoInput {
  title: string;
  description: string;
  dueDate: Date;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  dueDate?: Date;
}
