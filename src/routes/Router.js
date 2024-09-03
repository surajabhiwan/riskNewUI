import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import TradingViewChart from "../pages/advancedChart/index.jsx";
import discordChatBot from "../pages/discord/index.jsx";

import SignUp from "../pages/register/index.js";
// import Home from "../pages";

import HomePro from "../pages/homePro/index.js";
import Charts from "../pages/charts";
import Volume from "../pages/charts/Volume/index.js";
import Distribution from "../pages/charts/Dostribution/index.js";
import Profit from "../pages/charts/Profit/index.js";
import Transfers from "../pages/charts/Transfers/index.js";
import Liquidity from "../pages/charts/Liquidity/index.js";
import Staking from "../pages/charts/Staking/index.js";
import Portfolio from "../pages/portfolio/index.js";
//import Markets from "../pages/markets";
import WatchList from "../pages/watchlist/index.js";
// import HotWallet from "../pages/hotWallet";
import WalletProfiler from "../pages/walletProfiler/index.js";
// import MoneyFlow from "../pages/moneyFlow";
import Account from "../pages/account";
import Multi from "../pages/multi/index.js";
import Partner from "../pages/parthner/index.js";
import PageNotFound from "../pages/notfound";
import MainLayout from "../layout/MainLayout";
import { GeneralRoute, PrivateRoute } from "./PrivateRoute";

import {
  HOME,
  HomePRO,
  LOGIN,
  REGISTER,
  CHARTS,
  CHARTSVOLUME,
  CHARTSDISTRIBUTION,
  CHARTSPROFIT,
  CHARTSTRANSFERS,
  CHARTSLIQUIDITY,
  CHARTSDEBT,
  PORTFOLIO,
  WATCHLIST,
  MARKETS,
  CRYPTOCURRENCIES,
  WALLETPROFILER,
  HOTWALLET,
  MONEYFLOW,
  ACCOUNT,
  MULTI,
  PARTNER,
  CHATPRO,
  lending,
  bubbles,
  cryptoMultiCharts,
  nftMarketplace,
  profitLeaderboard,
  walletProfilerSearch,
  Block_Miners,
  bms,
  goofy,
  Neo_Viking,
  Gaming,
  AdvancedChart,
  DiscordChatBot,
  educationPro,
  crowScore,
  viewAllAssets,
  educationProVideo,
} from "./routes";
import Cryptocurrencies from "../components/AddedComponents/Cryptocurrencies.jsx";
import CommingSoon from "../components/AddedComponents/CommingSoon/CommingSoon.jsx";
import Lending from "../pages/lending/index.jsx";
import Bubbles from "../pages/bubbles/index.jsx";
import CryptoMulti from "../pages/cryptoMultiCharts/index.jsx";

//Google analytics setup
import ReactGA from "react-ga";
import NftMarketplace from "../pages/nftMarketplace/index.jsx";
import ProLanding from "../components/Pro/ProLanding.js";
import WalletProfilerScreen from "../pages/walletProfiler/WalletProfilerScreen.jsx";
import BMS from "../pages/mining/BMS.jsx";
import BlockMiners from "../pages/mining/BlockMiners.jsx";
import Goofy from "../pages/mining/Goofy.jsx";
import NeoViking from "../pages/mining/NeoViking.jsx";
import Mining from "../pages/mining/index.jsx";
import DiscordChat from "../pages/discord/index.jsx";
import EducationPro from "../pages/educationPro/index.jsx";
import CrowScore from "../pages/glowScore/index.jsx";
import Home from "../pages/Home/index.jsx";
import TableDataNftAndToken from "../pages/tableDataNftAndToken/index.js";
import VideoPlayerPage from "../pages/educationPro/VideoPlayerPage.jsx";

