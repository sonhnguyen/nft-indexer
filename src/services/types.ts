import { NFT } from "opensea-js/lib/api/types";

export interface OpenseaOwner {
  address: string;
  quantity: number;
}

export interface OpenseaRarity {
  strategy_id: null;
  strategy_version: null;
  rank: number;
  score: null;
  calculated_at: string;
  max_rank: null;
  tokens_scored: number;
  ranking_features: null;
}

export interface OpenseaTrait {
  trait_type: string;
  display_type: null;
  max_value: null;
  trait_count: number;
  order: null;
  value: string;
}

export interface OpenSeaNFT extends NFT {
  creator: string;
  traits: OpenseaTrait[];
  owners: OpenseaOwner[];
  rarity: OpenseaRarity;
}

export interface OpenSeaCollectionStats {
  total: Total;
  intervals: Interval[];
}

export interface Interval {
  interval: string;
  volume: number;
  volume_diff: number;
  volume_change: number;
  sales: number;
  sales_diff: number;
  average_price: number;
}

export interface Total {
  volume: number;
  sales: number;
  average_price: number;
  num_owners: number;
  market_cap: number;
  floor_price: number;
  floor_price_symbol: string;
}

export interface CollectionHolder {
  address: string;
  holdingBalance: number;
  holdingIds: number[];
}
