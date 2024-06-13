// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OApp, MessagingFee, Origin } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";
import { MessagingReceipt } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OAppSender.sol";
import {SetConfigParam} from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/IMessageLibManager.sol";
import {UlnConfig, ExecutorConfig} from "@layerzerolabs/lz-evm-messagelib-v2/contracts/uln/uln302/SendUln302.sol";

contract MyOApp is OApp {
    address public immutable dvn; // this would never be immutable in a real app
    address public immutable executor; // this would never be immutable in a real app

    constructor(
        address _endpoint,
        address _executor,
        address _dvn,
        address _delegate
    ) OApp(_endpoint, _delegate) {
        executor = _executor;
        dvn = _dvn;
    }

    string public data = "Nothing received yet.";

    /**
     * @notice Sends a message from the source chain to a destination chain.
     * @param _dstEid The endpoint ID of the destination chain.
     * @param _message The message string to be sent.
     * @param _options Additional options for message execution.
     * @dev Encodes the message as bytes and sends it using the `_lzSend` internal function.
     * @return receipt A `MessagingReceipt` struct containing details of the message sent.
     */
    function send(
        uint32 _dstEid,
        string memory _message,
        bytes calldata _options
    ) external payable returns (MessagingReceipt memory receipt) {
        bytes memory _payload = abi.encode(_message);
        receipt = _lzSend(_dstEid, _payload, _options, MessagingFee(msg.value, 0), payable(msg.sender));
    }

    /**
     * @notice Quotes the gas needed to pay for the full omnichain transaction in native gas or ZRO token.
     * @param _dstEid Destination chain's endpoint ID.
     * @param _message The message.
     * @param _options Message execution options (e.g., for sending gas to destination).
     * @param _payInLzToken Whether to return fee in ZRO token.
     * @return fee A `MessagingFee` struct containing the calculated gas fee in either the native token or ZRO token.
     */
    function quote(
        uint32 _dstEid,
        string memory _message,
        bytes memory _options,
        bool _payInLzToken
    ) public view returns (MessagingFee memory fee) {
        bytes memory payload = abi.encode(_message);
        fee = _quote(_dstEid, payload, _options, _payInLzToken);
    }

    /**
     * @dev Internal function override to handle incoming messages from another chain.
     * @dev _origin A struct containing information about the message sender.
     * @dev _guid A unique global packet identifier for the message.
     * @param payload The encoded message payload being received.
     *
     * @dev The following params are unused in the current implementation of the OApp.
     * @dev _executor The address of the Executor responsible for processing the message.
     * @dev _extraData Arbitrary data appended by the Executor to the message.
     *
     * Decodes the received payload and processes it as per the business logic defined in the function.
     */
    function _lzReceive(
        Origin calldata /*_origin*/,
        bytes32 /*_guid*/,
        bytes calldata payload,
        address /*_executor*/,
        bytes calldata /*_extraData*/
    ) internal override {
        data = abi.decode(payload, (string));
    }

    function setPeer(uint32 _eid, bytes32 _peer) public override onlyOwner {
        // @note onlyOwner redundant here but kept for explicitness
        // dvn + executor config would never be fixed like this in a real app.
        (address receiveLib, ) = endpoint.getReceiveLibrary(
            address(this),
            _eid
        );
        address sendLib = endpoint.getSendLibrary(address(this), _eid);

        address[] memory requiredDVNs = new address[](1);
        requiredDVNs[0] = dvn;

        UlnConfig memory ulnConfig = UlnConfig({
            confirmations: 1,
            requiredDVNCount: 1,
            optionalDVNCount: 0,
            optionalDVNThreshold: 0,
            requiredDVNs: requiredDVNs,
            optionalDVNs: new address[](0)
        });

        ExecutorConfig memory executorConfig = ExecutorConfig({
            maxMessageSize: 1024, // Not important for this example
            executor: executor
        });

        SetConfigParam[] memory sendConfigs = new SetConfigParam[](2);
        sendConfigs[0] = SetConfigParam({
            eid: _eid,
            configType: 2, // CONFIG_TYPE_ULN
            config: abi.encode(ulnConfig)
        });
        sendConfigs[1] = SetConfigParam({
            eid: _eid,
            configType: 1, // CONFIG_TYPE_EXECUTOR
            config: abi.encode(executorConfig)
        });

        SetConfigParam[] memory receiveConfigs = new SetConfigParam[](1);
        receiveConfigs[0] = sendConfigs[0];

        endpoint.setConfig(address(this), receiveLib, receiveConfigs);
        endpoint.setConfig(address(this), sendLib, sendConfigs);

        super.setPeer(_eid, _peer);
    }
}
