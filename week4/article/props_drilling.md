# React에서 Props Drilling을 해결하는 전략들은 무엇이 있을까?

### Props Drilling이란?

React Component 트리의 한 부분에서 다른 부분으로 props를 이용해 데이터를 전달할 때 여러 컴포넌트들을 거치게 되는데, 오로지 props를 하위 컴포넌트로 전달하는 용도로만 거치게 되는 과정을 말한다.

### Props Drilling은 문제일까?

props drilling이 그 자체로 문제라고 할 수는 없다. 오히려 React component의 기본 속성을 이용해 데이터를 전달할 수 있는 가장 근본적인 방법일 것이다. 그러나 props 전달을 위해 거치는 컴포넌트가 서너개 정도라면 어느정도 관리가 가능하겠지만, 10개, 20개를 넘어간다면 어떤 prop이 어디서 왔고 어디서 변경되는지 추적하기가 굉장히 복잡해질 것이다.

## Props Drilling을 피하는 방법

### 전역 상태 관리 라이브러리 사용하기

과도한 Props Drilling을 피하기 위해서는 전역 상태 관리 라이브러리를 사용하는 방법이 있다. 전역 상태 관리 라이브러리에서 해결하고자 하는 것은 특정 상태를 컴포넌트 트리의 어디에서든지 읽어올 수 있게 하며 상태를 수정할 수 있도록 하는 것이다.추가로 렌더링과 메모리 사용을 최적화하는 메커니즘을 제공할 수 있다.

전역 상태 관리 라이브러리로는 Redux, Recoil, mobx, jotai 등이 있다.

### Context API 활용하기

Context API는 React 컴포넌트 트리 안에서 전역 상태를 공유할 수 있도록 만들어진 도구이다. 이미 존재하는 상태를 다른 컴포넌트들과 쉽게 공유할 수 있도록 한다.

### Props.children으로 합성(composition) 활용하기

합성이란 컴포넌트에서 다른 컴포넌트를 담는 것을 뜻한다. 모달과 같이 자식으로 어떤 엘리먼트가 들어올지 예상할 수 없는 컴포넌트에서는 children을 사용하여 자식 엘리먼트를 전달할 수 있다.

props.children 또한 props에 속하지만, 일반 props보다 children을 사용할 때 더 명확히 구성할 수 있는 경우도 있다.

```jsx
export default function App() {
  return (
    <div className="App">
      <FirstComponent content="Who needs me?" />
    </div>
  );
}

function FirstComponent({ content }) {
  return (
    <div>
      <h3>I am the first component</h3>;
      <SecondComponent content={content} />|
    </div>
  );
}

function SecondComponent({ content }) {
  return (
    <div>
      <h3>I am the second component</h3>;
      <ThirdComponent content={content} />
    </div>
  );

function ThirdComponent({ content }) {
  return (
    <div>
      <h3>I am the third component</h3>;
      <ComponentNeedingProps content={content} />
    </div>
  );
}

function ComponentNeedingProps({ content }) {
  return <h3>{content}</h3>;
}
```

위 코드에서는 특정 props를 필요로하는 컴포넌트에게 넘겨주기 위하여 `App > FirstComponent > SecondComponent > ThirdComponent > ComponentNeedingProps`와 같이 5단계를 거쳐 내려주고 있다.

```jsx
export default function App() {
  const content = "Who needs me?";
  return (
    <div className="App">
      <FirstComponent>
        <SecondComponent>
          <ThirdComponent>
            <ComponentNeedingProps content={content} />
          </ThirdComponent>
        </SecondComponent>
      </FirstComponent>
    </div>
  );
}

function FirstComponent({ children }) {
  return (
    <div>
      <h3>I am the first component</h3>;{children}
    </div>
  );
}

function SecondComponent({ children }) {
  return (
    <div>
      <h3>I am the second component</h3>;{children}
    </div>
  );
}

function ThirdComponent({ children }) {
  return (
    <div>
      <h3>I am the third component</h3>
      {children}
    </div>
  );
}

function ComponentNeedingProps({ content }) {
  return <h3>{content}</h3>;
}
```

이를 children을 사용하여 리팩토링하면 위와같이 한결 더 추적이 원활한 형태로 개선된다. 물론 중첩이 많아져 이것도 좋은 방법은 아니지만, 어떤 상황에서는 children으로의 접근이 도움이 될 수도 있을 것 같다! 따라서 children을 활용하는 방법도 잘 익혀두어야겠다.

또한 React에서 children을 효과적으로 활용하기 위한 API를 지원하고 있다. [참고](https://www.daleseo.com/react-children/)React.Children API에서는 children prop에 대해 `map()`, `forEach()`, `count()`, `toArray()`, `only()` 이렇게 5개의 함수를 사용할 수 있다. 그러나 부모 컴포넌트가 자식 컴포넌트에 직접 접근하는 것은 특수한 상황을 제외하고는 모범 사례로 여겨지지는 않으니, 참고로 알아두도록 하자.

# **그렇다면 나는 합동세미나, 솝커톤, 앱잼에서 어떤걸 시도해보고 싶은가?**

아직 어떤게 “좋은 것” 인지 헷갈린다. 물론 정답은 없는 거지만, 기본적으로 과도한 props drilling을 피해야 하는데 동시에 전역 상태 관리 라이브러리는 꼭 필요할 때만 쓰라는 말들이 보인다. 그러나 3주차 과제를 통해 props drilling이 굉장히 직관성을 떨어뜨리고 유지보수를 어렵게 만든다는 걸 체감했기에 깊고 넓게 쓰이는 state에 대해서는 상태 관리 라이브러리를 충분히 활용해야하지 않을까 생각이 든다. 반면 얕은 depth 내에서만 쓰이는 state들도 존재할 것이고, 이 부분에서는 props drilling을 적절히 활용하는 것이 좋아보인다.

그렇다면 어떤 상태 관리 라이브러리를 사용해야할까? Redux가 가장 우세한 점유율을 가지고 있다고는 하지만 팀에서 구현해야 하는 기능의 특징에 따라서 고민해봐야 할 것이다. 경험자분들이 많이많이 알려주셨으면 좋겠다. 🥺 또 서버 상태 관리 라이브러리인 react-query도 활용해볼 수 있다면 좋겠다!

> 참고자료  
> [https://velog.io/@ahsy92/기술면접-상태관리와-Props-Drilling](https://velog.io/@ahsy92/%EA%B8%B0%EC%88%A0%EB%A9%B4%EC%A0%91-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC%EC%99%80-Props-Drilling)
> [https://medium.com/@yujso66/번역-리액트-상태-관리의-새로운-흐름-6e5ed0022e39](https://medium.com/@yujso66/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%EC%9D%98-%EC%83%88%EB%A1%9C%EC%9A%B4-%ED%9D%90%EB%A6%84-6e5ed0022e39)
> [https://velog.io/@hyerin0930/React-상태관리와-전역상태관리-라이브러리](https://velog.io/@hyerin0930/React-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC%EC%99%80-%EC%A0%84%EC%97%AD%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC)
