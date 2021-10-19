import React from 'react';
import { ipcRenderer } from 'electron';
import './GameBoard.css';
import _ from 'lodash';
import { Player } from '../../../types/';

interface Props {
  gameName: string;
  link: string;
  time: string;
  players: Player[];
  favouritePlayers: string[];
  setFavouritePlayers: React.Dispatch<React.SetStateAction<string[]>>;
  gameTypeStates: {
    isThreePlayers: boolean;
    isFourPlayers: boolean;
    isTokutou: boolean;
    isTokunan: boolean;
    isHoutou: boolean;
    isHounan: boolean;
  };
}

const GameBoard: React.FC<Props> = ({
  gameName,
  link,
  time,
  players,
  favouritePlayers,
  setFavouritePlayers,
}): React.ReactElement => {
  return (
    <div className="container border">
      <div className="row border">
        <div className="col-2">{time}</div>
        <div className="col-4">{gameName}</div>
        <div className="col-6">
          <a
            href={`https://tenhou.net/3/?wg=${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            観戦
          </a>
        </div>
      </div>
      {players.map((player) => {
        return (
          <div
            className={`row ${
              favouritePlayers.includes(player.name) ? 'is-favourite' : ''
            }`}
            key={player.name}
            onClick={() => {
              console.log('HI');
              const isfavouritedPlayer = favouritePlayers.includes(player.name);
              const newFavouritePlayers = _.cloneDeep(favouritePlayers);
              if (isfavouritedPlayer) {
                const itemToBeRemovedIndex = newFavouritePlayers.indexOf(
                  player.name,
                );
                newFavouritePlayers.splice(itemToBeRemovedIndex, 1);
                setFavouritePlayers(newFavouritePlayers);
              } else {
                newFavouritePlayers.push(player.name);
                setFavouritePlayers(newFavouritePlayers);
              }
              ipcRenderer.send('save-favourite-players', newFavouritePlayers);
            }}
          >
            <div className="col-6">{player.name}</div>
            <div className="col-6">{`${player.dan} R${player.rate}`}</div>
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
