import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodosList from "./components/TodosList";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export const enum HandleTodoType {
  DELETE,
  EDIT,
  COMPLETED,
}

export interface HandleTodoProps {
  type: HandleTodoType;
  payload: {
    id: number;
    title?: string;
    isCompleted?: boolean;
  };
}

const App: React.FC = () => {
  const [todos, settodos] = useState<Todo[]>([]);

  const handleAdd = (title: string): void => {
    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      isCompleted: false,
    };

    settodos((prev) => [...prev, newTodo]);
  };

  const handleTodo = ({ type, payload }: HandleTodoProps): void => {
    switch (type) {
      case HandleTodoType.DELETE:
        settodos(todos.filter((t) => t.id !== payload.id));
        break;
      case HandleTodoType.COMPLETED:
        (function () {
          const cloneTodos = [...todos];

          const itemIndex = cloneTodos.findIndex((t) => t.id === payload.id);

          cloneTodos[itemIndex].isCompleted =
            !cloneTodos[itemIndex].isCompleted;

          settodos([...cloneTodos]);
        })();

        break;
      case HandleTodoType.EDIT:
        (function () {
          const cloneTodos = [...todos];

          const itemIndex = cloneTodos.findIndex((t) => t.id === payload.id);

          cloneTodos[itemIndex].title = payload.title || "";

          settodos([...cloneTodos]);
        })();

        break;

      default:
        break;
    }
  };

  return (
    <div className="container">
      <h1 className="title">TODO LIST</h1>
      <InputField handleAdd={handleAdd} />
      <TodosList todos={todos} handleTodo={handleTodo} />
    </div>
  );
};

export default App;
