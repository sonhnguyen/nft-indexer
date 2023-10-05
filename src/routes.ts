import { Router } from "express";
import jwt from "jsonwebtoken";

import * as NftCollectionController from "./controllers/collection/collection";
import { authenticateToken } from "./middlewares/auth";

const router = Router();

router.post("/login", (req, res) => {
  const { username } = req.body;
  const token = jwt.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res.json(token);
});

// generic collection info endpoints
router.get(
  "/collection/:contractAddress",
  authenticateToken,
  NftCollectionController.getCollectionByContractAddress
);

router.get(
  "/collection/:contractAddress/stats",
  authenticateToken,
  NftCollectionController.getCollectionStatsByContractAddress
);
router.get(
  "/collection/:contractAddress/holders",
  authenticateToken,
  NftCollectionController.getCollectionHoldersByContractAddress
);

router.get(
  "/collection/:contractAddress/nfts/",
  authenticateToken,
  NftCollectionController.getNftsByContractAddress
);

router.get(
  "/collection/:contractAddress/nfts/:tokenId",
  authenticateToken,
  NftCollectionController.getNftByTokenId
);
router.get(
  "/collection/:contractAddress/nfts/:tokenId/sales",
  authenticateToken,
  NftCollectionController.getNftSalesByTokenId
);
router.get(
  "/collection/:contractAddress/nfts/:tokenId/ownerships",
  authenticateToken,
  NftCollectionController.getNftOwnershipsByTokenId
);

export default router;
