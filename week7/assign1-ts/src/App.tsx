import GlobalStyle from "./styles/globalStyles";
import Main from "./pages/Main";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import backgroundImage from "./assets/pageImages/background.png";
import styled from "styled-components";
import theme from "./styles/theme";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Background>
          <Main />
        </Background>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;

const Background = styled.div`
  background-image: url(${backgroundImage});

  height: min-content;
`;
