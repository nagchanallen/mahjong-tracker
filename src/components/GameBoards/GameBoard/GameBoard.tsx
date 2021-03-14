import React from 'react';
import { Player } from '../../../types/';

interface Props {
  gameName: string;
  link: string;
  time: string;
  players: Player[];
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
          <div className="row" key={player.name}>
            <div className="col-6">{player.name}</div>
            <div className="col-6">{`${player.dan} R${player.rate}`}</div>
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
