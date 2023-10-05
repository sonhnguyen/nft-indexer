import { Chain, ListNFTsResponse } from "opensea-js";
import dotenv from "dotenv";
import {
  OpenSeaNFT,
  OpenseaAssetTransferEvent,
  OpenseaAssetTransferEvents,
} from "./types";
import { alchemy, openseaSDK, provider } from "./collection-service";
import { NftSale as AlchemyNftSale, SortingOrder } from "alchemy-sdk";
dotenv.config();

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

export const getNftsByContractAddress = async (
  contractAddress: string,
  next: string
): Promise<ListNFTsResponse> => {
  try {
    const openseaNft = await openseaSDK.api.getNFTsByContract(
      Chain.Mainnet,
      contractAddress,
      50,
      next,
      5
    );
    return openseaNft;
  } catch (error) {
    const message = JSON.parse(error.body);
    throw { message };
  }
};

export const getNftSalesByTokenId = async (
  contractAddress: string,
  tokenId: string
): Promise<AlchemyNftSale[]> => {
  try {
    const alchemyNftSales = await alchemy.nft.getNftSales({
      contractAddress,
      tokenId,
      limit: 1000,
      order: SortingOrder.DESCENDING,
    });
    return alchemyNftSales.nftSales;
  } catch (error) {
    const message = JSON.parse(error.body);
    throw { message };
  }
};

export const getNftOwnershipsByTokenId = async (
  contractAddress: string,
  tokenId: string
): Promise<OpenseaAssetTransferEvent[]> => {
  try {
    const openseaNftTransferEvents: OpenseaAssetTransferEvent[] = [];
    let nextToken = "";
    do {
      const openseaNftTransfers = (await openseaSDK.api.get(
        `/api/v2/events/chain/${Chain.Mainnet}/contract/${contractAddress}/nfts/${tokenId}`,
        {
          event_type: "transfer",
          next: nextToken,
        }
      )) as OpenseaAssetTransferEvents;

      await Promise.all(
        openseaNftTransfers.asset_events.map(async (event) => {
          const tx = await provider.getTransaction(event.transaction);
          const block = await provider.getBlock(tx.blockHash);
          openseaNftTransferEvents.push({
            ...event,
            timestamp: Number(block.timestamp) * 1000,
          });
        })
      );

      nextToken = openseaNftTransfers.next;
    } while (nextToken.length > 0);

    return openseaNftTransferEvents;
  } catch (error) {
    const message = JSON.parse(error.body);
    throw { message };
  }
};
