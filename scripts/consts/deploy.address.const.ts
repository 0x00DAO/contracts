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
let _ContractDeployAddress: ContractDeployAddressInterface =
  ContractDeployAddress_BscTestNet;
switch (hardhatArguments.network) {
  case deployNetwork.polygon_testnet:
    _ContractDeployAddress = ContractDeployAddress_BscTestNet;
    break;
  case deployNetwork.polygon_mainnet:
    _ContractDeployAddress = ContractDeployAddress_BscMainNet;
    break;
  default:
    _ContractDeployAddress = undefined as any;
    break;
}

export const ContractDeployAddress: ContractDeployAddressInterface =
  _ContractDeployAddress;
