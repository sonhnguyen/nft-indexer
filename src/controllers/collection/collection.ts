import { RequestHandler } from "express";
import ApplicationError from "../../errors/application-error";

import * as NftService from "../../services/nft-service";
import { check, validationResult } from "express-validator";
import BadRequest from "../../errors/bad-request";
import { OpenSeaCollectionStats } from "opensea-js/lib/types";
import { isAddress } from "ethers/lib/utils";

type CollectionDetail = {
  name: string;
  slug: string;
  description: string;
  featuredImageUrl: string;
  fee: number;
  imageUrl: string;
  largeImageUrl: string;
  stats: OpenSeaCollectionStats;
  externalLink: string;
};

export const index: RequestHandler = async (req, res, next) => {
  const { contractAddress } = req.params;
  await check("contractAddress")
    .custom(() => {
      return isAddress(contractAddress);
    })
    .withMessage("should be a valid contract address")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new BadRequest(
        errors
          .array()
          .map((e) => e.msg)
          .join(", ")
      )
    );
  }

  try {
    const openseaCollection = await NftService.getCollectionByContractAddress(
      contractAddress
    );

    const result = {
      name: openseaCollection.name,
      slug: openseaCollection.slug,
      description: openseaCollection.description,
      featuredImageUrl: openseaCollection.featuredImageUrl,
      fee:
        openseaCollection.openseaSellerFeeBasisPoints +
        openseaCollection.devSellerFeeBasisPoints,
      imageUrl: openseaCollection.imageUrl,
      largeImageUrl: openseaCollection.largeImageUrl,
      stats: openseaCollection.stats,
      externalLink: openseaCollection.externalLink,
    } as CollectionDetail;
    res.json(result);
  } catch (error) {
    console.log(error.message);
    return next(new ApplicationError(error.message));
  }
};
