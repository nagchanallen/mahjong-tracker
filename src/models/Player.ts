type PlayerInputPayload = {
  name: string;
  dan: string;
  rate: number;
};

export class Player {
  name: string;
  dan: string;
  rate: number;

  constructor({ name, dan, rate }: PlayerInputPayload) {
    this.name = name;
    this.dan = dan;
    this.rate = rate;
  }
}

export class PlayerWithTime {
  player: Player;
  time: string;

  constructor(player: Player, time: string) {
    this.player = player;
    this.time = time;
  }
}
