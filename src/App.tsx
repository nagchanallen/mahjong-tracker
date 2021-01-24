import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import GamePicker from './components/GamePicker/GamePicker';
import GameBoards from './components/GameBoards/GameBoards';
import { danMap } from './utils/maps';
import { Game } from './models/Game';
import './App.css';

declare global {
  interface Window {
    sw: any;
    Base64: any;
  }
}

const App: React.FC = () => {
  const isFirstRendered = useRef<Boolean>(true);
  const [gameList, setGameList] = useState<Game[]>(null);

  if (isFirstRendered.current) {
    window.sw = (gameStrings: string[]) => {
      const games = gameStrings.map((string) => {
        const gameData = string.split(',');
        const gameName = gameData[3];
        const game = new Game(gameData[0], gameData[2], gameName);
        // game[3] = (type & 0x0010 ? '三' : '四') + '般上特鳳若銀琥孔'.substr();
        for (let i = 1; i <= 4; ++i) {
          if (i === 4 && gameName === '57') {
            break;
          }
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
      <Helmet>
        <script src="https://tenhou.net/lib/base64.js" type="text/javascript" />
        <script src="https://mjv.jp/0/wg/0.js" type="text/javascript" />
      </Helmet>
      <div>
        <GamePicker />
      </div>
      {gameList ? (
        <div className="window">
          <GameBoards gameList={gameList} />
        </div>
      ) : null}
    </div>
  );
};

export default hot(module)(App);
