import fs from 'node:fs/promises'
import 'dotenv/config'

import { stringify } from 'csv-stringify/sync'
// import * as csv from 'csv'

import { BigNumber, Contract, Wallet, ethers } from 'ethers'
import * as chains from 'viem/chains'

import { endpointIdToChain, isEvmChain } from '@layerzerolabs/lz-definitions'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import { Message, MessageStatus, getMessagesBySrcTxHash } from '@layerzerolabs/scan-client'

import deploymentsJSON from '../deploymentsInfo.json'

import {
    MyOAppABI,
    calculateFees,
    chainIdToEndpointId,
    endpointToChainInfo,
    getFeeInUSD,
    getGasPriceRange,
    getUsdPrice,
} from './utils'

async function main() {
    const mnemonic = process.env.MNEMONIC

    if (!mnemonic) {
        console.log("🚫️ You don't have a deployer account.")
        return
    }

    const wallet = Wallet.fromMnemonic(mnemonic)

    console.log("Make sure you're on the updated deployment context, please run `pnpm export:deployments` first")

    const contractInfos: { name: string; address: string; eid: number; chainId: number }[] = []
    Object.values(Object.assign({}, deploymentsJSON)).forEach((infos) =>
        infos.forEach(
            (info: { chainId: string; name: string; contracts: Record<string, { address: string; abi: [] }> }) => {
                // console.log('info:', info)
                if (info.chainId == '31337') {
                    // hardhat
                    return
                }
                Object.entries(info.contracts).forEach(([contractName, contract]) => {
                    if (JSON.stringify(contract.abi).includes(`"name":"send"`)) {
                        const chainId = parseInt(info.chainId, 10)
                        contractInfos.push({
                            name: contractName,
                            address: contract.address,
                            chainId,
                            eid: chainIdToEndpointId(chainId),
                        })
                    }
                })
            }
        )
    )

    console.log(`contractInfos: ${JSON.stringify(contractInfos, null, ' ')}`)

    // const contractInfos = [
    //     {
    //         address: '0xC7946d41d5c9C8Ea9e8a4EB47419c28066bBe84C',
    //         eid: EndpointId.BASESEP_V2_TESTNET,
    //         // rpc: 'https://base-sepolia.blockpi.network/v1/rpc/public',
    //     },
    //     {
    //         address: '0xf411c2b5439309b67df6F12f51A5328695161119',
    //         eid: EndpointId.ARBSEP_V2_TESTNET,
    //         // rpc: 'https://public.stackup.sh/api/v1/node/arbitrum-sepolia',
    //     },
    // ]

    const contracts: { contractName: string; contract: Contract; eid: number; chainId: number }[] = await Promise.all(
        contractInfos.map(async (info) => {
            if (!isEvmChain(endpointIdToChain(info.eid))) {
                throw new Error(`Not EVM chain, eid: ${info.eid}`)
            }

            // this chainId is endpointId, so confused
            // const chainId = getChainIdForNetwork(networkToChain(network), networkToStage(network), '')
            const chainInfo = endpointToChainInfo(info.eid)
            console.log(`${chainInfo.name} chainId: ${chainInfo.id}`)
            // Object.keys(chains).map((name) => chains[name])
            let rpcs = await Promise.all(
                chainInfo.rpcUrls.default.http.map(async (rpc) => {
                    const provider = new ethers.providers.JsonRpcProvider(rpc)
                    try {
                        await provider.getBlockNumber()
                        return rpc
                    } catch {}
                    return null
                })
            )
            rpcs = rpcs.filter((rpc) => rpc !== null)
            if (rpcs.length == 0) {
                throw new Error(`At least one rpc url is valid`)
            }
            const provider = ethers.getDefaultProvider(rpcs.at(0)!)
            console.log(
                `setup contracts, chainId=${(await provider.getNetwork()).chainId}, blockNum=${await provider.getBlockNumber()}, contract=${info.address}`
            )
            return {
                contractName: info.name,
                contract: new Contract(info.address, MyOAppABI, wallet.connect(provider)),
                eid: info.eid,
                chainId: (await provider.getNetwork()).chainId,
            }
        })
    )

    const res: {
        sendTxHash: string
        from: string
        fromEid: number
        to: string
        toEid: number
        gasFee: string
        gasFeeInUSD: string
        nativeFee: string
        nativeFeeInUSD: string
        sendTxGasUsed: ethers.BigNumber
        totalFee: string
        totalFeeInUSD: string
        minTotalFee: string
        minTotalFeeInUSD: string
        maxTotalFee: string
        maxTotalFeeInUSD: string
        currGasPrice: string
        minGasPrice: string
        maxGasPrice: string
        startTime: number
        startTimeStr: string
        endTime: number
        endTimeStr: string
        elapsedTime: number
        elapsedTimeInSeconds: number
        messages: Message[]
        messagesJSON: string
    }[] = []
    for (let i = 0; i < contracts.length; i++) {
        for (let j = 0; j < contracts.length; j++) {
            if (i == j) continue
            const sourceContract = contracts.at(i)!
            const targetContract = contracts.at(j)!
            try {
                const sendResult = await send(sourceContract, targetContract)
                if (sendResult) {
                    res.push(sendResult)
                }
            } catch (e: unknown) {
                console.log(
                    `Failed to send from ${sourceContract.eid}:${sourceContract.contractName} to ${targetContract.eid}:${targetContract.contractName}, error: ${e}`
                )
            }
        }
    }

    console.log(`res: ${JSON.stringify(res, null, ' ')}`)

    // Export csv
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatedRes: any[] = [
        [
            'tx hash on source chain',
            'source chain',
            'destination chain',
            'source contract',
            'target contract',
            'total fee in native token',
            'total fee in USD',
            'min total fee in native token',
            'min total fee in USD',
            'max total fee in native token',
            'max total fee in USD',
            'native fee in native token',
            'native fee in USD',
            'gas fee in native token',
            'gas fee in USD',
            'curr gas price',
            'min gas price',
            'max gas price',
            'source chain gas used',
            'start time',
            'end time',
            'elapsed time in seconds',
            'messages',
        ],
    ]
    for (const v of res) {
        formatedRes.push([
            v.sendTxHash, // tx hash on source chain
            endpointToChainInfo(v.fromEid).name, // source chain
            endpointToChainInfo(v.toEid).name, // destination chain
            v.from, // source contract
            v.to, // target contract
            v.totalFee, // total fee in native token
            v.totalFeeInUSD, // total fee in USD
            v.minTotalFee, // min total fee in native token
            v.minTotalFeeInUSD, // min total fee in USD
            v.maxTotalFee, // max total fee in native token
            v.maxTotalFeeInUSD, // max total fee in USD
            v.nativeFee, // native fee in native token
            v.nativeFeeInUSD, // native fee in USD
            v.gasFee, // gas fee in native token
            v.gasFeeInUSD, // gas fee in USD
            v.currGasPrice,
            v.minGasPrice,
            v.maxGasPrice,
            v.sendTxGasUsed.toString(), // source chain gas used
            v.startTimeStr,
            v.endTimeStr,
            v.elapsedTimeInSeconds,
            v.messagesJSON,
        ])
    }

    const csvReport = stringify(formatedRes)
    console.log(csvReport)

    await fs.writeFile('crossChainCallGasReport.csv', csvReport)
}

