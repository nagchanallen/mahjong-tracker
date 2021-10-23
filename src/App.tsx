/* eslint-disable @typescript-eslint/no-explicit-any */
// packages
import React, { useEffect, useRef, useState } from 'react';
import { ipcRenderer } from 'electron';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

// components
import GameFilter from './components/GameFilter/GameFilter';
import GameBoards from './components/GameBoards/GameBoards';

// custom models
import { Game } from './models/Game';

// utils
import * as gameNameMap from './utils/maps';

// style
import './App.css';

// types
import { FilterOptions, PlayersWithTime } from './types';

declare global {
  interface Window {
    sw: (gameStrings: string[]) => void;
    Base64: {
      tohex_table: string;
      toescape: (c: number) => string;
      unbase: (c: number) => string;
      decode: (c: string) => string;
    };
  }
}

const fetchGameData = () => {
  const gameDataTag = document.getElementById('gameData');
  const gameDataDecoderTag = document.getElementById('gameDataDecoder');
  gameDataTag.parentNode.removeChild(gameDataTag);
  const newGameDataTag = document.createElement('script');
  newGameDataTag.setAttribute('id', 'gameData');
  newGameDataTag.setAttribute('type', 'text/javascript');
  newGameDataTag.setAttribute('src', 'https://mjv.jp/0/wg/0.js');
  gameDataDecoderTag.parentNode.appendChild(newGameDataTag);
};

const App: React.FC = (): React.ReactElement => {
  const isFirstRendered = useRef<boolean>(true);
  const [gameList, setGameList] = useState<Game[]>(null);
  const [filteredGameList, setFilteredGameList] = useState<Game[]>(null);
  const [notifiedPlayers, setNotifiedPlayers] = useState<PlayersWithTime[]>([]);
  const [favouritePlayers, setFavouritePlayers] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    fourPlayer: true,
    threePlayer: true,
    tokutou: false,
    tokunan: false,
    houtou: false,
    hounan: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      updateGameList();
    }, 60000);
    return () => {
      clearTimeout(timer);
    };
  }, [gameList]);

  useEffect(() => {
    if (gameList) {
      notifyFavouritePlayers();
      const filteredGameList = filterGames(gameList);
      setFilteredGameList(filteredGameList);
    }
  }, [gameList, filterOptions]);

  const updateGameList = () => {
    fetchGameData();
    makeGameList();
  };

  const makeGameList = () => {
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
            1,
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
            window.Base64.decode(gameData[3 * i + 1]),
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
  };

  const filterGames = (games: Game[]): Game[] => {
    if (!filterOptions.threePlayer) {
      games = _.filter(games, ({ players }) => players.length !== 3);
    }

    if (!filterOptions.fourPlayer) {
      games = _.filter(games, ({ players }) => players.length !== 4);
    }

    if (!filterOptions.tokutou) {
      games = _.filter(
        games,
        ({ gameName }) => gameName.slice(1, 3) !== '特東',
      );
    }

    if (!filterOptions.tokunan) {
      games = _.filter(
        games,
        ({ gameName }) => gameName.slice(1, 3) !== '特南',
      );
    }

    if (!filterOptions.houtou) {
      games = _.filter(
        games,
        ({ gameName }) => gameName.slice(1, 3) !== '鳳東',
      );
    }

    if (!filterOptions.hounan) {
      games = _.filter(
        games,
        ({ gameName }) => gameName.slice(1, 3) !== '鳳南',
      );
    }
    return games;
  };

  const notifyFavouritePlayers = () => {
    const playersToNotify: string[] = [];
    // clean up outdated notified player
    const updatedNotifiedPlayers: PlayersWithTime[] = notifiedPlayers.filter(
      (notifiedPlayer) => {
        let isNotifiedPlayerInGameList = false;
        gameList.forEach((game) => {
          game.players.forEach((player) => {
            isNotifiedPlayerInGameList =
              isNotifiedPlayerInGameList ||
              (player.name === notifiedPlayer.player &&
                game.time === notifiedPlayer.time);
          });
        });
        return isNotifiedPlayerInGameList;
      },
    );

    console.log('updatedNotifiedPlayers(1): ', updatedNotifiedPlayers);

    // take players name that to be notified
    gameList.forEach((game) => {
      game.players.forEach((player) => {
        const notifiedPlayerInd = _.findIndex(
          updatedNotifiedPlayers,
          (target) => {
            return player.name === target.player;
          },
        );
        if (notifiedPlayerInd === -1) {
          const favouritePlayerInd = _.findIndex(favouritePlayers, (target) => {
            return player.name === target;
          });
          if (favouritePlayerInd >= 0) {
            playersToNotify.push(
              game.time +
                ' ' +
                player.name +
                ' ' +
                player.dan +
                ' R' +
                player.rate,
            );
            updatedNotifiedPlayers.push({
              player: player.name,
              time: game.time,
            });
          }
        }
      });
    });

    console.log('updatedNotifiedPlayers(2): ', updatedNotifiedPlayers);
    setNotifiedPlayers(updatedNotifiedPlayers);
    console.log(playersToNotify);

    // send notification;
    if (playersToNotify.length > 0) {
      ipcRenderer.send('show-notification', playersToNotify);
    }
  };

  if (isFirstRendered.current) {
    makeGameList();
    const fetchedFavoutitePlayers = ipcRenderer.sendSync(
      'get-favourite-players',
    );
    setFavouritePlayers(fetchedFavoutitePlayers);
    isFirstRendered.current = false;
  }

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
          <GameFilter
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>
        <div className="col-5">
          <button onClick={updateGameList}>更新</button>
        </div>
      </div>
      {filteredGameList ? (
        <div className="window">
          <GameBoards
            gameList={filteredGameList}
            favouritePlayers={favouritePlayers}
            setFavouritePlayers={setFavouritePlayers}
            filterOptions={filterOptions}
          />
        </div>
      ) : null}
    </div>
  );
};

export default hot(module)(App);
