import { BigNumber, ethers } from 'ethers'
import * as chains from 'viem/chains'

import { EndpointId } from '@layerzerolabs/lz-definitions'

export const MyOAppABI = [
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

export const EndpointV2ABI = [
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '_eid',
                type: 'uint32',
            },
            {
                internalType: 'address',
                name: '_blockedLib',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_altToken',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'composer',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'guid',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'message',
                type: 'bytes',
            },
        ],
        name: 'ComposedMessageDelivered',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'composer',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'guid',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'messageHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'caller',
                type: 'address',
            },
        ],
        name: 'ComposedMessageReceived',
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
                internalType: 'address',
                name: 'oldLib',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'newLib',
                type: 'address',
            },
        ],
        name: 'DefaultReceiveLibrarySet',
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
                internalType: 'address',
                name: 'oldLib',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'expiry',
                type: 'uint256',
            },
        ],
        name: 'DefaultReceiveLibraryTimeoutSet',
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
                internalType: 'address',
                name: 'newLib',
                type: 'address',
            },
        ],
        name: 'DefaultSendLibrarySet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
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
                indexed: false,
                internalType: 'struct ILayerZeroEndpointV2.MessagingFee',
                name: 'fee',
                type: 'tuple',
            },
        ],
        name: 'FeePaid',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint32',
                name: 'srcEid',
                type: 'uint32',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'sender',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint64',
                name: 'nonce',
                type: 'uint64',
            },
        ],
        name: 'InboundNonceSkipped',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'LayerZeroTokenSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'newLib',
                type: 'address',
            },
        ],
        name: 'LibraryRegistered',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'guid',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'messageHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'caller',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'reason',
                type: 'bytes',
            },
        ],
        name: 'LzComposeFailed',
        type: 'event',
    },
    {
        anonymous: false,
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
                indexed: false,
                internalType: 'struct IMessageOrigin.MessageOrigin',
                name: 'origin',
                type: 'tuple',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'reason',
                type: 'bytes',
            },
        ],
        name: 'LzReceiveFailed',
        type: 'event',
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
                indexed: false,
                internalType: 'struct IMessageOrigin.MessageOrigin',
                name: 'origin',
                type: 'tuple',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'payloadHash',
                type: 'bytes32',
            },
        ],
        name: 'PacketDelivered',
        type: 'event',
    },
    {
        anonymous: false,
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
                indexed: false,
                internalType: 'struct IMessageOrigin.MessageOrigin',
                name: 'origin',
                type: 'tuple',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
        ],
        name: 'PacketReceived',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bytes',
                name: 'encodedPayload',
                type: 'bytes',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'options',
                type: 'bytes',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'sendLibrary',
                type: 'address',
            },
        ],
        name: 'PacketSent',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint32',
                name: 'eid',
                type: 'uint32',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'oldLib',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'newLib',
                type: 'address',
            },
        ],
        name: 'ReceiveLibrarySet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint32',
                name: 'eid',
                type: 'uint32',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'oldLib',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'timeout',
                type: 'uint256',
            },
        ],
        name: 'ReceiveLibraryTimoutSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint32',
                name: 'eid',
                type: 'uint32',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'newLib',
                type: 'address',
            },
        ],
        name: 'SendLibrarySet',
        type: 'event',
    },
    {
        inputs: [],
        name: 'altFeeToken',
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
        inputs: [],
        name: 'blockedLibrary',
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
                internalType: 'struct IMessageOrigin.MessageOrigin',
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
        ],
        name: 'clear',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'composer',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: 'guid',
                type: 'bytes32',
            },
        ],
        name: 'composedMessages',
        outputs: [
            {
                internalType: 'bytes32',
                name: 'messageHash',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_lib',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_eid',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: '_configType',
                type: 'uint32',
            },
        ],
        name: 'defaultConfig',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'srcEid',
                type: 'uint32',
            },
        ],
        name: 'defaultReceiveLibrary',
        outputs: [
            {
                internalType: 'address',
                name: 'lib',
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
                name: 'srcEid',
                type: 'uint32',
            },
        ],
        name: 'defaultReceiveLibraryTimeout',
        outputs: [
            {
                internalType: 'address',
                name: 'lib',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'expiry',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'dstEid',
                type: 'uint32',
            },
        ],
        name: 'defaultSendLibrary',
        outputs: [
            {
                internalType: 'address',
                name: 'lib',
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
                internalType: 'struct IMessageOrigin.MessageOrigin',
                name: '_origin',
                type: 'tuple',
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
            {
                internalType: 'bytes32',
                name: '_payloadHash',
                type: 'bytes32',
            },
        ],
        name: 'deliver',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_composer',
                type: 'address',
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
        ],
        name: 'deliverComposedMessage',
        outputs: [],
        stateMutability: 'nonpayable',
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
                internalType: 'struct IMessageOrigin.MessageOrigin',
                name: '_origin',
                type: 'tuple',
            },
            {
                internalType: 'address',
                name: '_receiveLib',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
        ],
        name: 'deliverable',
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
        name: 'eid',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_oapp',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_lib',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_eid',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: '_configType',
                type: 'uint32',
            },
        ],
        name: 'getConfig',
        outputs: [
            {
                internalType: 'bytes',
                name: 'config',
                type: 'bytes',
            },
            {
                internalType: 'bool',
                name: 'isDefault',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_srcEid',
                type: 'uint32',
            },
        ],
        name: 'getReceiveLibrary',
        outputs: [
            {
                internalType: 'address',
                name: 'lib',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'isDefault',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getRegisteredLibraries',
        outputs: [
            {
                internalType: 'address[]',
                name: '',
                type: 'address[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getSendContext',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
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
                internalType: 'address',
                name: '_sender',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_dstEid',
                type: 'uint32',
            },
        ],
        name: 'getSendLibrary',
        outputs: [
            {
                internalType: 'address',
                name: 'lib',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_srcEid',
                type: 'uint32',
            },
            {
                internalType: 'bytes32',
                name: '_sender',
                type: 'bytes32',
            },
            {
                internalType: 'uint64',
                name: '_nonce',
                type: 'uint64',
            },
        ],
        name: 'hasPayloadHash',
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
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_srcEid',
                type: 'uint32',
            },
            {
                internalType: 'bytes32',
                name: '_sender',
                type: 'bytes32',
            },
        ],
        name: 'inboundNonce',
        outputs: [
            {
                internalType: 'uint64',
                name: '',
                type: 'uint64',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
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
                name: 'inboundNonce',
                type: 'uint64',
            },
        ],
        name: 'inboundPayloadHash',
        outputs: [
            {
                internalType: 'bytes32',
                name: 'payloadHash',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_sender',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_dstEid',
                type: 'uint32',
            },
        ],
        name: 'isDefaultSendLibrary',
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
                internalType: 'address',
                name: 'lib',
                type: 'address',
            },
        ],
        name: 'isRegisteredLibrary',
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
        name: 'isSendingMessage',
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
                internalType: 'uint32',
                name: '_eid',
                type: 'uint32',
            },
        ],
        name: 'isSupportedEid',
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
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_srcEid',
                type: 'uint32',
            },
            {
                internalType: 'address',
                name: '_actualReceiveLib',
                type: 'address',
            },
        ],
        name: 'isValidReceiveLibrary',
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
        name: 'layerZeroToken',
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
                internalType: 'address',
                name: '_sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_composer',
                type: 'address',
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
                internalType: 'bytes',
                name: '_extraData',
                type: 'bytes',
            },
        ],
        name: 'lzCompose',
        outputs: [
            {
                internalType: 'bool',
                name: 'success',
                type: 'bool',
            },
            {
                internalType: 'bytes',
                name: 'reason',
                type: 'bytes',
            },
        ],
        stateMutability: 'payable',
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
                internalType: 'struct IMessageOrigin.MessageOrigin',
                name: '_origin',
                type: 'tuple',
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
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
                internalType: 'bytes',
                name: '_extraData',
                type: 'bytes',
            },
        ],
        name: 'lzReceive',
        outputs: [
            {
                internalType: 'bool',
                name: 'success',
                type: 'bool',
            },
            {
                internalType: 'bytes',
                name: 'reason',
                type: 'bytes',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_sender',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_dstEid',
                type: 'uint32',
            },
            {
                internalType: 'bytes32',
                name: '_receiver',
                type: 'bytes32',
            },
        ],
        name: 'nextGuid',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: 'dstEid',
                type: 'uint32',
            },
            {
                internalType: 'bytes32',
                name: 'receiver',
                type: 'bytes32',
            },
        ],
        name: 'outboundNonce',
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
                internalType: 'address',
                name: '_sender',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_dstEid',
                type: 'uint32',
            },
            {
                internalType: 'bytes',
                name: '_message',
                type: 'bytes',
            },
            {
                internalType: 'bool',
                name: '_payInLzToken',
                type: 'bool',
            },
            {
                internalType: 'bytes',
                name: '_options',
                type: 'bytes',
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
                internalType: 'struct ILayerZeroEndpointV2.MessagingFee',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: 'srcEid',
                type: 'uint32',
            },
        ],
        name: 'receiveLibraryTimeout',
        outputs: [
            {
                internalType: 'address',
                name: 'lib',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'expiry',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
        ],
        name: 'recoverToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_lib',
                type: 'address',
            },
        ],
        name: 'registerLibrary',
        outputs: [],
        stateMutability: 'nonpayable',
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
                internalType: 'address',
                name: '_lib',
                type: 'address',
            },
            {
                internalType: 'uint32[]',
                name: '_eids',
                type: 'uint32[]',
            },
        ],
        name: 'resetConfig',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'dstEid',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'receiver',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'bytes',
                        name: 'message',
                        type: 'bytes',
                    },
                    {
                        internalType: 'bytes',
                        name: 'options',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct ILayerZeroEndpointV2.MessagingParams',
                name: '_params',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: '_lzTokenFeeCap',
                type: 'uint256',
            },
            {
                internalType: 'address payable',
                name: '_refundAddress',
                type: 'address',
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
                        internalType: 'struct ILayerZeroEndpointV2.MessagingFee',
                        name: 'fee',
                        type: 'tuple',
                    },
                ],
                internalType: 'struct ILayerZeroEndpointV2.MessagingReceipt',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'dstEid',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'receiver',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'bytes',
                        name: 'message',
                        type: 'bytes',
                    },
                    {
                        internalType: 'bytes',
                        name: 'options',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct ILayerZeroEndpointV2.MessagingParams',
                name: '_params',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: '_lzTokenFeeCap',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_altTokenFeeCap',
                type: 'uint256',
            },
        ],
        name: 'sendWithAlt',
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
                        internalType: 'struct ILayerZeroEndpointV2.MessagingFee',
                        name: 'fee',
                        type: 'tuple',
                    },
                ],
                internalType: 'struct ILayerZeroEndpointV2.MessagingReceipt',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_lib',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: '_eid',
                type: 'uint32',
            },
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'configType',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes',
                        name: 'config',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct IMessageLibManager.SetConfigParam[]',
                name: '_params',
                type: 'tuple[]',
            },
        ],
        name: 'setConfig',
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
                internalType: 'address',
                name: '_newLib',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_gracePeriod',
                type: 'uint256',
            },
        ],
        name: 'setDefaultReceiveLibrary',
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
                internalType: 'address',
                name: '_lib',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_expiry',
                type: 'uint256',
            },
        ],
        name: 'setDefaultReceiveLibraryTimeout',
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
                internalType: 'address',
                name: '_newLib',
                type: 'address',
            },
        ],
        name: 'setDefaultSendLibrary',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_layerZeroToken',
                type: 'address',
            },
        ],
        name: 'setLayerZeroToken',
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
                internalType: 'address',
                name: '_newLib',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_gracePeriod',
                type: 'uint256',
            },
        ],
        name: 'setReceiveLibrary',
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
                internalType: 'address',
                name: '_lib',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_expiry',
                type: 'uint256',
            },
        ],
        name: 'setReceiveLibraryTimeout',
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
                internalType: 'address',
                name: '_newLib',
                type: 'address',
            },
        ],
        name: 'setSendLibrary',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '_srcEid',
                type: 'uint32',
            },
            {
                internalType: 'bytes32',
                name: '_sender',
                type: 'bytes32',
            },
            {
                internalType: 'uint64',
                name: '_nonce',
                type: 'uint64',
            },
        ],
        name: 'skip',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_lib',
                type: 'address',
            },
            {
                internalType: 'uint32[]',
                name: '_eids',
                type: 'uint32[]',
            },
        ],
        name: 'snapshotConfig',
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

