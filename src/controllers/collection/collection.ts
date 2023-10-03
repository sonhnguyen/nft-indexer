import { RequestHandler } from "express";
import ApplicationError from "../../errors/application-error";

import * as NftService from "../../services/nft-service";

export const index: RequestHandler = async (req, res, next) => {
  try {
    const result = NftService.testtest("monkey");
    res.json({
      name: result,
    });
  } catch (error) {
    return next(new ApplicationError(error.message));
  }
};
