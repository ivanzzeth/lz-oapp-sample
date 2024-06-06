// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'
import * as chains from 'viem/chains'
import { EndpointId } from '@layerzerolabs/lz-definitions'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        // basesep: {
        //     eid: EndpointId.BASESEP_V2_TESTNET,
        //     url: 'https://base-sepolia.blockpi.network/v1/rpc/public',
        //     accounts,
        // },
        arbitrumsep: {
            eid: EndpointId.ARBSEP_V2_TESTNET,
            url: 'https://public.stackup.sh/api/v1/node/arbitrum-sepolia',
            accounts,
        },
        // opbnbTestnet: {
        //     eid: EndpointId.OPBNB_V2_TESTNET,
        //     url: chains.opBNBTestnet.rpcUrls.default.http[0],
        //     accounts,
        // },
        mantleTestnet: {
            eid: EndpointId.MANTLESEP_V2_TESTNET,
            url: chains.mantleSepoliaTestnet.rpcUrls.default.http[0],
            accounts,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
}

export default config
