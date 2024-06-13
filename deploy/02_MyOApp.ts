import assert from 'assert'

import * as chains from 'viem/chains'
import { type DeployFunction } from 'hardhat-deploy/types'

// TODO declare your contract name here
const contractName = 'MyOApp'

const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    assert(deployer, 'Missing named deployer account')

    // This is an external deployment pulled in from @layerzerolabs/lz-evm-sdk-v2
    //
    // @layerzerolabs/toolbox-hardhat takes care of plugging in the external deployments
    // from @layerzerolabs packages based on the configuration in your hardhat config
    //
    // For this to work correctly, your network config must define an eid property
    // set to `EndpointId` as defined in @layerzerolabs/lz-definitions
    //
    // For example:
    //
    // networks: {
    //   fuji: {
    //     ...
    //     eid: EndpointId.AVALANCHE_V2_TESTNET
    //   }
    // }
    const endpointV2Deployment = await hre.deployments.get('EndpointV2')
    const executorDeployment = await hre.deployments.get('SimpleExecutor')

    const network = await hre.ethers.provider.getNetwork()
    const dvn = getDVN(network.chainId)

    const { address } = await deploy(contractName, {
        from: deployer,
        args: [
            endpointV2Deployment.address, // LayerZero's EndpointV2 address
            executorDeployment.address,
            dvn,
            deployer, // owner
        ],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

function getDVN(chainId: number) {
    switch (chainId) {
        // testnets
        case chains.arbitrumSepolia.id:
            return '0x53f488E93b4f1b60E8E83aa374dBe1780A1EE8a8'
        case chains.mantleSepoliaTestnet.id:
            return '0x9454f0EABc7C4Ea9ebF89190B8bF9051A0468E03'
        case chains.baseSepolia.id:
            return '0xe1a12515F9AB2764b887bF60B923Ca494EBbB2d6'
        // mainnets
        case chains.arbitrum.id:
            return '0x2f55C492897526677C5B68fb199ea31E2c126416'
        case chains.mantle.id:
            return '0x28B6140ead70cb2Fb669705b3598ffB4BEaA060b'
        case chains.opBNB.id:
            return '0x3eBb618B5c9d09DE770979D552b27D6357Aff73B'
        default:
            return '0x589dEDbD617e0CBcB916A9223F4d1300c294236b' // ethereum
    }
}

deploy.tags = [contractName]

export default deploy
