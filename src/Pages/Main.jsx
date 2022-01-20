import { useContext, useState } from "react";
import styled from "styled-components";
import { THEMES } from "../constant/theme";
import {
  ThemeContext,
  ThemeDispatchContext,
  TodoContext,
  TodoDispatchContext,
} from "../context/context";
import { Delete } from "@styled-icons/fluentui-system-filled";

function Main() {
  const [newTodo, setNewTodo] = useState("");

  const themeType = useContext(ThemeContext);
  const themeDispatch = useContext(ThemeDispatchContext);
  const todos = useContext(TodoContext);
  const todoDispatch = useContext(TodoDispatchContext);

  return (
    <Background theme={THEMES[themeType]}>
      <ToggleButton
        theme={THEMES[themeType]}
        onClick={() => themeDispatch({ type: "TOGGLE" })}
      />
      <Title theme={THEMES[themeType]}>
        {themeType.toUpperCase() + " MODE"}
      </Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          todoDispatch({ type: "ADD", newTodo });
          setNewTodo("");
        }}
      >
        <TodoInput
          theme={THEMES[themeType]}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="ADD TODOS"
        />
      </form>
      <TodoWrapper theme={THEMES[themeType]}>
        {todos.map(({ id, text, done }) => (
          <Todo key={id}>
            <Checkbox
              theme={THEMES[themeType]}
              type="checkbox"
              onChange={() => todoDispatch({ type: "TOGGLE", id })}
              id="checkbox"
              defaultChecked={done}
            />
            {text}
            <DeleteButton
              onClick={() => todoDispatch({ type: "DELETE", id })}
            />
          </Todo>
        ))}
      </TodoWrapper>
    </Background>
  );
}

export default Main;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.p`
  color: ${(props) => props.theme.color};
  font-weight: 900;
`;

const ToggleButton = styled.button`
  width: 20px;
  height: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  border-color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.buttonColor};
  color: ${(props) => props.theme.color};
`;

const TodoInput = styled.input`
  width: 200px;
  margin: 20px 0;
  padding: 5px 10px;
  border: 2px solid ${(props) => props.theme.color};
  border-radius: 3px;
`;

const TodoWrapper = styled.div`
  width: 200px;
  margin-left: 10px;
  color: ${(props) => props.theme.color};
  font-weight: 600;
`;

const DeleteButton = styled(Delete)`
  width: 20px;
`;

const Todo = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 7px;
`;