export function endpointToChainInfo(eid: number) {
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

export function chainIdToEndpointId(chainId: number) {
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

export function chainIdToEndpointAddress(chainId: number) {
    // TODO: return address by chainId instead of confirming if it's testnet
    const chainInfo = endpointToChainInfo(chainIdToEndpointId(chainId))
    if (chainInfo.testnet) {
        return '0x6EDCE65403992e310A62460808c4b910D972f10f'
    }

    return '0x1a44076050125825900e736c501f859c50fE728c'
}

export function getGasPriceRange(chainId: number): BigNumber[] {
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

export function getUsdPrice(chainId: number): number {
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

export function calculateFees(
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

export function getFeeInUSD(totalFee: ethers.BigNumber, priceInUSD: number) {
    const res = parseFloat(ethers.utils.formatEther(totalFee)) * priceInUSD
    console.log(`getFeeInUSD, totalFee: ${totalFee.toString()}, priceInUSD: ${priceInUSD}, res: ${res}`)

    return res
}

export function getSendLib(chainId: number) {
    // testnets
    if (chainId == chains.arbitrumSepolia.id) {
        return '0x4f7cd4DA19ABB31b0eC98b9066B9e857B1bf9C0E'
    }

    if (chainId == chains.mantleSepoliaTestnet.id) {
        return '0x9A289B849b32FF69A95F8584a03343a33Ff6e5Fd'
    }

    if (chainId == chains.baseSepolia.id) {
        return '0xC1868e054425D378095A003EcbA3823a5D0135C9'
    }

    // mainnets
    if (chainId == chains.arbitrum.id) {
        return '0x975bcD720be66659e3EB3C0e4F1866a3020E493A'
    }

    if (chainId == chains.mantle.id) {
        return '0xde19274c009A22921E3966a1Ec868cEba40A5DaC'
    }

    if (chainId == chains.opBNB.id) {
        return '0x44289609cc6781fa2C665796b6c5AAbf9FFceDC5'
    }

    return '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1' // ethereum
}

export function getReceiveLib(chainId: number) {
    // testnets
    if (chainId == chains.arbitrumSepolia.id) {
        return '0x75Db67CDab2824970131D5aa9CECfC9F69c69636'
    }

    if (chainId == chains.mantleSepoliaTestnet.id) {
        return '0x8A3D588D9f6AC041476b094f97FF94ec30169d3D'
    }

    if (chainId == chains.baseSepolia.id) {
        return '0x12523de19dc41c91F7d2093E0CFbB76b17012C8d'
    }

    // mainnets
    if (chainId == chains.arbitrum.id) {
        return '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6'
    }

    if (chainId == chains.mantle.id) {
        return '0x8da6512De9379fBF4F09BF520Caf7a85435ed93e'
    }

    if (chainId == chains.opBNB.id) {
        return '0x9c9e25F9fC4e8134313C2a9f5c719f5c9F4fbD95'
    }

    return '0xc02Ab410f0734EFa3F14628780e6e695156024C2'
}
