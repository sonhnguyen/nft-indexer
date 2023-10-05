import { ethers } from "ethers";
import { OpenSeaSDK, Chain, OpenSeaCollection } from "opensea-js";
import { CollectionHolder, OpenSeaCollectionStats } from "./types";
import { Network, Alchemy } from "alchemy-sdk";
import dotenv from "dotenv";
dotenv.config();

export const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
});

export const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
);

export const openseaSDK = new OpenSeaSDK(provider, {
  chain: Chain.Mainnet,
  apiKey: process.env.OPENSEA_KEY,
});

export const getCollectionByContractAddress = async (
  contractAddress: string
): Promise<OpenSeaCollection> => {
  try {
    const openseaNftsByContractAddress = await openseaSDK.api.getNFTsByContract(
      Chain.Mainnet,
      contractAddress
    );
    const openseaCollection = await openseaSDK.api.getCollection(
      openseaNftsByContractAddress.nfts[0].collection
    );
    return openseaCollection;
  } catch (error) {
    const message = JSON.parse(error.body);
    throw { message };
  }
};

export const getCollectionStatsByContractAddress = async (
  contractAddress: string
): Promise<{
  openseaCollectionStats: OpenSeaCollectionStats;
  openseaCollection: OpenSeaCollection;
}> => {
  try {
    const openseaNftsByContractAddress = await openseaSDK.api.getNFTsByContract(
      Chain.Mainnet,
      contractAddress
    );
    const openseaCollectionStats = (await openseaSDK.api.get(
      `/api/v2/collections/${openseaNftsByContractAddress.nfts[0].collection}/stats`
    )) as OpenSeaCollectionStats;

    const openseaCollection = await openseaSDK.api.getCollection(
      openseaNftsByContractAddress.nfts[0].collection
    );

    return { openseaCollectionStats, openseaCollection };
  } catch (error) {
    const message = JSON.parse(error.body);
    throw { message };
  }
};

export const getCollectionHoldersByContractAddress = async (
  contractAddress: string
): Promise<CollectionHolder[]> => {
  try {
    const collectionHolders = await alchemy.nft.getOwnersForContract(
      contractAddress,
      {
        withTokenBalances: true,
      }
    );

    const result = collectionHolders.owners
      .map((x) => {
        return {
          address: x.ownerAddress,
          holdingBalance: x.tokenBalances
            .map((obj) => obj.balance)
            .reduce((accumulator, current) => accumulator + current, 0),
          holdingIds: x.tokenBalances.map((obj) => parseInt(obj.tokenId, 16)),
        };
      })
      .sort((a, b) => {
        return b.holdingBalance - a.holdingBalance;
      });

    return result;
  } catch (error) {
    const message = JSON.parse(error.body);
    throw { message };
  }
};
