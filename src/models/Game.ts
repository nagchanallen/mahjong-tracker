import { Player } from '../types/';

export class Game {
  players: Player[] = [];
  link: string;
  time: string;
  gameName: string;

  constructor(link: string, time: string, gameName: string) {
    this.link = link;
    this.time = time;
    this.gameName = gameName;
  }

  addPlayer(playerObj: Player) {
    this.players.push(playerObj);
  }
}
