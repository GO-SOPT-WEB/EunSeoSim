import { useRecoilState, useRecoilValue } from "recoil";

import Card from "./Card.js";
import { CardData } from "../types/card.js";
import React from "react";
import { getCardArr } from "../utils/getCardArr.js";
import { levelState } from "../states/level.js";
import { scoreState } from "../states/score.js";
import styled from "styled-components";
import { useEffect } from "react";
import { useMemo } from "react";

interface CardsProps {
  compareList: CardData[];
  setCompareList: React.Dispatch<React.SetStateAction<CardData[]>>;
  pairedList: CardData[];
  setPairedList: React.Dispatch<React.SetStateAction<CardData[]>>;
  cardAllList: number[];
  setCardAllList: React.Dispatch<React.SetStateAction<number[]>>;
}

const Cards = (props: CardsProps) => {
  const {
    compareList,
    setCompareList,
    pairedList,
    setPairedList,
    cardAllList,
    setCardAllList,
  } = props;

  const levelType = useRecoilValue(levelState);
  const [score, setScore] = useRecoilState(scoreState);

  //levelType이 변경되지 않는한, cardAllList는 바꾸지 말아줘!!!
  const tempCardAllList = useMemo(() => {
    const tempCardAllList = getCardArr(levelType);
    return tempCardAllList;
  }, [levelType]);

  useEffect(() => {
    // 카드가 뒤집어지는 잠깐의 시간동안 새로 달라진 카드가 노출되지 않게 하기 위해, 카드 목록이 바뀔 때까지 약간의 딜레이를 준다.
    setTimeout(() => {
      setCardAllList(tempCardAllList);
    }, 300);
  }, [tempCardAllList, setCardAllList]);

  const clickHandler = (pk: number, imgId: number) => {
    let tempCompareList = [];
    let tempPairedList = [];
    switch (compareList.length) {
      case 0: // 첫번째 선택
        tempCompareList = [...compareList];
        tempCompareList.push({ pk, imgId });
        // compareList에 삽입
        setCompareList(tempCompareList);

        break;
      case 1: // 두번째 선택
        tempCompareList = [...compareList];
        tempCompareList.push({ pk, imgId });
        // compareList에 삽입
        setCompareList(tempCompareList);

        // 두번째 선택이 첫번째 선택과 같은 카드일 경우
        if (compareList[0].imgId === imgId) {
          //scoreDispatch({ type: "INCREASE" }); // 점수 올리기
          setScore(score + 1);

          tempPairedList = [...pairedList];

          // compareList의 요소들을 pairedList로 옮긴다
          tempCompareList.forEach((item) => {
            const pk = item.pk;
            const imgId = item.imgId;
            tempPairedList.push({ pk, imgId });
          });
          setPairedList(tempPairedList);

          // compairList 초기화
          setCompareList([]);
        } else {
          // 오답
          setTimeout(() => {
            setCompareList([]);
          }, 800);
        }
        break;
    }
  };

  return (
    <CardWrapper>
      {cardAllList.map((imgId, idx) => (
        <Card
          imgId={imgId}
          key={idx}
          pk={idx}
          clickHandler={clickHandler}
          compareList={compareList}
          pairedList={pairedList}
        ></Card>
      ))}
    </CardWrapper>
  );
};

const CardWrapper = styled.section`
  width: 90vw;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  margin: auto;
  margin-top: 3rem;
  padding-bottom: 3rem;
`;

export default Cards;
