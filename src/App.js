import Main from "./Pages/Main";
import { ContextProvider } from "./context/context";
import { GlobalStyle } from "./styles/GlobalStyle";

function App() {
  return (
    <ContextProvider>
      <GlobalStyle />
      <Main />
    </ContextProvider>
  );
}

export default App;
