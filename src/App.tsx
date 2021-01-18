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

const dan = [
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

const App: React.FC = () => {
  const isFirstRendered = useRef(true);
  const [gameList, setGameList] = useState([]);

  if (isFirstRendered.current) {
    window.sw = (gameStrings: string[]) => {
      const games = gameStrings.map((string) => {
        const game = string.split(',');

        // 0 for linkcode, 1 not useful, 2 for time, 3 for game type
        const type = parseInt(game[3]);
        // game[3] = (type & 0x0010 ? '三' : '四') + '般上特鳳若銀琥孔'.substr();
        // assending order for eachplayer (3 data for each player): name, dan, rate
        // player 1
        game[4] = decodeURIComponent(window.Base64.decode(game[4]));
        game[5] = dan[parseInt(game[5])];
        game[6] = Math.floor(parseInt(game[6])).toString();
        // player 2
        game[7] = decodeURIComponent(window.Base64.decode(game[7]));
        game[8] = dan[parseInt(game[8])];
        game[9] = Math.floor(parseInt(game[9])).toString();
        // player 3
        game[10] = decodeURIComponent(window.Base64.decode(game[10]));
        game[11] = dan[parseInt(game[11])];
        game[12] = Math.floor(parseInt(game[12])).toString();
        // player 4
        game[13] = decodeURIComponent(window.Base64.decode(game[13]));
        game[14] = dan[parseInt(game[14])];
        game[15] = Math.floor(parseInt(game[15])).toString();
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
      {gameList.map((e) => (
        <div>{e}</div>
      ))}
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
