import fs from 'node:fs/promises'

import { stringify } from 'csv-stringify/sync'
import * as dotenv from 'dotenv'
dotenv.config()
// import * as csv from 'csv'

import { BigNumber, Contract, Wallet, ethers } from 'ethers'
import * as chains from 'viem/chains'

import { EndpointId, endpointIdToChain, isEvmChain } from '@layerzerolabs/lz-definitions'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import { Message, MessageStatus, getMessagesBySrcTxHash } from '@layerzerolabs/scan-client'

import deploymentsJSON from '../deploymentsInfo.json'

const MyOAppABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '_endpoint',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_delegate',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'target',
                type: 'address',
            },
        ],
        name: 'AddressEmptyCode',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'AddressInsufficientBalance',
        type: 'error',
    },
    {
        inputs: [],
        name: 'FailedInnerCall',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidDelegate',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidEndpointCall',
        type: 'error',
    },
    {
        inputs: [],
        name: 'LzTokenUnavailable',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'eid',
                type: 'uint32',
            },
        ],
        name: 'NoPeer',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'msgValue',
                type: 'uint256',
            },
        ],
        name: 'NotEnoughNative',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'addr',
                type: 'address',
            },
        ],
        name: 'OnlyEndpoint',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'eid',
                type: 'uint32',
            },
            {
                internalType: 'bytes32',
                name: 'sender',
                type: 'bytes32',
            },
        ],
        name: 'OnlyPeer',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'OwnableInvalidOwner',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'OwnableUnauthorizedAccount',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'SafeERC20FailedOperation',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint32',
                name: 'eid',
                type: 'uint32',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'peer',
                type: 'bytes32',
            },
        ],
        name: 'PeerSet',
        type: 'event',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'srcEid',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'sender',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'nonce',
                        type: 'uint64',
                    },
                ],
                internalType: 'struct Origin',
                name: 'origin',
                type: 'tuple',
            },
        ],
        name: 'allowInitializePath',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'data',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'endpoint',
        outputs: [
            {
                internalType: 'contract ILayerZeroEndpointV2',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'srcEid',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'sender',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'nonce',
                        type: 'uint64',
                    },
                ],
                internalType: 'struct Origin',
                name: '',
                type: 'tuple',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
            {
                internalType: 'address',
                name: '_sender',
                type: 'address',
            },
        ],
        name: 'isComposeMsgSender',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'srcEid',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'sender',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'nonce',
                        type: 'uint64',
                    },
                ],
                internalType: 'struct Origin',
                name: '_origin',
                type: 'tuple',
            },
            {
                internalType: 'bytes32',
                name: '_guid',
                type: 'bytes32',
            },
            {
                internalType: 'bytes',
                name: '_message',
                type: 'bytes',
            },
            {
                internalType: 'address',
                name: '_executor',
                type: 'address',
            },
            {
                internalType: 'bytes',
                name: '_extraData',
                type: 'bytes',
            },
        ],
        name: 'lzReceive',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'nextNonce',
        outputs: [
            {
                internalType: 'uint64',
                name: 'nonce',
                type: 'uint64',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'oAppVersion',
        outputs: [
            {
                internalType: 'uint64',
                name: 'senderVersion',
                type: 'uint64',
            },
            {
                internalType: 'uint64',
                name: 'receiverVersion',
                type: 'uint64',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'eid',
                type: 'uint32',
            },
        ],
        name: 'peers',
        outputs: [
            {
                internalType: 'bytes32',
                name: 'peer',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '_dstEid',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: '_message',
                type: 'string',
            },
            {
                internalType: 'bytes',
                name: '_options',
                type: 'bytes',
            },
            {
                internalType: 'bool',
                name: '_payInLzToken',
                type: 'bool',
            },
        ],
        name: 'quote',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'nativeFee',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'lzTokenFee',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct MessagingFee',
                name: 'fee',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '_dstEid',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: '_message',
                type: 'string',
            },
            {
                internalType: 'bytes',
                name: '_options',
                type: 'bytes',
            },
        ],
        name: 'send',
        outputs: [
            {
                components: [
                    {
                        internalType: 'bytes32',
                        name: 'guid',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'nonce',
                        type: 'uint64',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'nativeFee',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'lzTokenFee',
                                type: 'uint256',
                            },
                        ],
                        internalType: 'struct MessagingFee',
                        name: 'fee',
                        type: 'tuple',
                    },
                ],
                internalType: 'struct MessagingReceipt',
                name: 'receipt',
                type: 'tuple',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_delegate',
                type: 'address',
            },
        ],
        name: 'setDelegate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '_eid',
                type: 'uint32',
            },
            {
                internalType: 'bytes32',
                name: '_peer',
                type: 'bytes32',
            },
        ],
        name: 'setPeer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
]

