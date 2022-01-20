import { createContext, useReducer } from "react";

const initialTheme = "light";
const initialTodos = [
  {
    id: 1,
    text: "달달구리먹기",
    done: false,
  },
];

export const ThemeContext = createContext();
export const ThemeDispatchContext = createContext();
export const TodoContext = createContext();
export const TodoDispatchContext = createContext();

function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return state === "light" ? "dark" : "light";
    case "DARK":
      return "dark";
    case "LIGHT":
      return "light";
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state.concat({
        id: state[state.length - 1]?.id + 1 || 1,
        text: action.newTodo,
        done: false,
      });
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function ContextProvider({ children }) {
  const [theme, themeDispatch] = useReducer(themeReducer, initialTheme);
  const [todo, todoDispatch] = useReducer(todoReducer, initialTodos);
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={themeDispatch}>
        <TodoContext.Provider value={todo}>
          <TodoDispatchContext.Provider value={todoDispatch}>
            {children}
          </TodoDispatchContext.Provider>
        </TodoContext.Provider>
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}
