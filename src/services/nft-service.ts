import { ethers } from "ethers";
import { OpenSeaSDK, Chain, OpenSeaCollection } from "opensea-js";
import dotenv from "dotenv";
import { OpenSeaCollectionStats, OpenSeaNFT } from "./types";
dotenv.config();

// This example provider won't let you make transactions, only read-only calls:
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
);

const openseaSDK = new OpenSeaSDK(provider, {
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

export const getNftByTokenId = async (
  contractAddress: string,
  tokenId: string
): Promise<OpenSeaNFT> => {
  try {
    const openseaNft = await openseaSDK.api.getNFT(
      Chain.Mainnet,
      contractAddress,
      tokenId
    );
    return openseaNft.nft as OpenSeaNFT;
  } catch (error) {
    const message = JSON.parse(error.body);
    throw { message };
  }
};

export const getCollectionStatsByContractAddress = async (
  contractAddress: string
): Promise<{openseaCollectionStats: OpenSeaCollectionStats, openseaCollection: OpenSeaCollection}> => {
  try {
    const openseaNftsByContractAddress = await openseaSDK.api.getNFTsByContract(
      Chain.Mainnet,
      contractAddress
    );
    const openseaCollectionStats = await openseaSDK.api.get(
      `/api/v2/collections/${openseaNftsByContractAddress.nfts[0].collection}/stats`
    ) as OpenSeaCollectionStats;

    const openseaCollection = await openseaSDK.api.getCollection(
      openseaNftsByContractAddress.nfts[0].collection
    );

    return { openseaCollectionStats, openseaCollection };
  } catch (error) {
    const message = JSON.parse(error.body);
    throw { message };
  }
};