async function send(
    source: { contractName: string; contract: Contract; eid: number; chainId: number },
    target: { contractName: string; contract: Contract; eid: number; chainId: number },
    hardcodeGas = 8000
) {
    // if (source.chainId == chains.opBNB.id) {
    //     return null
    // }
    // if (target.chainId != chains.arbitrum.id) {
    //     return null
    // }
    if (source.chainId == chains.baseSepolia.id || target.chainId == chains.baseSepolia.id) {
        return null
    }

    const bytes32Peer = await source.contract.peers(target.eid)
    if (BigNumber.from(bytes32Peer).eq(BigNumber.from(0))) {
        // Peer not set, so set peer first
        const peerToSet = ethers.utils.hexlify(ethers.utils.zeroPad(target.contract.address, 32))
        const setPeerTx = await source.contract.setPeer(target.eid, peerToSet)
        await setPeerTx.wait()
    }

    const beforeSendTime = Date.now()
    const options = Options.newOptions().addExecutorLzReceiveOption(hardcodeGas, 0).toHex().toString()
    let nativeFee = 0
    const randNum = Math.ceil(Math.random() * 100000000)
    const message = `ping ${target.contract.address} from ${source.contract.address} with nonce ${randNum}`
    ;[nativeFee] = await source.contract.quote(target.eid, message, options, false)

    const gasPrice = await source.contract.provider.getGasPrice()

    console.log(
        `send, from=${source.eid}:${source.contract.address}, to=${target.eid}:${target.contract.address}, nativeFee=${nativeFee}, gasPrice=${ethers.utils.formatUnits(gasPrice, 'gwei')}(gwei)`
    )
    const sendTx = await source.contract.send(target.eid, message, options, {
        value: nativeFee.toString(),
        gasPrice: gasPrice.toHexString(),
    })
    console.log(`send, txhash=${sendTx.hash}`)

    // use this for waiting state sync on layer zero scan
    // Always block if the tx was marked as FAILED.
    // await waitForAllMessagesReceived(source.eid, sendTx.hash, 10_000)

    const { messages: messagesForWaiting, status: msgStatus } = await myWaitForAllMessagesReceived(
        source.eid,
        sendTx.hash,
        10_000
    )
    if (msgStatus == MessageStatus.FAILED) {
        console.log(`Failed to send cross chain msg for unknown reason`)
        return null
    }
    if (msgStatus == MessageStatus.INFLIGHT) {
        console.log(
            `Failed to wait for myWaitForAllMessagesReceived, messages: ${JSON.stringify(messagesForWaiting, null, ' ')}`
        )
        return null
    }

    // console.log(`wait for myWaitForAllMessagesReceived, messages: ${JSON.stringify(messagesForWaiting, null, ' ')}`)
    const sendTxReceipt = await sendTx.wait()

    const priceInUSD = getUsdPrice(source.chainId)
    const currGasPrice = ethers.BigNumber.from(sendTxReceipt.effectiveGasPrice)
    // const gasFee = sendTxReceipt.gasUsed.mul(ethers.BigNumber.from(sendTxReceipt.effectiveGasPrice))
    // const totalFee = ethers.utils.formatEther(ethers.BigNumber.from(nativeFee).add(gasFee))
    const { gasFee, totalFee } = calculateFees(sendTxReceipt.gasUsed, ethers.BigNumber.from(nativeFee), currGasPrice)
    const gasFeeInUSD = getFeeInUSD(gasFee, priceInUSD)
    const totalFeeInUSD = getFeeInUSD(totalFee, priceInUSD)
    const nativeFeeInUSD = getFeeInUSD(BigNumber.from(nativeFee), priceInUSD)

    const [minGasPrice, maxGasPrice] = getGasPriceRange(source.chainId)
    const { totalFee: minTotalFee } = calculateFees(
        sendTxReceipt.gasUsed,
        ethers.BigNumber.from(nativeFee),
        minGasPrice
    )
    const minTotalFeeInUSD = getFeeInUSD(minTotalFee, priceInUSD)

    const { totalFee: maxTotalFee } = calculateFees(
        sendTxReceipt.gasUsed,
        ethers.BigNumber.from(nativeFee),
        maxGasPrice
    )
    const maxTotalFeeInUSD = getFeeInUSD(maxTotalFee, priceInUSD)

    console.log(
        `send seccessfully, from=${source.contract.address}, to=${target.contract.address}, totalFee=${totalFee}(ETH) nativeFee=${ethers.utils.formatEther(nativeFee)}(ETH) gasUsed=${sendTxReceipt.gasUsed}`
    )

    // wait for executing cross chain call
    let data: string | undefined
    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            data = await target.contract.data()

            // eslint-disable-next-line no-empty
        } catch {}
        if (data == message) {
            console.log(`Successful ${message}`)
            break
        }

        await sleep(5000)
    }

    const afterSendTime = Date.now()

    const elapsedTime = afterSendTime - beforeSendTime

    const { messages } = await getMessagesBySrcTxHash(source.eid, sendTx.hash)

    return {
        sendTxHash: sendTx.hash as string,
        from: `${source.contractName}(${source.eid}:${source.contract.address})`,
        fromEid: source.eid,
        to: `${target.contractName}(${target.eid}:${target.contract.address})`,
        toEid: target.eid,
        totalFee: `${ethers.utils.formatEther(totalFee)} ETH`, // in ether
        totalFeeInUSD: `$ ${totalFeeInUSD}`,
        nativeFee: `${ethers.utils.formatEther(nativeFee)} ETH`, // in ether
        nativeFeeInUSD: `$ ${nativeFeeInUSD}`, // in ether
        gasFee: ethers.utils.formatEther(gasFee), // in ether
        gasFeeInUSD: `$ ${gasFeeInUSD}`,
        minTotalFee: `${ethers.utils.formatEther(minTotalFee)}`,
        minTotalFeeInUSD: `$ ${minTotalFeeInUSD}`,
        maxTotalFee: `${ethers.utils.formatEther(maxTotalFee)} ETH`,
        maxTotalFeeInUSD: `$ ${maxTotalFeeInUSD}`,
        currGasPrice: `${ethers.utils.formatUnits(currGasPrice, 'gwei')}(gwei)`,
        minGasPrice: `${ethers.utils.formatUnits(minGasPrice, 'gwei')}(gwei)`,
        maxGasPrice: `${ethers.utils.formatUnits(maxGasPrice, 'gwei')}(gwei)`,
        sendTxGasUsed: sendTxReceipt.gasUsed as ethers.BigNumber,
        startTime: beforeSendTime,
        startTimeStr: new Date(beforeSendTime).toISOString(),
        endTime: afterSendTime,
        endTimeStr: new Date(afterSendTime).toISOString(),
        elapsedTime,
        elapsedTimeInSeconds: elapsedTime / 1000,
        messages: messages,
        messagesJSON: JSON.stringify(messages),
    }
}

