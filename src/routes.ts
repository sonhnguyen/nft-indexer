import { Router } from "express";

import * as NftCollectionController from "./controllers/collection/collection";

const router = Router();

// generic collection info endpoints
router.get("/collection/:contractAddress", NftCollectionController.getCollectionByContractAddress);

router.get("/collection/:contractAddress/stats", NftCollectionController.getCollectionStatsByContractAddress);
router.get("/collection/:contractAddress/holders", NftCollectionController.getCollectionHoldersByContractAddress);

router.get("/collection/:contractAddress/nfts/", NftCollectionController.getNftByTokenId);

router.get("/collection/:contractAddress/nfts/:tokenId", NftCollectionController.getNftByTokenId);
router.get("/collection/:contractAddress/nfts/:tokenId/stats", NftCollectionController.getNftByTokenId);

/*
ownership history of token
price history of token
average ownership duration

average price of collection
holder distribution of collection
*/

export default router;
