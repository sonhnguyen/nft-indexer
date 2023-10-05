import { RequestHandler } from "express";
import ApplicationError from "../../errors/application-error";

import * as NftService from "../../services/nft-service";
import * as CollectionService from "../../services/collection-service";
import { check, validationResult } from "express-validator";
import BadRequest from "../../errors/bad-request";
import { isAddress } from "ethers/lib/utils";
import {
  CollectionDetail,
  CollectionStats,
  NftDetail,
  NftSale,
  NftsList,
} from "./types";

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
    const openseaCollection =
      await CollectionService.getCollectionByContractAddress(contractAddress);

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
      externalLink: openseaCollection.externalLink,
    } as CollectionDetail;
    res.json(result);
  } catch (error) {
    console.log(error.message);
    return next(new ApplicationError(error.message));
  }
};

export const getCollectionStatsByContractAddress: RequestHandler = async (
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
    const { openseaCollectionStats, openseaCollection } =
      await CollectionService.getCollectionStatsByContractAddress(
        contractAddress
      );

    const result = {
      volume: openseaCollectionStats.total.volume,
      sales: openseaCollectionStats.total.sales,
      averagePrice: openseaCollectionStats.total.average_price,
      numOwners: openseaCollectionStats.total.num_owners,
      marketCap: openseaCollectionStats.total.market_cap,
      floorPrice: openseaCollectionStats.total.floor_price,
      floorPriceSymbol: openseaCollectionStats.total.floor_price_symbol,
      totalSupply: openseaCollection.stats.count,

      statsByIntervals: [
        {
          interval: "oneDay",
          volume: openseaCollection.stats.one_day_volume,
          volumeDiff: openseaCollection.stats.one_day_difference,
          volumeChange: openseaCollection.stats.one_day_change,
          sales: openseaCollection.stats.one_day_sales,
          salesDiff: openseaCollection.stats.one_day_sales_change,
          averagePrice: openseaCollection.stats.one_day_average_price,
        },
        {
          interval: "oneWeek",
          volume: openseaCollection.stats.seven_day_volume,
          volumeDiff: openseaCollection.stats.seven_day_difference,
          volumeChange: openseaCollection.stats.seven_day_change,
          sales: openseaCollection.stats.seven_day_sales,
          averagePrice: openseaCollection.stats.seven_day_average_price,
        },
        {
          interval: "oneMonth",
          volume: openseaCollection.stats.thirty_day_volume,
          volumeDiff: openseaCollection.stats.thirty_day_difference,
          volumeChange: openseaCollection.stats.thirty_day_change,
          sales: openseaCollection.stats.thirty_day_sales,
          averagePrice: openseaCollection.stats.thirty_day_average_price,
        },
      ],
    } as CollectionStats;
    res.json(result);
  } catch (error) {
    console.log(error.message);
    return next(new ApplicationError(error.message));
  }
};

export const getCollectionHoldersByContractAddress: RequestHandler = async (
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
    const collectionHolders =
      await CollectionService.getCollectionHoldersByContractAddress(
        contractAddress
      );

    res.json({ collectionHolders });
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

export const getNftsByContractAddress: RequestHandler = async (
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

  const { next: nextToken } = req.query;
  try {
    const openseaNfts = await NftService.getNftsByContractAddress(
      contractAddress,
      nextToken as string
    );

    const result = {
      nfts: openseaNfts.nfts.map((nft) => {
        return {
          identifier: nft.identifier,
          collection: nft.collection,
          contract: nft.contract,
          tokenStandard: nft.token_standard,
          name: nft.name || `${nft.collection} #${nft.identifier}`,
          description: nft.description,
          imageUrl: nft.image_url,
          metadataUrl: nft.metadata_url,
        };
      }),
      next: openseaNfts.next,
    } as NftsList;
    res.json(result);
  } catch (error) {
    console.log(error.message);
    return next(new ApplicationError(error.message));
  }
};

export const getNftSalesByTokenId: RequestHandler = async (req, res, next) => {
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
    const nftSales = await NftService.getNftSalesByTokenId(
      contractAddress,
      tokenId
    );

    const result = nftSales.map((sale) => {
      return {
        marketplace: sale.marketplace,
        contractAddress: sale.contractAddress,
        tokenId: sale.tokenId,
        quantity: sale.quantity,
        buyerAddress: sale.buyerAddress,
        sellerAddress: sale.sellerAddress,
        taker: sale.taker,
        sellerFee: sale.sellerFee,
        protocolFee: sale.protocolFee,
        royaltyFee: sale.royaltyFee,
        blockNumber: sale.blockNumber,
        transactionHash: sale.transactionHash,
      };
    }) as NftSale[];
    res.json({
      sales: result,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ApplicationError(error.message));
  }
};

export const getNftOwnershipsByTokenId: RequestHandler = async (
  req,
  res,
  next
) => {
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
    const nftOwnerships = await NftService.getNftOwnershipsByTokenId(
      contractAddress,
      tokenId
    );

    const ownerships = nftOwnerships
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((event, index) => {
        const holdingTime =
          index + 1 < nftOwnerships.length
            ? event.timestamp - nftOwnerships[index + 1].timestamp
            : 0;
        return {
          ...event,
          holdingTime,
        };
      });
    const result = {
      currentHoldingTime: nftOwnerships[0]
        ? Date.now() - nftOwnerships[0].timestamp
        : 0,
      averageHoldingTime: nftOwnerships[0]
        ? (Date.now() - nftOwnerships[nftOwnerships.length - 1].timestamp) /
          nftOwnerships.length
        : 0,
      ownerships,
    };
    res.json(result);
  } catch (error) {
    console.log(error.message);
    return next(new ApplicationError(error.message));
  }
};
