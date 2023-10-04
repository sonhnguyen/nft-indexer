import { RequestHandler } from "express";
import ApplicationError from "../../errors/application-error";

import * as NftService from "../../services/nft-service";
import { check, validationResult } from "express-validator";
import BadRequest from "../../errors/bad-request";
import { isAddress } from "ethers/lib/utils";
import { CollectionDetail, NftDetail } from "./types";

export const getCollectionByContractAddress: RequestHandler = async (
  req,
  res,
  next
) => {
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

export const getNftByTokenId: RequestHandler = async (req, res, next) => {
  const { contractAddress, tokenId } = req.params;
  await check("tokenId", "tokenId must be integer and greater than 0")
    .not()
    .isInt({ lt: 0, allow_leading_zeroes: true })
    .run(req);
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
    const openseaNft = await NftService.getNftByTokenId(
      contractAddress,
      tokenId
    );

    const result = {
      tokenId: openseaNft.identifier,
      collection: openseaNft.collection,
      contract: openseaNft.contract,
      tokenStandard: openseaNft.token_standard,
      name: openseaNft.name || `${openseaNft.collection} #${tokenId}`,
      description: openseaNft.description,
      imageUrl: openseaNft.image_url,
      metadataUrl: openseaNft.metadata_url,
      creator: openseaNft.creator,
      traits: openseaNft.traits.map((x) => {
        return { traitType: x.trait_type, value: x.value };
      }),
      owners: openseaNft.owners,
      rarity: openseaNft.rarity.rank,
    } as NftDetail;
    res.json(result);
  } catch (error) {
    console.log(error.message);
    return next(new ApplicationError(error.message));
  }
};