function endpointToChainInfo(eid: number) {
    switch (eid) {
        // testnets
        case EndpointId.SEPOLIA_V2_TESTNET:
            return chains.sepolia
        case EndpointId.BASESEP_V2_TESTNET:
            return chains.baseSepolia
        case EndpointId.ARBSEP_V2_TESTNET:
            return chains.arbitrumSepolia
        case EndpointId.OPBNB_V2_TESTNET:
            return chains.opBNBTestnet
        case EndpointId.MANTLESEP_V2_TESTNET:
            return chains.mantleSepoliaTestnet
        // mainnets
        case EndpointId.OPBNB_V2_MAINNET:
            return chains.opBNB
        case EndpointId.MANTLE_V2_MAINNET:
            return chains.mantle
        case EndpointId.ARBITRUM_MAINNET:
            return chains.arbitrum
        default:
            return chains.mainnet
    }
}

function chainIdToEndpointId(chainId: number) {
    switch (chainId) {
        // testnets
        case chains.sepolia.id:
            return EndpointId.SEPOLIA_V2_TESTNET
        case chains.baseSepolia.id:
            return EndpointId.BASESEP_V2_TESTNET
        case chains.arbitrumSepolia.id:
            return EndpointId.ARBSEP_V2_TESTNET
        case chains.opBNBTestnet.id:
            return EndpointId.OPBNB_V2_TESTNET
        case chains.mantleSepoliaTestnet.id:
            return EndpointId.MANTLESEP_V2_TESTNET
        // mainnets
        case chains.opBNB.id:
            return EndpointId.OPBNB_V2_MAINNET
        case chains.mantle.id:
            return EndpointId.MANTLE_V2_MAINNET
        case chains.arbitrum.id:
            return EndpointId.ARBITRUM_MAINNET
        default:
            return EndpointId.ETHEREUM_V2_MAINNET
    }
}

function getGasPriceRange(chainId: number): BigNumber[] {
    if (chainId == chains.arbitrum.id || chainId == chains.arbitrumSepolia.id) {
        return [ethers.utils.parseUnits('0.01', 'gwei'), ethers.utils.parseUnits('4.03', 'gwei')]
    }
    if (chainId == chains.opBNB.id || chainId == chains.opBNBTestnet.id) {
        return [ethers.utils.parseUnits('0.001000008', 'gwei'), ethers.utils.parseUnits('3', 'gwei')]
    }
    if (chainId == chains.mantle.id || chainId == chains.mantleSepoliaTestnet.id) {
        return [ethers.utils.parseUnits('0.020', 'gwei'), ethers.utils.parseUnits('3', 'gwei')]
    }

    // Ethereum
    return [ethers.utils.parseUnits('9', 'gwei'), ethers.utils.parseUnits('12', 'gwei')]
}

function getUsdPrice(chainId: number): number {
    console.log('getUsdPrice, chainId: ', chainId)
    if (
        chainId == chains.opBNB.id ||
        chainId == chains.opBNBTestnet.id ||
        chainId == chains.bsc.id ||
        chainId == chains.bscTestnet.id
    ) {
        return 706.8 // Native token is BNB.
    }

    if (chainId == chains.mantle.id || chainId == chains.mantleSepoliaTestnet.id) {
        return 1.02 // Native token is MNT.
    }

    // the native token is ETH not ARB, so we dont need to configure it.
    // if (chainId == chains.arbitrum.id || chainId == chains.arbitrumSepolia.id) {
    //     return 1.0907
    // }

    return 3814.04 // ETH
}

function calculateFees(
    sendGasUsed: ethers.BigNumberish,
    nativeFee: ethers.BigNumberish,
    gasPrice: ethers.BigNumberish
) {
    const gasFee = ethers.BigNumber.from(sendGasUsed).mul(ethers.BigNumber.from(gasPrice))
    const totalFee = ethers.BigNumber.from(nativeFee).add(gasFee)
    return {
        nativeFee: ethers.BigNumber.from(nativeFee),
        gasFee,
        totalFee,
    }
}

