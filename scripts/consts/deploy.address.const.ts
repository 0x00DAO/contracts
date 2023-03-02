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

  /**
   * SBTs for DAO contributors
   */
  SoulWelcomeEveryOne?: ContractDeployAddress;
}

const ContractDeployAddress_PolygonTestNet: ContractDeployAddressInterface = {
  WelcomeEveryOne: '0x4f43b18e1A9a03B132a0bc6c893928460f445901',
  TokenSafeBoxTeam: '0xcB8C418345997C35798270B37e7aD8b8B7410fc1',

  TokenVestingTeam: '0x01e05a3759a300C8e61c7a6e2e017BABD4589dB6',
  // TokenVestingCommunity?: ContractDeployAddress;
  // TokenVestingFund?: ContractDeployAddress;
  // TokenVestingOthers?: ContractDeployAddress;

  /**
   * Team Splitter
   */
  TokenSafeBoxPaymentSplitterTeam: '0xee9dc7C13b220e1C89Cc96c8fb1f38d5d6bF9554',

  /**
   * Team Holders
   */
  TokenSafeBoxTeamDAO: '0x523Ca418a6aE25b22B63431092D9c4d9Dbf080Dd',
  TokenSafeBoxTeamProject: '0xFbfa482256e01139190d3DB9339C23d5847d967D',
  TokenSafeBoxTeamOther: '0x2CB993648Ef153fF6d2d3188a2eea7b24744a0AF',

  /**
   * SBTs for DAO contributors
   */
  SoulWelcomeEveryOne: '0x53601e41FEDE478fBd3e0d97C19f09F71aFdA905',
};

const ContractDeployAddress_PolygonMainNet: ContractDeployAddressInterface = {
  WelcomeEveryOne: '0x576f54c39Cb8172C92F315464267E09BD97F960B',
  TokenSafeBoxTeam: '0x89eEB8e4564Fc7b89DA6B3478A6dc355E1C1Be6B',

  TokenVestingTeam: '0x47CfF20eD4C024c96432F0D9fC3e292F21Ca3080',
  // TokenVestingCommunity?: ContractDeployAddress;
  // TokenVestingFund?: ContractDeployAddress;
  // TokenVestingOthers?: ContractDeployAddress;

  /**
   * Team Splitter
   */
  TokenSafeBoxPaymentSplitterTeam: '0x255A90b302203b09f968a4602d905972aae49009',

  /**
   * Team Holders
   */
  TokenSafeBoxTeamDAO: '0x4fFe08f38a13702DfF1d152C872c1c47841749Ca',
  TokenSafeBoxTeamProject: '0x8706b341A1678a1a7A2971C995CABB761752c9DB',
  TokenSafeBoxTeamOther: '0x3F2Ac86101B675BbA7b12aa61f931E63b13b5d6B',

  /**
   * SBTs for DAO contributors
   */
  SoulWelcomeEveryOne: null,
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
