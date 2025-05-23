import { EthChainId, Token } from 'types';

// import oApe from 'assets/img/tokens/oApe.png';
import oBayc from 'assets/img/tokens/oBayc.png';
import oDai from 'assets/img/tokens/oDai.png';
import oEth from 'assets/img/tokens/oEth.png';
// import oGusd from 'assets/img/tokens/oGusd.png';
// import oLink from 'assets/img/tokens/oLink.png';
// import oMatic from 'assets/img/tokens/oMatic.png';
import oMayc from 'assets/img/tokens/oMayc.png';
// import oPaxg from 'assets/img/tokens/oPaxg.png';
// import oShib from 'assets/img/tokens/oShib.png';
// import oUni from 'assets/img/tokens/oUni.png';
import oUsdc from 'assets/img/tokens/oUsdc.png';
// import oUsdp from 'assets/img/tokens/oUsdp.png';
import oUsdt from 'assets/img/tokens/oUsdt.png';
import oWbtc from 'assets/img/tokens/oWbtc.png';
import oWpunks from 'assets/img/tokens/oWpunks.png';
import oXcn from 'assets/img/tokens/oXcn.png';

// import oVusd from 'assets/img/tokens/oVusd.png';
import OETH_TOKEN_ADDRESSES from '../../contracts/addresses/oEthTokens.json';

export const MAINNET_OETH_TOKENS = {
  eth: {
    id: 'eth',
    symbol: 'oETH',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.eth[EthChainId.MAINNET],
    asset: oEth,
  } as Token,
  wbtc: {
    id: 'wbtc',
    symbol: 'oBTC',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.wbtc[EthChainId.MAINNET],
    asset: oWbtc,
  } as Token,
  usdt: {
    id: 'usdt',
    symbol: 'oUSDT',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.usdt[EthChainId.MAINNET],
    asset: oUsdt,
  } as Token,
  usdc: {
    id: 'usdc',
    symbol: 'oUSDC',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.usdc[EthChainId.MAINNET],
    asset: oUsdc,
  } as Token,
  dai: {
    id: 'dai',
    symbol: 'oDAI',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.dai[EthChainId.MAINNET],
    asset: oDai,
  } as Token,
  xcn: {
    id: 'xcn',
    symbol: 'oXCN',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.xcn[EthChainId.MAINNET],
    asset: oXcn,
  } as Token,
  // vusd: {
  //   id: 'vusd',
  //   symbol: 'oVUSD',
  //   decimals: 8,
  //   address: OETH_TOKEN_ADDRESSES.vusd[EthChainId.MAINNET],
  //   asset: oVusd,
  // } as Token,
  bayc: {
    id: 'bayc',
    symbol: 'oBAYC',
    decimals: 0,
    address: OETH_TOKEN_ADDRESSES.bayc[EthChainId.MAINNET],
    asset: oBayc,
  } as Token,
  mayc: {
    id: 'mayc',
    symbol: 'oMAYC',
    decimals: 0,
    address: OETH_TOKEN_ADDRESSES.mayc[EthChainId.MAINNET],
    asset: oMayc,
  } as Token,
  wpunks: {
    id: 'wpunks',
    symbol: 'oPUNK',
    decimals: 0,
    address: OETH_TOKEN_ADDRESSES.wpunks[EthChainId.MAINNET],
    asset: oWpunks,
  } as Token,
};