async function sleep(delay: number) {
    new Promise((resolve) => setTimeout(resolve, delay))
}

async function myWaitForAllMessagesReceived(
    srcChainId: number,
    srcTxHash: string,
    pollInterval?: number,
    timeout = 5 * 60 * 1000 // 5 minutes
): Promise<{ messages: Message[]; status: MessageStatus }> {
    const startTime = Date.now()
    let status: MessageStatus = MessageStatus.INFLIGHT
    let messages: Message[]
    LOOPS: while (true) {
        const elapsedTime = Date.now() - startTime
        if (elapsedTime >= timeout) {
            throw new Error('Waiting for layerzero execution timeout')
        }
        try {
            const resp = await getMessagesBySrcTxHash(srcChainId, srcTxHash)
            messages = resp.messages
            if (messages.length != 0) {
                let deliveredCount = 0
                for (const msg of messages) {
                    if (msg.status == MessageStatus.FAILED) {
                        status = MessageStatus.FAILED
                        break LOOPS
                    }
                    if (msg.status == MessageStatus.DELIVERED) {
                        deliveredCount++
                    }
                }
                if (deliveredCount == messages.length) {
                    status = MessageStatus.DELIVERED
                    break LOOPS
                }
            }
            // eslint-disable-next-line no-empty
        } catch {}

        await sleep(pollInterval ?? 5000)
    }

    return {
        messages,
        status,
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
