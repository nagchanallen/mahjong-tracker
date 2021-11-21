import { Player } from '../types/';

type GameDataInput = {
  link: string;
  time: string;
  gameName: string;
};

export class Game {
  players: Player[] = [];
  link: string;
  time: string;
  gameName: string;

  constructor(gameDataInput: GameDataInput) {
    this.link = gameDataInput.link;
    this.time = gameDataInput.time;
    this.gameName = gameDataInput.gameName;
  }

  addPlayer(playerObj: Player): void {
    this.players.push(playerObj);
  }
}
