import {
  AxelarAssetTransfer,
  AxelarAssetTransferConfig,
  CHAINS,
  SendTokenParams,
} from "@axelar-network/axelarjs-sdk";
import { Environment } from "@axelar-network/axelarjs-sdk";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Coin } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";

const config: AxelarAssetTransferConfig = {
  environment: Environment.TESTNET,
};

const api = new AxelarAssetTransfer(config);

const getSigner = async () => {
  const mnemonic = "inside spend sorry ski enter student neck antenna cry crop chunk stand rib dilemma long critic tumble route execute bar game caution vibrant plug";
  return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "osmo" });
};

async function test() {
  const offlineSigner = await getSigner();
  const rpcUrl = "https://rpc.osmotest5.osmosis.zone";
  const fee: StdFee = {
    gas: "250000",
    amount: [{ denom: "uosmo", amount: "30000" }],
  };
  const transferAmount: Coin = {
    denom:
      "ibc/6F34E1BD664C36CE49ACC28E60D62559A5F96C4F9A6CCE4FC5A67B2852E24CFE",
    amount: "1500000",
  };
  const requestOptions: SendTokenParams = {
    fromChain: CHAINS.TESTNET.OSMOSIS,
    toChain: CHAINS.TESTNET.AVALANCHE,
    destinationAddress: "0xB8Cd93C83A974649D76B1c19f311f639e62272BC",
    options: {
      cosmosSendTokenOptions: {
        cosmosDirectSigner: offlineSigner,
        rpcUrl,
        fee,
      },
    },
    coin: transferAmount,
  };
  const res = await api.sendToken(requestOptions);
  console.log("ressss", res);
}

test();
