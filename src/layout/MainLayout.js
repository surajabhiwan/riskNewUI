import React, { useEffect, useState } from "react";
import MainContentContainer from "../common/MainContentContainer";
import TopNavbar from "../components/navbar/TopNavbar";
import Header from "../components/header/Header";
import useMedia from "../common/mediaQuery";
import { useLocation } from "react-router-dom";

function MainLayout(props) {
  const { children } = props;
  const IsLarge = useMedia();
  const isActive = IsLarge.useXlLarge;
  const [isLoginScreen, setIsLoginScreen] = useState(false);
  const location = useLocation();

  // useEffect(()=>{
  // if(location.pathname === '/login'){
  // setIsLoginScreen(true)
  // }
  // },[location])

  return (
    <div className="relative min-w-screen min-h-screen bg-[#232629] bg-opacity-10">
      <div className="absolute my-component"></div>
      {isActive ? <TopNavbar /> : ""}
      <Header />
      <MainContentContainer> {children} </MainContentContainer>
    </div>
  );
}
export default MainLayout;
