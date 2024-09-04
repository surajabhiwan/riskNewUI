// const ip = "https://devapi.riskwisepro.io";
// 192.168.1.95:3013
const ip = "http://192.168.1.95:3013";
// const ip = "https://devenvapi.riskwisepro.io";

// maintanace check
export const maintainace = `${ip}/api/admin/check/maintainace`;

//#region live ADA price
export const cardanoPriceApi = `${ip}/api/token/main/ada?curency=USD`;
//#endregion

//#region Token API
export const tableDataApi = `${ip}/api/token/top/hightLow`;
export const candleStickApi = `${ip}/api/token/OHLCV`;
export const topLosersApi = `${ip}/api/token/top/hightLow/looser`;
export const topGainersApi = `${ip}/api/token/top/hightLow/gainer`;
export const trendingApi = `${ip}/api/token/top/hightLow/trend`;
export const recentAddedAPi = `${ip}/api/token/top/hightLow/recent`;
export const tokenHistoryApi = `${ip}/api/token/trades`;
export const tokenTopHoldersApi = `${ip}/api/token/top/holders`;
export const tokenDepthDetails = `${ip}/api/token/depth/details`;
export const buySellDataApi = `${ip}/api/token/stats`;

// export const tokenDataAll = `${ip}/api/getAlltokens`;
export const tickerDataAll = `${ip}/api/getAlltokens`;

//#endregion

// New Apis by digvijay
// For tokens
export const topMarketCapTokens = `${ip}/api/tokens/top-market-cap`;
export const topLiquidityTokens = `${ip}/api/tokens/top-liquidity`;
export const topVolumeTokens = `${ip}/api/tokens/top-volume`;

// For NFTs
export const topRankingNfts = `${ip}/api/nfts/top-rankings`;

export const topVolumeCollection = `${ip}/api/nfts/top-volume`;

//#region NFT APi
export const topNftAPi = `${ip}/api/nft/top/timeframe`;
export const getNftImage = `${ip}/api/nft/Get/MetaData`;
export const getNftTimeseries = `${ip}/api/nft/Get/timeseries`;
export const candleStickNftApi = `${ip}/api/nft/Get/ohlcv`;
export const nftDepthDetails = `${ip}/api/nft/depth/details`;
export const getNftCollectionAPi = `${ip}/api/nft/assets/collection`;
export const getNftSalesHistoryApi = `${ip}/api/nft/assets/sale/history`;
export const getNftTopHoldersApi = `${ip}/api/nft/assets/top/holders`;
//#endregion

//#region GetImages URL
export const getImage = `${ip}/api/get`;
export const getImageNft = `${ip}/public`;
export const nftCollectionBase = `${ip}`;
//#endregion

//#region login/register api
export const loginApi = `${ip}/api/user/login`;
export const registerApi = `${ip}/api/user/register`;
//#endregion

//#region: Portfolio api
export const walletPositionApi = `${ip}/api/user/wallet/state`;
export const walletHistoryApi = `${ip}/api/user/wallet/history`;
export const walletValueApi = `${ip}/api/user/wallet/value`;
//#endregion

//#region: Cryptocurrencies
export const cryptoCurrenciesList = `${ip}/api/crypto/currencies`;
export const cryptoIcon = `${ip}/api/crypto/currencies/info`;
//#endregion

//#region: Wallet profiler PRO
export const getAddress = `${ip}/api/pro/wallet/convertaddress`; //wallet to stake
export const staketoad = `${ip}/api/pro/wallet/staketoAddress`; //stake to wallet
export const UTXos = `${ip}/api/pro/wallet/utxos`;
export const transactionDetails = `${ip}/api/pro/wallet/transaction/detail`;
export const transactionAll = `${ip}/api/pro/wallet/transaction/all`;
export const allAssets = `${ip}/api/pro/wallet/assets/all`;
export const assetDetails = `${ip}/api/pro/wallet/assets/detail`;
export const assetHistory = `${ip}/api/pro/wallet/assets/history`;
export const isProApi = `${ip}/api/pro/wallet/isPro`;
export const associateTime = `${ip}/api/pro/wallet/associatetime`;
export const associateAmount = `${ip}/api/pro/wallet/associateAmount`;
//#endregion

//#region: Universal search api - wallet/policy/unit
export const search_api = `${ip}/api/search/`;
//#endregion

//#region: Banners for adv.
export const getAdsHome = `${ip}/api/admin/get/ads/0`;
export const getAdsPortfolio = `${ip}/api/admin/get/ads/1`;

export const viewBannerImage = `${ip}/uploads/ads/`;
//#endregion

export const projectIdBlockfrost = "mainneto8FhmQ21jsl7wwVoJrC3T4xJOhcPjeI6";
