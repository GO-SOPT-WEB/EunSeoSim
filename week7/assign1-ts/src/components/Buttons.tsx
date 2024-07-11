import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { CardData } from "../types/card";
import ModalPortal from "./ModalPortal";
import { ReactNode } from "react";
import SuccessModal from "./SuccessModal.tsx";
import { getCardArr } from "../utils/getCardArr";
import { levelState } from "../states/level";
import { scoreState } from "../states/score";
import styled from "styled-components";
import usdDidMountEffet from "../hooks/useDidMountEffect";
import { useRef } from "react";
import { useState } from "react";

interface ButtonProps {
  setCompareList: React.Dispatch<React.SetStateAction<CardData[]>>;
  setPairedList: React.Dispatch<React.SetStateAction<CardData[]>>;
  setCardAllList: React.Dispatch<React.SetStateAction<number[]>>;
  value: string;
  children: ReactNode;
}

const Button = (props: ButtonProps) => {
  const { setCompareList, setPairedList, setCardAllList, value } = props;
  const [levelType, setLevelType] = useRecoilState(levelState);

  const setScore = useSetRecoilState(scoreState);
  return props.value === "reset" ? (
    <StyledButton
      onClick={() => {
        setCompareList([]);
        setPairedList([]);
        setScore(0);
        // 카드가 뒤집어지는 잠깐의 시간동안 새로 달라진 카드가 노출되지 않게 하기 위해, 카드 목록이 바뀔 때까지 약간의 딜레이를 준다.
        setTimeout(() => {
          setCardAllList(getCardArr(levelType));
        }, 800);
      }}
      type="button"
    >
      {props.children}
    </StyledButton>
  ) : (
    <StyledButton
      onClick={(e: React.MouseEvent<HTMLButtonElement, Event>) => {
        setCompareList([]);
        setPairedList([]);
        setScore(0);
        const target = e.target as HTMLButtonElement;
        setLevelType(target.value);
      }}
      value={value}
      type="button"
    >
      {props.children}
    </StyledButton>
  );
};

interface ButtonsProps {
  setCompareList: React.Dispatch<React.SetStateAction<CardData[]>>;
  setPairedList: React.Dispatch<React.SetStateAction<CardData[]>>;
  setCardAllList: React.Dispatch<React.SetStateAction<number[]>>;
}

const ResetButton = (props: ButtonsProps) => {
  const { setCompareList, setPairedList, setCardAllList } = props;
  return (
    <Button
      setCompareList={setCompareList}
      setPairedList={setPairedList}
      setCardAllList={setCardAllList}
      value="reset"
    >
      리셋
    </Button>
  );
};

const LevelButtons = (props: ButtonsProps) => {
  const { setCompareList, setPairedList, setCardAllList } = props;
  return (
    <section>
      <Button
        setCompareList={setCompareList}
        setPairedList={setPairedList}
        setCardAllList={setCardAllList}
        value="easy"
      >
        이지
      </Button>
      <Button
        setCompareList={setCompareList}
        setPairedList={setPairedList}
        setCardAllList={setCardAllList}
        value="normal"
      >
        노말
      </Button>
      <Button
        setCompareList={setCompareList}
        setPairedList={setPairedList}
        setCardAllList={setCardAllList}
        value="hard"
      >
        하드
      </Button>
    </section>
  );
};

const Score = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const animationScore = useRef<HTMLSpanElement>(null);
  const levelType = useRecoilValue(levelState);

  const goal = () => {
    switch (levelType) {
      case "easy":
        return 5;
      case "normal":
        return 7;
      case "hard":
        return 9;
      default:
        return 5;
    }
  };

  //const score = useContext(ScoreContext);
  const score = useRecoilValue(scoreState);

  // 첫 렌더링 때는 useEffect를 적용하지 않도록 custom hook을 사용함!
  // 레퍼런스 : https://seokd.tistory.com/8
  usdDidMountEffet(() => {
    // score가 변경되면 animation 이라는 class를 추가함
    animationScore.current &&
      animationScore.current.classList.toggle("animation");
    setTimeout(() => {
      animationScore.current &&
        animationScore.current.classList.toggle("animation");
    }, 500);

    console.log(score, goal());
    if (score === goal()) {
      setModalOpen(true);
    }
  }, [score]);

  return (
    <>
      {modalOpen && (
        <ModalPortal>
          <SuccessModal onClose={() => setModalOpen(false)} />
        </ModalPortal>
      )}
      <StyledScore>
        <span className="explainText">당신의 점수!</span>
        <span className="scoreText" ref={animationScore}>
          {" "}
          {score}{" "}
        </span>
        <span className="scoreGoal">/ {goal()}</span>
      </StyledScore>
    </>
  );
};

const Buttons = (props: ButtonsProps) => {
  const { setCompareList, setPairedList, setCardAllList } = props;

  return (
    <>
      <ButtonContainer>
        <LevelButtons
          setCompareList={setCompareList}
          setPairedList={setPairedList}
          setCardAllList={setCardAllList}
        />
        <RightGroupWrapper>
          <Score />
          <ResetButton
            setCompareList={setCompareList}
            setPairedList={setPairedList}
            setCardAllList={setCardAllList}
          />
        </RightGroupWrapper>
      </ButtonContainer>
    </>
  );
};

export default Buttons;

const RightGroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledScore = styled.span`
  .explainText {
    margin-right: 1.5rem;
  }
  .scoreGoal {
    margin-left: 1.7rem;
  }
  .scoreText {
    position: absolute;
  }
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2rem);
    }
    100% {
      transform: translateY(0);
    }
  }
  .animation {
    animation: bounce 0.5s infinite;

    color: ${({ theme }) => theme.colors.red};
  }
  font-family: "DOSSaemmul"; //이건 왜 따로 적용을 해야되는거지?
  font-size: 1.5rem;

  margin-right: 1rem;
`;

const StyledButton = styled.button`
  border: 0.3rem double ${({ theme }) => theme.colors.black};

  background-color: ${({ theme }) => theme.colors.grey};

  font-size: 1rem;

  padding: 0.5rem 1rem;
  margin: 1rem;

  cursor: pointer;

  &:hover {
    border: 0.3rem double ${({ theme }) => theme.colors.grey};

    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const ButtonContainer = styled.section`
  width: 100vw;

  display: flex;
  justify-content: space-between;
`;
