import { OpenSeaCollectionStats } from "opensea-js/lib/types";
import { OpenseaOwner } from "../../services/types";
import { OpenseaTrait } from "../../services/types";

export interface CollectionDetail {
  name: string;
  slug: string;
  description: string;
  featuredImageUrl: string;
  fee: number;
  imageUrl: string;
  largeImageUrl: string;
  stats: OpenSeaCollectionStats;
  externalLink: string;
}

interface Trait {
  traitType: string;
  value: string;
}

export interface NftDetail {
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
}

export interface StatsByInterval {
  interval: string;
  volume: number;
  volumeDiff: number;
  volumeChange: number;
  sales: number;
  salesDiff: number;
  averagePrice: number;
}

export interface CollectionStats {
  volume: number;
  sales: number;
  averagePrice: number;
  numOwners: number;
  marketCap: number;
  floorPrice: number;
  floorPriceSymbol: string;

  statsByIntervals: StatsByInterval[];
}
