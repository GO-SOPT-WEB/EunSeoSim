import Audio from "../components/Audio";
import BGM from "../assets/bgm.mp3";
import { CardData } from "../types/card";
import Cards from "../components/Cards";
import Header from "../components/Header";
import { useState } from "react";

const Main = () => {
  const [compareList, setCompareList] = useState<CardData[]>([]); // 비교 대상인 카드의 {pk, imgId}를 저장
  const [pairedList, setPairedList] = useState<CardData[]>([]); // 짝을 맞춘 카드의 {pk, imgId}를 저장
  const [cardAllList, setCardAllList] = useState<number[]>([]); // 화면에 보여지는 카드 리스트(imgId 목록)를 저장

  return (
    <>
      <Audio bgm={BGM} />
      <Header
        setCompareList={setCompareList}
        setPairedList={setPairedList}
        setCardAllList={setCardAllList}
      />
      <Cards
        compareList={compareList}
        setCompareList={setCompareList}
        pairedList={pairedList}
        setPairedList={setPairedList}
        cardAllList={cardAllList}
        setCardAllList={setCardAllList}
      />
    </>
  );
};

export default Main;
