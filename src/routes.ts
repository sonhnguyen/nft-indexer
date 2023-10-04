import { Router } from "express";

import * as NftCollectionController from "./controllers/collection/collection";

const router = Router();

// generic collection info endpoints
router.get("/collection/:contractAddress", NftCollectionController.getCollectionByContractAddress);
router.get("/collection/:contractAddress/nfts/:tokenId", NftCollectionController.getNftByTokenId);


/*
ownership history

price history

average price

listing the current owners of each NFT.

metadata associated with the NFTs from the contract.
average ownership duration
*/

export default router;
