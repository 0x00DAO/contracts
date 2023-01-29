import 'dotenv/config';
import { hardhatArguments } from 'hardhat';
import { deployNetwork } from '../consts/deploy.const';

export interface RuntimeConfig {
  network: string;

  upgradeDefenderMultiSigAddress?: string;
}

export function getRuntimeConfig(): RuntimeConfig {
  const network = hardhatArguments.network;
  switch (network) {
    case deployNetwork.bsc_testnet:
      return getRuntimeConfigBscTestNet();
    case deployNetwork.bsc_mainnet:
      return getRuntimeConfigBscMainNet();
    case deployNetwork.polygon_testnet:
      return getRuntimeConfigPolygonTestNet();
    case deployNetwork.polygon_mainnet:
      return getRuntimeConfigPolygonMainNet();
    default:
      throw new Error(`Network ${network} is not supported`);
  }
}

function getRuntimeConfigBscTestNet(): RuntimeConfig {
  return {
    network: 'bsc_testnet',
    upgradeDefenderMultiSigAddress:
      process.env.BSC_TESTNET_DEPLOYER_UPGRADE_MULTISIG_ADDRESS,
  };
}

function getRuntimeConfigBscMainNet(): RuntimeConfig {
  return {
    network: 'bsc_mainnet',
    upgradeDefenderMultiSigAddress:
      process.env.BSC_MAINNET_DEPLOYER_UPGRADE_MULTISIG_ADDRESS,
  };
}

function getRuntimeConfigPolygonTestNet(): RuntimeConfig {
  return {
    network: 'polygon_testnet',
    upgradeDefenderMultiSigAddress:
      process.env.POLYGON_TESTNET_DEPLOYER_UPGRADE_MULTISIG_ADDRESS,
  };
}

function getRuntimeConfigPolygonMainNet(): RuntimeConfig {
  return {
    network: 'polygon_mainnet',
    upgradeDefenderMultiSigAddress:
      process.env.POLYGON_MAINNET_DEPLOYER_UPGRADE_MULTISIG_ADDRESS,
  };
}
