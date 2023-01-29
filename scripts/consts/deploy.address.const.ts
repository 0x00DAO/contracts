import { hardhatArguments } from 'hardhat';
import { deployNetwork } from './deploy.const';

interface ContractDeployAddressInterface {
  WelcomeEveryOne: string | null;
}

const ContractDeployAddress_BscTestNet: ContractDeployAddressInterface = {
  WelcomeEveryOne: null,
};

const ContractDeployAddress_BscMainNet: ContractDeployAddressInterface = {
  WelcomeEveryOne: null,
};

const ContractDeployAddress_PolygonTestNet: ContractDeployAddressInterface = {
  WelcomeEveryOne: '0x4f43b18e1A9a03B132a0bc6c893928460f445901',
};

const ContractDeployAddress_PolygonMainNet: ContractDeployAddressInterface = {
  WelcomeEveryOne: '0x576f54c39Cb8172C92F315464267E09BD97F960B',
};
let _ContractDeployAddress: ContractDeployAddressInterface = null as any;
switch (hardhatArguments.network) {
  case deployNetwork.polygon_testnet:
    _ContractDeployAddress = ContractDeployAddress_PolygonTestNet;
    break;
  case deployNetwork.polygon_mainnet:
    _ContractDeployAddress = ContractDeployAddress_PolygonMainNet;
    break;
  default:
    _ContractDeployAddress = undefined as any;
    break;
}

export const ContractDeployAddress: ContractDeployAddressInterface =
  _ContractDeployAddress;
