import { useState, useEffect } from "react";
import NavbarHome from "../navbar/NavbarHome";
import NavbarCharts from "../navbar/NavbarCharts";
import NavbarPortfolio from "../navbar/NavbarPortfolio";
import NavbarMarkets from "../navbar/NavbarMarkets";
import NavbarWatchList from "../navbar/NavbarWatchList";
import NavbarNews from "../navbar/NavbarNews";
import NavbarProfiler from "../navbar/NavbarProfiler";
import NavbarHotProfiler from "../navbar/NavbarHotProfiler";
import NavbarMoneyFlow from "../navbar/NavbarMoneyFlow";
import NavbarAccount from "../navbar/NavbarAccount";
import NavbarPartner from "../navbar/NavbarPartner";
import NavBarCrowScore from "../navbar/NavBarCrowScore";

import NavbarMulti from "../navbar/NavbarMulti";
import NavbarLending from "../navbar/NavbarLending";
import NavbarBubbles from "../navbar/NavbarBubbles";
import NavbarCryptoMulti from "../navbar/NavbarCryptoMulticharts";
import NavbarWalletProfiler from "../navbar/NavbarWalletProfiler";
import NavbarMining from "../navbar/NavbarMining";
import NavbarNeoVikings from "../navbar/NavbarNeoVikings";
import NavbarGoofy from "../navbar/NavbarGoofy";
import NavbarBlockminer from "../navbar/NavbarBlockminer";
import NavbarBMS from "../navbar/NavbarBMS";
import NavbarMarketplace from "../navbar/NavbarNftMarketplace";
import NavbarGaming from "../navbar/NavbarMining";
const MobileNavbar = (props) => {
  const [menu, setMenu] = useState("");
  const [show, setShow] = useState("props.show");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    var current = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    setMenu(current);
  }, [window.location.pathname.substring()]);

  useEffect(() => {
    setShow(props.show);
    if (props.show === true) {
      setHidden(true);
    }
    if (props.show === false) {
      setTimeout(() => {
        setHidden(false);
      }, 200);
    }
  }, [props]);

  return (
    <div className="">
      <div
        className={`fixed z-[999999] h-full w-52 top-[60px] right-0 font-light ${
          show === true ? "mobileNavout" : "mobileNavin"
        } ${hidden === true ? "" : "hidden"}`}
        style={{
          background: "linear-gradient(#142028,rgba(41,41,41,0%))",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="relative flex flex-col justify-start h-[90%] py-3 px-2 overflow-scroll">
          <div className="-pr-20">
            <NavbarHome menu={menu} />
            <NavbarCharts menu={menu} />
            <NavbarMulti menu={menu} />
            <NavbarCryptoMulti menu={menu} />
            {/* <NavbarNews menu={menu} /> */}
            <NavbarProfiler menu={menu} />
            <NavbarMarkets menu={menu} />
            <NavbarMarketplace menu={menu} />
            <NavbarLending menu={menu} />
            <NavbarBubbles menu={menu} />

            <NavbarBlockminer menu={menu} />
            <NavbarGoofy menu={menu} />
            <NavbarNeoVikings menu={menu} />
            <NavbarBMS menu={menu} />

            <NavbarWalletProfiler menu={menu} />
            {/* <NavbarMoneyFlow menu={menu} />
            <NavbarHotProfiler menu={menu} /> */}
            <NavbarPortfolio menu={menu} />
            <NavbarPartner menu={menu} />
            <NavBarCrowScore menu={menu} />

            <NavbarGaming menu={menu} />
            {/* <NavbarHotProfiler menu={menu} /> */}

            <NavbarAccount menu={menu} />

            {/* <div className="absolute bottom-0">
              <NavbarAccount menu={menu} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
