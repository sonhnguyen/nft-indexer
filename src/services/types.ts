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
