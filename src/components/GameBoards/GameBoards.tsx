import React from 'react';
import GameBoard from './GameBoard/GameBoard';
import { Game } from '../../models/Game';
import './GameBoards.css';

interface Props {
  gameList: Game[];
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

const GameBoards: React.FC<Props> = ({
  gameList,
  gameTypeStates,
  favouritePlayers,
  setFavouritePlayers,
}): React.ReactElement => {
  return (
    <div className="scrollable">
      {gameList.map(({ link, gameName, players, time }) => {
        return (
          <GameBoard
            favouritePlayers={favouritePlayers}
            setFavouritePlayers={setFavouritePlayers}
            key={link}
            gameName={gameName}
            link={link}
            time={time}
            players={players}
            gameTypeStates={gameTypeStates}
          />
        );
      })}
    </div>
  );
};

export default GameBoards;
