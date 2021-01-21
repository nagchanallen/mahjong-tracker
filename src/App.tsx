import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import GamePicker from './components/GamePicker/GamePicker';
import Games from './components/Games/Games';
import './App.css';

declare global {
  interface Window {
    sw: any;
    Base64: any;
  }
}

const danMap = [
  '新人',
  '９級',
  '８級',
  '７級',
  '６級',
  '５級',
  '４級',
  '３級',
  '２級',
  '１級',
  '初段',
  '二段',
  '三段',
  '四段',
  '五段',
  '六段',
  '七段',
  '八段',
  '九段',
  '十段',
  '天鳳位',
];

interface Player {
  name: string;
  dan: string;
  rate: number;
}

class Game {
  players: Player[] = [];
  constructor(link: string, time: string, gameType: string) {}

  addPlayer(playerObj: Player) {
    this.players.push(playerObj);
  }
}

const App: React.FC = () => {
  const isFirstRendered = useRef<Boolean>(true);
  const [gameList, setGameList] = useState<Game[]>(null);

  if (isFirstRendered.current) {
    window.sw = (gameStrings: string[]) => {
      const games = gameStrings.map((string) => {
        const gameData = string.split(',');
        const gameType = gameData[3];
        const game = new Game(gameData[0], gameData[2], gameType);
        // game[3] = (type & 0x0010 ? '三' : '四') + '般上特鳳若銀琥孔'.substr();
        for (let i = 1; i <= 4; ++i) {
          const playerName = decodeURIComponent(
            window.Base64.decode(gameData[3 * i + 1])
          );
          const playerDan = danMap[parseInt(gameData[3 * i + 2])];
          const playerRate = Math.floor(parseInt(gameData[3 * i + 3]));
          game.addPlayer({
            name: playerName,
            dan: playerDan,
            rate: playerRate,
          });
        }
        return game;
      });
      setGameList(games);
    };
    isFirstRendered.current = false;
  }

  useEffect(() => {
    console.log(gameList);
  }, [gameList]);

  return (
    <div>
      {/* {gameList.map((e) => (
        <div>{e}</div>
      ))} */}
      <Helmet>
        <script src="https://tenhou.net/lib/base64.js" type="text/javascript" />
        <script src="https://mjv.jp/0/wg/0.js" type="text/javascript" />
      </Helmet>
      <div>
        <GamePicker />
      </div>
      <div className="window">
        <Games />
      </div>
    </div>
  );
};

export default hot(module)(App);
