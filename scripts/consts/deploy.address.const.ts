import { hardhatArguments } from 'hardhat';
import { deployNetwork } from './deploy.const';

interface ContractDeployAddressInterface {}

const ContractDeployAddress_BscTestNet: ContractDeployAddressInterface = {};

const ContractDeployAddress_BscMainNet: ContractDeployAddressInterface = {};
let _ContractDeployAddress: ContractDeployAddressInterface =
  ContractDeployAddress_BscTestNet;
switch (hardhatArguments.network) {
  case deployNetwork.bsc_testnet:
    _ContractDeployAddress = ContractDeployAddress_BscTestNet;
    break;
  case deployNetwork.bsc_mainnet:
    _ContractDeployAddress = ContractDeployAddress_BscMainNet;
    break;
  default:
    _ContractDeployAddress = undefined as any;
    break;
}

export const ContractDeployAddress: ContractDeployAddressInterface =
  _ContractDeployAddress;