function getFeeInUSD(totalFee: ethers.BigNumber, priceInUSD: number) {
    const res = parseFloat(ethers.utils.formatEther(totalFee)) * priceInUSD
    console.log(`getFeeInUSD, totalFee: ${totalFee.toString()}, priceInUSD: ${priceInUSD}, res: ${res}`)

    return res
}

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
        infos.forEach((info: { chainId: string; name: string; contracts: Record<string, any> }) => {
            // console.log('info:', info)
            if (info.chainId == '31337') {
                // hardhat
                return
            }
            if (info.chainId == chains.mantle.id.toString()) {
                return // skip for now
            }
            Object.entries(info.contracts).forEach(([contractName, contract]) => {
                const chainId = parseInt(info.chainId, 10)
                contractInfos.push({
                    name: contractName,
                    address: contract.address,
                    chainId,
                    eid: chainIdToEndpointId(chainId),
                })
            })
        })
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
        nativeFee: string
        sendTxGasUsed: ethers.BigNumber
        totalFee: string
        minTotalFee: string
        maxTotalFee: string
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
            'source hash',
            'source chain',
            'destination chain',
            'source contract',
            'target contract',
            'total fee in ETH',
            'min total fee in ETH',
            'max total fee in ETH',
            'native fee in ETH',
            'gas fee in ETH',
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
            v.sendTxHash,
            endpointToChainInfo(v.fromEid).name,
            endpointToChainInfo(v.toEid).name,
            v.from,
            v.to,
            v.totalFee,
            v.minTotalFee,
            v.maxTotalFee,
            v.nativeFee,
            v.gasFee,
            v.currGasPrice,
            v.minGasPrice,
            v.maxGasPrice,
            v.sendTxGasUsed.toString(),
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
    const beforeSendTime = Date.now()
    const options = Options.newOptions().addExecutorLzReceiveOption(hardcodeGas, 0).toHex().toString()
    let nativeFee = 0
    const randNum = Math.ceil(Math.random() * 100000000)
    const message = `ping ${target.contract.address} from ${source.contract.address} with nonce ${randNum}`
    ;[nativeFee] = await source.contract.quote(target.eid, message, options, false)

    console.log(
        `send, from=${source.eid}:${source.contract.address}, to=${target.eid}:${target.contract.address}, nativeFee=${nativeFee}`
    )
    const sendTx = await source.contract.send(target.eid, message, options, { value: nativeFee.toString() })
    console.log(`send, txhash=${sendTx.hash}`)

    // use this for waiting state sync on layer zero scan
    // TODO: Always block if the tx was marked as FAILED.
    // await waitForAllMessagesReceived(source.eid, sendTx.hash, 10_000)

    const { status: msgStatus } = await myWaitForAllMessagesReceived(source.eid, sendTx.hash, 10_000)
    if (msgStatus == MessageStatus.FAILED) {
        console.log(`Failed to send cross chain msg for unknown reason`)
        return null
    }
    const sendTxReceipt = await sendTx.wait()

    const priceInUSD = getUsdPrice(source.chainId)
    const currGasPrice = ethers.BigNumber.from(sendTxReceipt.effectiveGasPrice)
    // const gasFee = sendTxReceipt.gasUsed.mul(ethers.BigNumber.from(sendTxReceipt.effectiveGasPrice))
    // const totalFee = ethers.utils.formatEther(ethers.BigNumber.from(nativeFee).add(gasFee))
    const { gasFee, totalFee } = calculateFees(sendTxReceipt.gasUsed, ethers.BigNumber.from(nativeFee), currGasPrice)
    const totalFeeInUSD = getFeeInUSD(totalFee, priceInUSD)

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
        totalFee: `${ethers.utils.formatEther(totalFee)}(${totalFeeInUSD}$)`, // in ether
        nativeFee: ethers.utils.formatEther(nativeFee), // in ether
        gasFee: ethers.utils.formatEther(gasFee), // in ether
        minTotalFee: `${ethers.utils.formatEther(minTotalFee)}(${minTotalFeeInUSD})$`,
        maxTotalFee: `${ethers.utils.formatEther(maxTotalFee)}(${maxTotalFeeInUSD})$`,
        currGasPrice: currGasPrice.toString(),
        minGasPrice: minGasPrice.toString(),
        maxGasPrice: maxGasPrice.toString(),
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
    pollInterval?: number
): Promise<{ messages: Message[]; status: MessageStatus }> {
    let status: MessageStatus = MessageStatus.INFLIGHT
    let messages: Message[]
    LOOPS: while (true) {
        try {
            const resp = await getMessagesBySrcTxHash(srcChainId, srcTxHash)
            messages = resp.messages
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
