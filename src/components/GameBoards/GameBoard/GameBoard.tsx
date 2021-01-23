import React from 'react';
import { Game } from '../../../models/Game';
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
          <a href={`https://tenhou.net/3/?wg=${props.link}`} target="_blank">
            観戦
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-6">{props.players[0].name}</div>
        <div className="col-6">{`${props.players[0].dan} R${props.players[0].rate}`}</div>
      </div>
      <div className="row">
        <div className="col-6">{props.players[1].name}</div>
        <div className="col-6">{`${props.players[1].dan} R${props.players[1].rate}`}</div>
      </div>
      <div className="row">
        <div className="col-6">{props.players[2].name}</div>
        <div className="col-6">{`${props.players[2].dan} R${props.players[2].rate}`}</div>
      </div>
      {props.players[3].name ? (
        <div className="row">
          <div className="col-6">{props.players[3].name}</div>
          <div className="col-6">{`${props.players[3].dan} R${props.players[3].rate}`}</div>
        </div>
      ) : null}
    </div>
  );
};

export default GameBoard;
