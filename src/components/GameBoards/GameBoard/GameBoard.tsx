import React from 'react';
import { Player } from '../../../types/';

interface Props {
  gameName: string;
  link: string;
  time: string;
  players: Player[];
}

const GameBoard: React.FC<Props> = (props) => {
  return (
    <div className="container border">
      <div className="row border">
        <div className="col-2">{props.time}</div>
        <div className="col-4">{props.gameName}</div>
        <div className="col-6">
          <a
            href={`https://tenhou.net/3/?wg=${props.link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            観戦
          </a>
        </div>
      </div>
      {props.players.map((player) => {
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
