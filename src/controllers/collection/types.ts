import { OpenSeaCollectionStats } from "opensea-js/lib/types";
import { OpenseaOwner } from "../../services/types";
import { OpenseaTrait } from "../../services/types";

export type CollectionDetail = {
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

type Trait = {
  traitType: string;
  value: string;
};
export type NftDetail = {
  tokenId: string;
  collection: string;
  contract: string;
  tokenStandard: string;
  name: string;
  description: string;
  imageUrl: string;
  metadataUrl: string;
  creator: string;
  traits: Trait[];
  owners: OpenseaOwner[];
  rarity: number;
};
