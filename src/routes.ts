import { Router } from "express";

import * as NftCollectionController from "./controllers/collection/collection";

const router = Router();

// generic collection info endpoints
router.get("/collection/:contractAddress", NftCollectionController.index);


/*
Data Extraction: Write a script/program to extract data such as
ownership history
price history
metadata associated with the NFTs from the contract.
average ownership duration
average price
listing the current owners of each NFT.
*/

export default router;