function Routers() {
  return (
    <>
      <Routes>
        <Route
          path={educationPro}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <EducationPro></EducationPro>
            </GeneralRoute>
          }
        />
         <Route
          path={educationProVideo}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <VideoPlayerPage></VideoPlayerPage>
            </GeneralRoute>
          }
        />

        <Route
          path={viewAllAssets}
          element={
            <GeneralRoute layout={MainLayout}>
              <TableDataNftAndToken></TableDataNftAndToken>
            </GeneralRoute>
          }
        />
        <Route
          path={crowScore}
          element={
            <GeneralRoute layout={MainLayout}>
              <CrowScore />
            </GeneralRoute>
          }
        />

        <Route
          path={DiscordChatBot}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <DiscordChat></DiscordChat>
            </GeneralRoute>
          }
        />
        <Route
          path={AdvancedChart}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <TradingViewChart></TradingViewChart>
            </GeneralRoute>
          }
        />
        <Route
          path={LOGIN}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <Login />
            </GeneralRoute>
          }
        />
        <Route
          path={REGISTER}
          element={
            <GeneralRoute layout={MainLayout}>
              <SignUp />
            </GeneralRoute>
          }
        />
        <Route
          path={walletProfilerSearch}
          element={
            <GeneralRoute layout={MainLayout}>
              <WalletProfilerScreen />
            </GeneralRoute>
          }
        />
        <Route
          path={HOME}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <Home />
            </GeneralRoute>
          }
        />
        <Route
          path={HomePRO}
          element={
            <GeneralRoute layout={MainLayout}>
              {/* <HomePro /> */}
              <ProLanding text="Home-PRO" />
            </GeneralRoute>
          }
        />
        <Route
          path={CHARTS}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <Charts />
            </GeneralRoute>
          }
        />

        <Route
          path={CHARTSVOLUME}
          element={
            <GeneralRoute layout={MainLayout}>
              {" "}
              <Volume />{" "}
            </GeneralRoute>
          }
        />
        <Route
          path={CHARTSDISTRIBUTION}
          element={
            <GeneralRoute layout={MainLayout}>
              <Distribution />
            </GeneralRoute>
          }
        />
        <Route
          path={CHARTSPROFIT}
          element={
            <GeneralRoute layout={MainLayout}>
              <Profit />
            </GeneralRoute>
          }
        />
        <Route
          path={CHARTSTRANSFERS}
          element={
            <GeneralRoute layout={MainLayout}>
              <Transfers />
            </GeneralRoute>
          }
        />
        <Route
          path={CHARTSLIQUIDITY}
          element={
            <GeneralRoute layout={MainLayout}>
              <Liquidity />
            </GeneralRoute>
          }
        />
        <Route
          path={CHARTSDEBT}
          element={
            <GeneralRoute layout={MainLayout}>
              <Staking />
            </GeneralRoute>
          }
        />
        <Route
          path={MARKETS}
          element={
            <GeneralRoute layout={MainLayout}>
              {/* <Markets /> */}
              {/* <Partner /> */}
              <CommingSoon />
            </GeneralRoute>
          }
        />

        {/* MINING */}
        <Route
          path={bms}
          element={
            <GeneralRoute layout={MainLayout}>
              <BMS />
            </GeneralRoute>
          }
        />

        <Route
          path={Block_Miners}
          element={
            <GeneralRoute layout={MainLayout}>
              <BlockMiners />
            </GeneralRoute>
          }
        />

        <Route
          path={goofy}
          element={
            <GeneralRoute layout={MainLayout}>
              <Goofy />
            </GeneralRoute>
          }
        />

        <Route
          path={Neo_Viking}
          element={
            <GeneralRoute layout={MainLayout}>
              <NeoViking />
            </GeneralRoute>
          }
        />
        <Route
          path={Gaming}
          element={
            <GeneralRoute layout={MainLayout}>
              <Mining />
            </GeneralRoute>
          }
        />

        <Route
          path={CRYPTOCURRENCIES}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              {/* <News /> */}
              {/* <Partner /> */}
              <Cryptocurrencies />
            </GeneralRoute>
          }
        />
        <Route
          path={MULTI}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <Multi />
            </GeneralRoute>
          }
        />

        <Route
          path={profitLeaderboard}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              {/* <ProfitLeaderboard /> */}
              <ProLanding text="Profit Leaderboard" />
            </GeneralRoute>
          }
        />

        <Route
          path={cryptoMultiCharts}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <CryptoMulti />
            </GeneralRoute>
          }
        />

        <Route
          path={PARTNER}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <Partner />
            </GeneralRoute>
          }
        />
        <Route
          path={WALLETPROFILER}
          element={
            <GeneralRoute layout={MainLayout}>
              <WalletProfiler />
            </GeneralRoute>
          }
        />
        <Route
          path={HOTWALLET}
          element={
            <GeneralRoute layout={MainLayout}>
              {/* <HotWallet /> */}
              <ProLanding text="Hot wallets" />
            </GeneralRoute>
          }
        />
        <Route
          path={PORTFOLIO}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              {/* <WalletProfiler /> */}
              <Portfolio />
            </GeneralRoute>
          }
        />
        <Route
          path={MONEYFLOW}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              {/* <MoneyFlow /> */}
              <ProLanding text="Money Flow" />
            </GeneralRoute>
          }
        />

        <Route
          path={nftMarketplace}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <NftMarketplace />
            </GeneralRoute>
          }
        />

        <Route
          path={lending}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <Lending />
            </GeneralRoute>
          }
        />

        <Route
          path={bubbles}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <Bubbles />
            </GeneralRoute>
          }
        />

        <Route
          path={CHATPRO}
          element={
            <GeneralRoute layout={MainLayout}>
              {/* <Portfolio /> */}
              <Partner />
            </GeneralRoute>
          }
        />
        <Route
          path={WATCHLIST}
          element={
            <GeneralRoute layout={MainLayout}>
              <WatchList />
            </GeneralRoute>
          }
        />
        <Route
          path={ACCOUNT}
          render={({ location }) => {
            ReactGA.pageview(location.pathname);
            return null;
          }}
          element={
            <GeneralRoute layout={MainLayout}>
              <Account />
            </GeneralRoute>
          }
        />
        <Route
          path="*"
          element={
            <GeneralRoute layout={MainLayout}>
              <PageNotFound />
            </GeneralRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Routers;
