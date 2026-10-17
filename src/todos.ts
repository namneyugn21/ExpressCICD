export type Todo = {
  id: number;
  title: String
};

let todos: Todo[] = [];
let nextId = 1;

export function addTodo(title: String): Todo {
  if (!title.trim()) throw new Error("title required");

  const todo: Todo = {
    id: nextId++,
    title
  };
  todos.push(todo);
  
  return todo;
}

export function removeTodo(id: number): boolean {
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);
  return todos.length < before;
}

export function listTodos(): Todo[] {
  return todos;
}

export function resetTodos() {
  todos = [];
  nextId = 1;
}