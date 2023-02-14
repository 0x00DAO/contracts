import { hardhatArguments } from 'hardhat';
import { deployNetwork } from './deploy.const';

type ContractDeployAddress = string | null;

interface ContractDeployAddressInterface {
  WelcomeEveryOne: ContractDeployAddress;
  TokenSafeBoxTeam: ContractDeployAddress;
  TokenVestingTeam?: ContractDeployAddress;
  TokenVestingCommunity?: ContractDeployAddress;
  TokenVestingFund?: ContractDeployAddress;
  TokenVestingOthers?: ContractDeployAddress;

  /**
   * SafeBox for distribution
   */
  TokenSafeBoxCommunity?: ContractDeployAddress;
  TokenSafeBoxFund?: ContractDeployAddress;
  TokenSafeBoxOthers?: ContractDeployAddress;

  /**
   * Team Splitter
   */
  TokenSafeBoxPaymentSplitterTeam?: ContractDeployAddress;

  /**
   * Team Holders
   */
  TokenSafeBoxTeamDAO?: ContractDeployAddress;
  TokenSafeBoxTeamProject?: ContractDeployAddress;
  TokenSafeBoxTeamOther?: ContractDeployAddress;
}

const ContractDeployAddress_PolygonTestNet: ContractDeployAddressInterface = {
  WelcomeEveryOne: '0x4f43b18e1A9a03B132a0bc6c893928460f445901',
  TokenSafeBoxTeam: '0xcB8C418345997C35798270B37e7aD8b8B7410fc1',

  /**
   * Team Holders
   */
  // TokenSafeBoxTeamDAO?: ContractDeployAddress;
  TokenSafeBoxTeamProject: '0xFbfa482256e01139190d3DB9339C23d5847d967D',
  // TokenSafeBoxTeamOther?: ContractDeployAddress;
};

const ContractDeployAddress_PolygonMainNet: ContractDeployAddressInterface = {
  WelcomeEveryOne: '0x576f54c39Cb8172C92F315464267E09BD97F960B',
  TokenSafeBoxTeam: '0x89eEB8e4564Fc7b89DA6B3478A6dc355E1C1Be6B',

  /**
   * Team Holders
   */
  // TokenSafeBoxTeamDAO?: ContractDeployAddress;
  TokenSafeBoxTeamProject: '0x8706b341A1678a1a7A2971C995CABB761752c9DB',
  // TokenSafeBoxTeamOther?: ContractDeployAddress;
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
