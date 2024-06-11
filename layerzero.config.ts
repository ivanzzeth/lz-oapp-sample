import { EndpointId } from '@layerzerolabs/lz-definitions'

import type {
    OAppEdgeConfig,
    OAppOmniGraphHardhat,
    OmniEdgeHardhat,
    OmniPointHardhat,
} from '@layerzerolabs/toolbox-hardhat'

///////// Testnet contracts
const mantleSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.MANTLESEP_V2_TESTNET,
    contractName: 'MyOApp',
}

const arbitrumSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.ARBSEP_V2_TESTNET,
    contractName: 'MyOApp',
}

const baseSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.BASESEP_V2_TESTNET,
    contractName: 'MyOApp',
}

///////// Mainnet contracts
const mantleContract: OmniPointHardhat = {
    eid: EndpointId.MANTLE_V2_MAINNET,
    contractName: 'MyOApp',
}

const arbitrumContract: OmniPointHardhat = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'MyOApp',
}

const opbnbContract: OmniPointHardhat = {
    eid: EndpointId.OPBNB_V2_MAINNET,
    contractName: 'MyOApp',
}

///////// Config

const testnetContracts = [
    {
        contract: arbitrumSepoliaContract,
    },
    {
        contract: mantleSepoliaContract,
    },
    {
        contract: baseSepoliaContract,
    },
]

const mainnetContracts = [
    {
        contract: arbitrumContract,
    },
    {
        contract: mantleContract,
    },
    {
        contract: opbnbContract,
    },
]

const testnetConnections: OmniEdgeHardhat<OAppEdgeConfig | undefined>[] = [
    {
        from: arbitrumSepoliaContract,
        to: mantleSepoliaContract,
    },
    {
        from: arbitrumSepoliaContract,
        to: baseSepoliaContract,
        // config: {
        //     receiveLibraryConfig: {
        //         receiveLibrary: '0x75Db67CDab2824970131D5aa9CECfC9F69c69636',
        //         gracePeriod: BigInt(0),
        //     },
        // },
    },
    {
        from: mantleSepoliaContract,
        to: arbitrumSepoliaContract,
    },
    {
        from: mantleSepoliaContract,
        to: baseSepoliaContract,
    },
    {
        from: baseSepoliaContract,
        to: arbitrumSepoliaContract,
    },
    {
        from: baseSepoliaContract,
        to: mantleSepoliaContract,
    },
]

const mainnetConnections: OmniEdgeHardhat<OAppEdgeConfig | undefined>[] = [
    {
        from: arbitrumContract,
        to: mantleContract,
        config: {
            sendConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        '0x2f55C492897526677C5B68fb199ea31E2c126416', // LayerZero Labs
                    ],
                },
            },
            receiveConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        '0x2f55C492897526677C5B68fb199ea31E2c126416', // LayerZero Labs
                        // '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc', // Google Cloud
                    ],
                },
            },
        },
    },
    {
        from: arbitrumContract,
        to: opbnbContract,
        config: {
            sendConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        '0x2f55C492897526677C5B68fb199ea31E2c126416', // LayerZero Labs
                    ],
                },
            },
            receiveConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        // '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc', // Google Cloud
                        '0x2f55C492897526677C5B68fb199ea31E2c126416', // LayerZero Labs
                    ],
                },
            },
        },
    },
    {
        from: mantleContract,
        to: arbitrumContract,
        config: {
            sendConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        '0x28B6140ead70cb2Fb669705b3598ffB4BEaA060b', // LayerZero Labs
                    ],
                },
            },
            receiveConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        // '0x8ddF05F9A5c488b4973897E278B58895bF87Cb24', // Polyhedra zkLightClient
                        '0x28B6140ead70cb2Fb669705b3598ffB4BEaA060b', // LayerZero Labs
                    ],
                },
            },
        },
    },
    {
        from: mantleContract,
        to: opbnbContract,
        config: {
            sendConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        '0x28B6140ead70cb2Fb669705b3598ffB4BEaA060b', // LayerZero Labs
                    ],
                },
            },
            receiveConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        // '0x8ddF05F9A5c488b4973897E278B58895bF87Cb24', // Polyhedra zkLightClient
                        '0x28B6140ead70cb2Fb669705b3598ffB4BEaA060b', // LayerZero Labs
                    ],
                },
            },
        },
    },
    {
        from: opbnbContract,
        to: arbitrumContract,
        config: {
            sendConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        '0x3eBb618B5c9d09DE770979D552b27D6357Aff73B', // LayerZero Labs
                    ],
                },
            },
            receiveConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        // '0x8ddF05F9A5c488b4973897E278B58895bF87Cb24', // Polyhedra zkLightClient
                        '0x3eBb618B5c9d09DE770979D552b27D6357Aff73B', // LayerZero Labs
                    ],
                },
            },
        },
    },
    {
        from: opbnbContract,
        to: mantleContract,
        config: {
            sendConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        '0x3eBb618B5c9d09DE770979D552b27D6357Aff73B', // LayerZero Labs
                    ],
                },
            },
            receiveConfig: {
                ulnConfig: {
                    requiredDVNs: [
                        '0x3eBb618B5c9d09DE770979D552b27D6357Aff73B', // LayerZero Labs
                        // '0x8ddF05F9A5c488b4973897E278B58895bF87Cb24', // Polyhedra zkLightClient
                    ],
                },
            },
        },
    },
]

const config: OAppOmniGraphHardhat = {
    // contracts: [...testnetContracts],
    // connections: [...testnetConnections],
    contracts: [...mainnetContracts],
    connections: [...mainnetConnections],
}

export default config
