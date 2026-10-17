import { describe, it, expect, beforeEach } from "vitest";
import { addTodo, removeTodo, listTodos, resetTodos } from "./todos.ts";

beforeEach(() => resetTodos());

describe("todos", () => {
  it("adds a todo", () => {
    addTodo("buy milk");
    expect(listTodos()).toHaveLength(1);
  });

  it("rejects an empty title", () => {
    expect(() => addTodo("  ")).toThrow();
  });

  it("removes an existing todo", () => {
    const t = addTodo("x");
    expect(removeTodo(t.id)).toBe(true);
  });

  it("returns false when removing a missing id", () => {
    expect(removeTodo(999)).toBe(false);
  });
});