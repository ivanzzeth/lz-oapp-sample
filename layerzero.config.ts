import { EndpointId } from '@layerzerolabs/lz-definitions'

import type {
    OAppEdgeConfig,
    OAppOmniGraphHardhat,
    OmniEdgeHardhat,
    OmniPointHardhat,
} from '@layerzerolabs/toolbox-hardhat'

///////// Testnet contracts
// const baseSepoliaContract: OmniPointHardhat = {
//     eid: EndpointId.BASESEP_V2_TESTNET,
//     contractName: 'MyOApp',
// }

const mantleSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.MANTLESEP_V2_TESTNET,
    contractName: 'MyOApp',
}

const arbitrumSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.ARBSEP_V2_TESTNET,
    contractName: 'MyOApp',
}

// const opbnbTestnetSepoliaContract: OmniPointHardhat = {
//     eid: EndpointId.OPBNB_V2_TESTNET,
//     contractName: 'MyOApp',
// }

///////// Mainnet contracts

///////// Config

const testnetContracts = [
    {
        contract: arbitrumSepoliaContract,
    },
    {
        contract: mantleSepoliaContract,
    },
    // {
    //     contract: opbnbTestnetSepoliaContract,
    // },
]

const testnetConnections: OmniEdgeHardhat<OAppEdgeConfig | undefined>[] = [
    {
        from: arbitrumSepoliaContract,
        to: mantleSepoliaContract,
        // config: {
        //     sendConfig: {
        //         executorConfig: {
        //             maxMessageSize: 99,
        //             executor: '0x71d7a02cDD38BEa35E42b53fF4a42a37638a0066',
        //         },
        //         ulnConfig: {
        //             confirmations: BigInt(42),
        //             requiredDVNs: [],
        //             optionalDVNs: [
        //                 '0xe9dCF5771a48f8DC70337303AbB84032F8F5bE3E',
        //                 '0x0AD50201807B615a71a39c775089C9261A667780',
        //             ],
        //             optionalDVNThreshold: 2,
        //         },
        //     },
        //     receiveConfig: {
        //         ulnConfig: {
        //             confirmations: BigInt(42),
        //             requiredDVNs: [],
        //             optionalDVNs: [
        //                 '0x3Eb0093E079EF3F3FC58C41e13FF46c55dcb5D0a',
        //                 '0x0AD50201807B615a71a39c775089C9261A667780',
        //             ],
        //             optionalDVNThreshold: 2,
        //         },
        //     },
        // },
    },
    // {
    //     from: arbitrumSepoliaContract,
    //     to: opbnbTestnetSepoliaContract,
    // },
    {
        from: mantleSepoliaContract,
        to: arbitrumSepoliaContract,
    },
    // {
    //     from: mantleSepoliaContract,
    //     to: opbnbTestnetSepoliaContract,
    //     config: {
    //         receiveLibraryConfig: {
    //             receiveLibrary: '0x12523de19dc41c91F7d2093E0CFbB76b17012C8d',
    //             gracePeriod: BigInt(0),
    //         },
    //     },
    // },
    // {
    //     from: opbnbTestnetSepoliaContract,
    //     to: arbitrumSepoliaContract,
    // },
    // {
    //     from: opbnbTestnetSepoliaContract,
    //     to: mantleSepoliaContract,
    // },
]

const config: OAppOmniGraphHardhat = {
    contracts: [...testnetContracts],
    connections: [...testnetConnections],
}

export default config
