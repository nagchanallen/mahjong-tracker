import { Player } from './Player';
import { danMap } from '../utils/maps';

const GAME_LEVEL = '般上特鳳若銀琥孔';

const GT_TAKU = (w: number): number => {
  return ((w & 0x0020) >> 4) | ((w & 0x0080) >> 7);
};

// const GT_ISDAN = (w: number): boolean => {
//   return !(w & (0x0200 | 0x0400 | 0x0800));
// };

const GT_ISJANS = (w: number): boolean => {
  return (w & (0x0200 | 0x0400)) != 0;
};

// gameString Decoding code is modified from tenhou's official code
export class Game {
  link: string;
  time: string;
  level: string;
  isFourPlayer = false;
  isHanChan = false;
  isChip = false;
  chipRate = -1;
  isKuu = false;
  isAka = false;
  isFast = false;
  players: Player[] = [];

  constructor(gameString: string) {
    const gameData = gameString.split(',');

    const gameTypeHex = parseInt(gameData[3]);
    this.isFourPlayer = !(gameTypeHex & 0x0010);

    const levelIndex = (GT_ISJANS(gameTypeHex) ? 4 : 0) + GT_TAKU(gameTypeHex);
    this.level = GAME_LEVEL[levelIndex];

    this.isHanChan = Boolean(gameTypeHex & 0x0008);

    if (GT_ISJANS(gameTypeHex)) {
      this.isChip = true;
      this.chipRate = ~gameTypeHex & 0x0200 ? 0 : gameTypeHex & 0x0400 ? 5 : 2;
    } else {
      this.isKuu = !(gameTypeHex & 0x0004);
      this.isAka = !(gameTypeHex & 0x0002);
      this.isFast = Boolean(gameTypeHex & 0x0040);
    }

    const playerCount = this.isFourPlayer ? 4 : 3;

    for (let i = 1; i <= playerCount; ++i) {
      const playerName = decodeURIComponent(
        window.Base64.decode(gameData[3 * i + 1]),
      );
      const playerDan = danMap[parseInt(gameData[3 * i + 2])];
      const playerRate = Math.floor(parseInt(gameData[3 * i + 3]));
      this.players.push(
        new Player({
          name: playerName,
          dan: playerDan,
          rate: playerRate,
        }),
      );
    }
  }

  getGameTypeName = (): string => {
    let result = '';
    result += this.isFourPlayer ? '四' : '三';
    result += this.level;
    result += this.isHanChan ? '南' : '東';
    if (this.isChip) {
      result += '祝' + this.chipRate;
    } else {
      result += this.isKuu ? '喰' : '';
      result += this.isAka ? '赤' : '';
      result += this.isFast ? '速' : '';
    }
    return result;
  };
}
