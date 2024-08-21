import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const iconStyle = {
    color: "rgba(255, 255, 255, 0.8)", // Light white color with transparency
    fontSize: "30px", // Customize the icon size
  };

  const buttonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent light white background
    borderRadius: "50%", // Make the background circular
  };

  const handleClickLinks = (path) => {
    navigate(path);
  };
  return (
    <div className="footerOuterDiv">
      <div className="footerLeft">
        <div className="logoDiv">
          <div className="logoImg">
            <img src="./android-chrome-192x192.png" alt="" />
          </div>
          <div className="logoHeadingDiv">
            <div className="logoHeading">RiskWisePro</div>
            <div className="logoHeadingBar"></div>
          </div>
        </div>
        <div className="SocialDiv">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.201 21H0.84725V6.9795H5.201V21ZM3.0215 5.067C1.6295 5.067 0.5 3.9135 0.5 2.5215C0.5 1.85276 0.765657 1.2114 1.23853 0.73853C1.7114 0.265657 2.35276 0 3.0215 0C3.69024 0 4.3316 0.265657 4.80447 0.73853C5.27734 1.2114 5.543 1.85276 5.543 2.5215C5.543 3.9135 4.4135 5.067 3.0215 5.067ZM21.4955 21H17.1515V14.175C17.1515 12.5483 17.1185 10.4625 14.888 10.4625C12.6245 10.4625 12.2772 12.2295 12.2772 14.058V21H7.928V6.9795H12.1033V8.892H12.164C12.7452 7.79025 14.165 6.62775 16.283 6.62775C20.6893 6.62775 21.4993 9.5295 21.4993 13.2983V21H21.4955Z"
              fill="#5D6588"
            />
          </svg>

          <svg
            width="12"
            height="24"
            viewBox="0 0 12 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.95521 24V12.7385H0V8.68382H2.95521V5.2206C2.95521 2.49917 4.70086 0 8.72321 0C10.3518 0 11.5561 0.15732 11.5561 0.15732L11.4612 3.9437C11.4612 3.9437 10.233 3.93166 8.89279 3.93166C7.44227 3.93166 7.20988 4.60522 7.20988 5.72316V8.68382H11.5765L11.3865 12.7385H7.20988V24H2.95521Z"
              fill="#5D6588"
            />
          </svg>

          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.57628 6.87592C7.85597 6.87592 6.45206 8.27982 6.45206 10.0001C6.45206 11.7204 7.85597 13.1244 9.57628 13.1244C11.2966 13.1244 12.7005 11.7204 12.7005 10.0001C12.7005 8.27982 11.2966 6.87592 9.57628 6.87592ZM18.9466 10.0001C18.9466 8.70639 18.9583 7.42435 18.8857 6.13295C18.813 4.63295 18.4708 3.3017 17.3739 2.20482C16.2747 1.1056 14.9458 0.765761 13.4458 0.693104C12.1521 0.620448 10.87 0.632167 9.57863 0.632167C8.28488 0.632167 7.00285 0.620448 5.71144 0.693104C4.21144 0.765761 2.88019 1.10795 1.78331 2.20482C0.684096 3.30404 0.344252 4.63295 0.271596 6.13295C0.198939 7.4267 0.210658 8.70873 0.210658 10.0001C0.210658 11.2915 0.198939 12.5759 0.271596 13.8673C0.344252 15.3673 0.686439 16.6986 1.78331 17.7954C2.88253 18.8947 4.21144 19.2345 5.71144 19.3072C7.00519 19.3798 8.28722 19.3681 9.57863 19.3681C10.8724 19.3681 12.1544 19.3798 13.4458 19.3072C14.9458 19.2345 16.2771 18.8923 17.3739 17.7954C18.4732 16.6962 18.813 15.3673 18.8857 13.8673C18.9607 12.5759 18.9466 11.2939 18.9466 10.0001ZM9.57628 14.8072C6.91613 14.8072 4.76925 12.6603 4.76925 10.0001C4.76925 7.33998 6.91613 5.1931 9.57628 5.1931C12.2364 5.1931 14.3833 7.33998 14.3833 10.0001C14.3833 12.6603 12.2364 14.8072 9.57628 14.8072ZM14.5802 6.11889C13.9591 6.11889 13.4575 5.61732 13.4575 4.99623C13.4575 4.37514 13.9591 3.87357 14.5802 3.87357C15.2013 3.87357 15.7028 4.37514 15.7028 4.99623C15.703 5.14371 15.6741 5.28978 15.6178 5.42607C15.5614 5.56236 15.4787 5.68619 15.3744 5.79048C15.2702 5.89476 15.1463 5.97745 15.01 6.03381C14.8737 6.09016 14.7277 6.11907 14.5802 6.11889Z"
              fill="#5D6588"
            />
          </svg>
        </div>
      </div>
      <div className="footerRight">
        <div className="footerRightInner">
          <h3>Quick Links.</h3>
          <div className="linkOuterDiv">
            <div className="linksDiv1">
              <ul>
                <li onClick={()=>{
                  handleClickLinks('/')
                }}>Home</li>
                <li onClick={()=>{
                  handleClickLinks('/bubbles')
                }}>Bubbles</li>
                <li onClick={()=>{
                  handleClickLinks('/portfolio')
                }}>Portfolio</li>
              </ul>
            </div>
            <div className="linksDiv2">
              <ul>
                <li onClick={()=>{
                  handleClickLinks('/charts')
                }}>Charts</li>
                {/* <li onClick={()=>{
                  handleClickLinks('/charts')
                }}>Marketplace</li>
                <li onClick={()=>{
                  handleClickLinks('/home')
                }}>Mining</li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
