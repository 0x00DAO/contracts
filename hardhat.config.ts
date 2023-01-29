import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import { HardhatUserConfig, task } from 'hardhat/config';

import '@openzeppelin/hardhat-defender';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-abi-exporter';

const {
  POLYGON_TESTNET_URL,
  POLYGON_TESTNET_DEPLOYER_PRIVATE_KEY,
  POLYGON_MAINNET_URL,
  POLYGON_MAINNET_DEPLOYER_PRIVATE_KEY,
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
    polygon_testnet: {
      url: POLYGON_TESTNET_URL,
      chainId: 80001,
      gasPrice: 20000000000,
      accounts: [`0x${POLYGON_TESTNET_DEPLOYER_PRIVATE_KEY}`],
    },
    polygon_mainnet: {
      url: POLYGON_MAINNET_URL,
      accounts: [`0x${POLYGON_MAINNET_DEPLOYER_PRIVATE_KEY}`],
    },
  },
  mocha: {
    timeout: 2 * 60 * 1000,
  },
  defender: {
    apiKey: process.env.CONTRACT_DEPLOYER_DEFENDER_TEAM_API_KEY as string,
    apiSecret: process.env.CONTRACT_DEPLOYER_DEFENDER_API_SECRET_KEY as string,
  },
  abiExporter: {
    except: [
      'contracts/tests',
      'contracts/core',
      'contracts/providers',
      'contracts/example',
    ],
  },
};
export default config;
