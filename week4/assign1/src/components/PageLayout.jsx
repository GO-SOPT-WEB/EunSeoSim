import Header from "./Header";
import { styled } from "styled-components";
const PageLayout = (props) => {
  const { children } = props;
  return (
    <St.PageWrapper>
      <Header />
      {children}
    </St.PageWrapper>
  );
};

export default PageLayout;

const St = {
  PageWrapper: styled.div`
    display: flex;
  `,
};
