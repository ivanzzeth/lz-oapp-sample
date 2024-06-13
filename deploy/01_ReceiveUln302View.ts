import assert from 'assert'

import * as chains from 'viem/chains'
import { type DeployFunction } from 'hardhat-deploy/types'

const contractName = 'ReceiveUln302View'

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

    const network = await hre.ethers.provider.getNetwork()
    const receiveLib = getReceiveLib(network.chainId)

    console.log(`chainId: ${network.chainId}, receiveLib: ${receiveLib}`)
    const endpointV2Deployment = await hre.deployments.get('EndpointV2')

    const { address } = await deploy(contractName, {
        from: deployer,
        args: [],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    const receiveUln302ViewDeployment = await hre.deployments.get('ReceiveUln302View')
    const receiveUln302ViewContract = new hre.ethers.Contract(
        receiveUln302ViewDeployment.address,
        receiveUln302ViewDeployment.abi,
        await hre.ethers.getSigner(deployer)
    )

    await receiveUln302ViewContract.initialize(
        endpointV2Deployment.address, // LayerZero's EndpointV2 address
        receiveLib
    )

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

function getReceiveLib(chainId: number) {
    if (chainId == chains.arbitrum.id) {
        return '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6'
    }

    if (chainId == chains.arbitrumSepolia.id) {
        return '0x75Db67CDab2824970131D5aa9CECfC9F69c69636'
    }

    if (chainId == chains.mantleSepoliaTestnet.id) {
        return '0x8A3D588D9f6AC041476b094f97FF94ec30169d3D'
    }

    return '0xc02Ab410f0734EFa3F14628780e6e695156024C2'
}

deploy.tags = [contractName]

export default deploy
