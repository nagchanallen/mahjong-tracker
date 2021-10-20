export type Player = {
  name: string;
  dan: string;
  rate: number;
};

export type FilterOptions = {
  fourPlayer: boolean;
  threePlayer: boolean;
  tokutou: boolean;
  tokunan: boolean;
  houtou: boolean;
  hounan: boolean;
};

export type PlayersWithTime = {
  player: string;
  time: string;
};
