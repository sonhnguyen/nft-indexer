import { Router } from "express";

import * as NftCollectionController from "./controllers/collection/collection";

const router = Router();

// generic collection info endpoints
router.get("/collection", NftCollectionController.index);

export default router;
