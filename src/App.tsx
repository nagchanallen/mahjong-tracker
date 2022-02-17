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
import { PlayerWithTime } from './models/Player';

// style
import './styles/App.css';

// types
import { FilterOptions } from './types';

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
  const [notifiedPlayers, setNotifiedPlayers] = useState<PlayerWithTime[]>([]);
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
      const games = gameStrings.map((e) => new Game(e));
      setGameList(games);
    };
  };

  const filterGames = (games: Game[]): Game[] => {
    if (!filterOptions.threePlayer) {
      games = _.filter(games, ({ isFourPlayer }) => isFourPlayer);
    }

    if (!filterOptions.fourPlayer) {
      games = _.filter(games, ({ isFourPlayer }) => !isFourPlayer);
    }

    if (!filterOptions.tokutou) {
      games = _.filter(
        games,
        ({ level, isHanChan }) => level !== '特' || isHanChan,
      );
    }

    if (!filterOptions.tokunan) {
      games = _.filter(
        games,
        ({ level, isHanChan }) => level !== '特' || !isHanChan,
      );
    }

    if (!filterOptions.houtou) {
      games = _.filter(
        games,
        ({ level, isHanChan }) => level !== '鳳' || isHanChan,
      );
    }

    if (!filterOptions.hounan) {
      games = _.filter(
        games,
        ({ level, isHanChan }) => level !== '鳳' || !isHanChan,
      );
    }
    return games;
  };

  const notifyFavouritePlayers = () => {
    const playersToNotify: string[] = [];
    // clean up outdated notified player
    const updatedNotifiedPlayers: PlayerWithTime[] = notifiedPlayers.filter(
      (notifiedPlayer) => {
        let isNotifiedPlayerInGameList = false;
        gameList.forEach((game) => {
          game.players.forEach((player) => {
            isNotifiedPlayerInGameList =
              isNotifiedPlayerInGameList ||
              (player.name === notifiedPlayer.player.name &&
                game.time === notifiedPlayer.time);
          });
        });
        return isNotifiedPlayerInGameList;
      },
    );

    // take players name that to be notified
    gameList.forEach((game) => {
      game.players.forEach((player) => {
        const notifiedPlayerInd = _.findIndex(
          updatedNotifiedPlayers,
          (target) => {
            return (
              player.name === target.player.name && game.time === target.time
            );
          },
        );
        if (notifiedPlayerInd >= 0) return;
        const favouritePlayerInd = _.findIndex(favouritePlayers, (target) => {
          return player.name === target;
        });
        if (favouritePlayerInd >= 0) {
          playersToNotify.push(
            `${game.time} ${player.name} ${player.dan} R${player.rate}`,
          );
          updatedNotifiedPlayers.push({
            player: player,
            time: game.time,
          });
        }
      });
    });

    setNotifiedPlayers(updatedNotifiedPlayers);

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
