export interface SnakeCardUpdate {
  id: string;
  stage: number;
  bid: number;
}

export interface SnakeCardData {
  id: string;
  stage: number;
  bids: Array<number>;
  hasInitialized: boolean;
}
