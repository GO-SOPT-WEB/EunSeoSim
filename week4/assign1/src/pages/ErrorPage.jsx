import { styled } from "styled-components";

const ErrorPage = () => {
  return (
    <St.ErrorPageWrapper>
      <p>ErrorPage</p>
      <p>올바른 주소를 입력해주세요.</p>
    </St.ErrorPageWrapper>
  );
};

export default ErrorPage;

const St = {
  ErrorPageWrapper: styled.main`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    height: 100vh;
    & > p {
      ${({ theme }) => theme.fonts.R_Content_1};
    }
  `,
};
