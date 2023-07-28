import dongeunImg from "../assets/dongeun.png";
import speechBubbleSImage from "../assets/speech-bubble_s.svg";
import styled from "styled-components";
import yeonjinImg from "../assets/yeonjin.png";

const Header = () => {
  return (
    <St.HeaderWrapper>
      <div>
        <img className="dongeun-img" src={dongeunImg}></img>
        <div className="speech-bubble">
          <h3>
            연진아,
            <br />
            방송은 잘 보고있어.
            <br />
            날씨 좀 알려줄래?
          </h3>
          <img src={speechBubbleSImage}></img>
        </div>
      </div>
      <div>
        <h4 className="yeonjin-info">기상캐스터 박연진</h4>
        <img src={yeonjinImg}></img>
      </div>
    </St.HeaderWrapper>
  );
};

export default Header;

const St = {
  HeaderWrapper: styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 30vh;
    height: 100vh;
    padding: 0 5rem;

    .dongeun-img {
      width: 20rem;

      margin-top: 3rem;
    }

    .yeonjin-info {
      ${({ theme }) => theme.fonts.R_Content_2};
    }

    .speech-bubble {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-top: 1rem;

      ${({ theme }) => theme.fonts.R_Content_1};
    }

    .speech-bubble > h3 {
      position: absolute;
      z-index: 1;

      padding-top: 2.5rem;
    }
    .speech-bubble > img {
      position: relative;

      width: 23rem;
    }
  `,
};
