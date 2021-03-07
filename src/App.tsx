import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import { Game } from './models/Game';
import * as gameNameMap from './utils/maps';
import GamePicker from './components/GamePicker/GamePicker';
import GameBoards from './components/GameBoards/GameBoards';
import './App.css';

declare global {
  interface Window {
    sw: any;
    Base64: any;
  }
}

const App: React.FC = () => {
  const isFirstRendered = useRef<boolean>(true);
  const [gameList, setGameList] = useState<Game[]>(null);
  const [isFourPlayers, setIsFourPlayers] = useState<boolean>(true);
  const [isThreePlayers, setIsThreePlayers] = useState<boolean>(false);
  const [isTokutou, setIsTokutou] = useState<boolean>(false);
  const [isTokunan, setIsTokunan] = useState<boolean>(false);
  const [isHoutou, setIsHoutou] = useState<boolean>(false);
  const [isHounan, setIsHounan] = useState<boolean>(true);

  const gameListUpdate = () => {
    const gameDataTag = document.getElementById('gameData');
    const gameDataDecoderTag = document.getElementById('gameDataDecoder');
    gameDataTag.parentNode.removeChild(gameDataTag);
    const newGameDataTag = document.createElement('script');
    newGameDataTag.setAttribute('id', 'gameData');
    newGameDataTag.setAttribute('type', 'text/javascript');
    newGameDataTag.setAttribute('src', 'https://mjv.jp/0/wg/0.js');
    gameDataDecoderTag.parentNode.appendChild(newGameDataTag);
  };

  if (isFirstRendered.current) {
    window.sw = (gameStrings: string[]) => {
      const games = gameStrings.map((string) => {
        const gameData = string.split(',');
        const gameType = parseInt(gameData[3]);
        // The code below has been modified from the original code which comes from tenhou official page. //
        const gameName =
          (gameType & 0x0010 ? '三' : '四') +
          '般上特鳳若銀琥孔'.substr(
            (gameNameMap.GT_ISJANS(gameType) ? 4 : 0) +
              gameNameMap.GT_TAKU(gameType),
            1
          ) +
          (gameType & 0x0008 ? '南' : '東') +
          (gameNameMap.GT_ISJANS(gameType)
            ? '祝' + (~gameType & 0x0200 ? '0' : gameType & 0x0400 ? '5' : '2')
            : (gameType & 0x0004 ? '' : '喰') +
              (gameType & 0x0002 ? '' : '赤') +
              (gameType & 0x0040 ? '速' : ''));
        // The code above has been modified from the original code which comes from tenhou official page. //

        const game = new Game({
          link: gameData[0],
          time: gameData[2],
          gameName: gameName,
        });

        for (let i = 1; i <= 4; ++i) {
          if (i === 4 && gameName[0] === '三') {
            break;
          }
          const playerName = decodeURIComponent(
            window.Base64.decode(gameData[3 * i + 1])
          );
          const playerDan = gameNameMap.danMap[parseInt(gameData[3 * i + 2])];
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
    const UpdateTimerId = setTimeout(() => {
      gameListUpdate();
      console.log('gameList is updated.');
    }, 60000);
    console.log(gameList);
    return () => {
      clearTimeout(UpdateTimerId);
    };
  }, [gameList]);

  return (
    <div className="App">
      <Helmet>
        <script
          id="gameDataDecoder"
          src="https://tenhou.net/lib/base64.js"
          type="text/javascript"
        />
        <script
          id="gameData"
          src="https://mjv.jp/0/wg/0.js"
          type="text/javascript"
        />
      </Helmet>
      <div className="row">
        <div className="col-7">
          <GamePicker
            isThreePlayers={isThreePlayers}
            isFourPlayers={isFourPlayers}
            isTokutou={isTokutou}
            isTokunan={isTokunan}
            isHoutou={isHoutou}
            isHounan={isHounan}
            setIsThreePlayers={setIsThreePlayers}
            setIsFourPlayers={setIsFourPlayers}
            setIsTokutou={setIsTokutou}
            setIsTokunan={setIsTokunan}
            setIsHoutou={setIsHoutou}
            setIsHounan={setIsHounan}
          />
        </div>
        <div className="col-5">
          <button onClick={gameListUpdate}>更新</button>
        </div>
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
