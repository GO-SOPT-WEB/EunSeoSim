import Buttons from "./Buttons";
import { CardData } from "../types/card";
import headerImage from "../assets/pageImages/header.png";
import styled from "styled-components";

interface HeaderProps {
  setCompareList: React.Dispatch<React.SetStateAction<CardData[]>>;
  setPairedList: React.Dispatch<React.SetStateAction<CardData[]>>;
  setCardAllList: React.Dispatch<React.SetStateAction<number[]>>;
}

const Header = (props: HeaderProps) => {
  const { setCompareList, setPairedList, setCardAllList } = props;
  return (
    <>
      <HeaderContainer src={headerImage}></HeaderContainer>
      <Buttons
        setCompareList={setCompareList}
        setPairedList={setPairedList}
        setCardAllList={setCardAllList}
      ></Buttons>
    </>
  );
};

export default Header;

const HeaderContainer = styled.img`
  width: 100vw;
  text-align: center;

  border-bottom: 0.3rem double ${({ theme }) => theme.colors.black};
`;
