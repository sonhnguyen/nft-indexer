import { Chain } from "opensea-js";
import dotenv from "dotenv";
import { OpenSeaNFT } from "./types";
import { openseaSDK } from "./collection-service";
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
