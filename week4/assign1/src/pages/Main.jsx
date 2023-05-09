import { Outlet } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import WeaderCard from "../components/WeaderCard";

const Main = () => {
  return (
    <PageLayout>
      <WeaderCard />
      <Outlet />
    </PageLayout>
  );
};

export default Main;
