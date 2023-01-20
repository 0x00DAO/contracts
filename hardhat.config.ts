import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import { HardhatUserConfig, task } from 'hardhat/config';

import '@openzeppelin/hardhat-defender';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-abi-exporter';

const {
  BSC_TESTNET_URL,
  BSC_TESTNET_DEPLOYER_PRIVATE_KEY,
  BSC_MAINNET_URL,
  BSC_MAINNET_DEPLOYER_PRIVATE_KEY,
} = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: '0.8.4',
// };
const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    bsc_testnet: {
      url: BSC_TESTNET_URL,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [`0x${BSC_TESTNET_DEPLOYER_PRIVATE_KEY}`],
    },
    bsc_mainnet: {
      url: BSC_MAINNET_URL,
      accounts: [`0x${BSC_MAINNET_DEPLOYER_PRIVATE_KEY}`],
    },
  },
  mocha: {
    timeout: 2 * 60 * 1000,
  },
  abiExporter: {
    except: ['contracts/tests', 'contracts/core', 'contracts/providers'],
  },
};
export default config;
