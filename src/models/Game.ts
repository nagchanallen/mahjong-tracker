import { Player } from '../types/';

interface gameData {
  link: string;
  time: string;
  gameName: string;
}

export class Game {
  players: Player[] = [];
  link: string;
  time: string;
  gameName: string;

  constructor(gameData: gameData) {
    this.link = gameData.link;
    this.time = gameData.time;
    this.gameName = gameData.gameName;
  }

  addPlayer(playerObj: Player): void {
    this.players.push(playerObj);
  }
}
