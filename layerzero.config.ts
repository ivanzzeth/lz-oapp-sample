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
        // config: {
        //     sendConfig: {
        //         executorConfig: {
        //             maxMessageSize: 1000,
        //             executor: '0x65e863aE8e471fe3f8DF4779771E8D23A58eEEA1',
        //         },
        //     },
        // },
    },
    {
        from: arbitrumSepoliaContract,
        to: baseSepoliaContract,
    },
    {
        from: mantleSepoliaContract,
        to: arbitrumSepoliaContract,
        // config: {
        //     sendConfig: {
        //         executorConfig: {
        //             maxMessageSize: 1000,
        //             executor: '0xe98aC27F25b801570feB0168688fA96Ede62AE0A',
        //         },
        //     },
        // },
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
            sendLibrary: '0xde19274c009A22921E3966a1Ec868cEba40A5DaC',
            receiveLibraryConfig: {
                receiveLibrary: '0x8da6512De9379fBF4F09BF520Caf7a85435ed93e',
                gracePeriod: BigInt(0),
            },
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
            sendLibrary: '0x44289609cc6781fa2C665796b6c5AAbf9FFceDC5',
            receiveLibraryConfig: {
                receiveLibrary: '0x9c9e25F9fC4e8134313C2a9f5c719f5c9F4fbD95',
                gracePeriod: BigInt(0),
            },
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
    contracts: [...testnetContracts],
    connections: [...testnetConnections],
    // contracts: [...mainnetContracts],
    // connections: [...mainnetConnections],
}

export default config
