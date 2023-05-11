import { Outlet } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import SearchForm from "../components/SearchForm";
import speechBubbleLImg from "../assets/speech-bubble_l.png";
import { styled } from "styled-components";

const Main = () => {
  return (
    <PageLayout>
      <St.MainWrapper>
        <SearchForm />
        <Outlet />
      </St.MainWrapper>
    </PageLayout>
  );
};

export default Main;

const St = {
  MainWrapper: styled.main`
    padding: 4rem;
    margin-top: 4rem;

    display: flex;
    justify-content: center;

    width: 100%;

    background-image: url("${speechBubbleLImg}");
    background-repeat: no-repeat;
    background-size: 96% 90%;
  `,
};
