import 'dotenv/config'
import fs from 'node:fs/promises'

import deploymentsJSON from '../deploymentsInfo.json'

import { chainIdToEndpointAddress, chainIdToEndpointId, endpointToChainInfo, getReceiveLib, getSendLib } from './utils'

export type ChainId = number

export type Config = {
    chains: {
        [chainId: ChainId]: ChainConfig
    }
}

export type ChainConfig = {
    name: string
    rpc?: string
    endpoint: `0x${string}`
    endpointView: `0x${string}`
    trustedSendLib: `0x${string}`
    trustedReceiveLib: `0x${string}`
    trustedReceiveLibView: `0x${string}`
    eid: number
    executor: `0x${string}`
}

async function main() {
    const config: Config = {
        chains: {},
    }
    Object.values(Object.assign({}, deploymentsJSON)).forEach((infos) => {
        infos.forEach(
            (info: { chainId: string; name: string; contracts: Record<string, { address: string; abi: [] }> }) => {
                // console.log('info:', info)
                if (info.chainId == '31337') {
                    // hardhat
                    return
                }
                const chainId = parseInt(info.chainId)
                const eid = chainIdToEndpointId(chainId)
                const chainInfo = endpointToChainInfo(eid)
                const endpointAddr = chainIdToEndpointAddress(chainId)
                const receiveUln302ViewAddr = info.contracts['ReceiveUln302View'].address
                const executorAddr = info.contracts['SimpleExecutor'].address
                const sendLibAddr = getSendLib(chainId)
                const receiveLibAddr = getReceiveLib(chainId)

                config.chains[chainId] = {
                    name: chainInfo.name,
                    rpc: chainInfo.rpcUrls.default.http[0],
                    endpoint: endpointAddr,
                    // @ts-ignore
                    endpointView: receiveUln302ViewAddr,
                    trustedSendLib: sendLibAddr,
                    trustedReceiveLib: receiveLibAddr,
                    // @ts-ignore
                    trustedReceiveLibView: receiveUln302ViewAddr,
                    eid,
                    // @ts-ignore
                    executor: executorAddr,
                }
            }
        )
    })

    const configJSON = JSON.stringify(config, null, ' ')
    console.log(configJSON)
    await fs.writeFile('executor.config.json', configJSON)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
