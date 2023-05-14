import { BrowserRouter, Route, Routes } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import Main from "./pages/Main";
import WeatherCard from "./components/WeatherCard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path=":type">
            <Route path=":area" element={<WeatherCard />} />
          </Route>
        </Route>
        <Route path=":type/" element={<ErrorPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
