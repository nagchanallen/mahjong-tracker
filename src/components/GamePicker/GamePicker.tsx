import React from 'react';
import Checkbox from '../UI/Checkbox';
import './GamePicker.css';

interface Props {
  isThreePlayers: boolean;
  isFourPlayers: boolean;
  isTokutou: boolean;
  isTokunan: boolean;
  isHoutou: boolean;
  isHounan: boolean;
  // Todo: add types for setState Functions
  setIsThreePlayers: any;
  setIsFourPlayers: any;
  setIsTokutou: any;
  setIsTokunan: any;
  setIsHoutou: any;
  setIsHounan: any;
}

const GamePicker: React.FC<Props> = (props) => {
  const updateFourPlayers = () => props.setIsFourPlayers(!props.isFourPlayers);
  const updateThreePlayers = () =>
    props.setIsThreePlayers(!props.isThreePlayers);
  const updateTokutou = () => props.setIsTokutou(!props.isTokutou);
  const updateTokunan = () => props.setIsTokunan(!props.isTokunan);
  const updateHoutou = () => props.setIsHoutou(!props.isHoutou);
  const updateHounan = () => props.setIsHounan(!props.isHounan);

  return (
    <div className="gamePickerBox">
      <div>
        <Checkbox
          name="fourplayer"
          label="四麻"
          checked={props.isFourPlayers}
          onChange={updateFourPlayers}
        />
        <Checkbox
          name="threeplayer"
          label="三麻"
          checked={props.isThreePlayers}
          onChange={updateThreePlayers}
        />
      </div>
      <div>
        <Checkbox
          name="tokutou"
          label="特東"
          checked={props.isTokutou}
          onChange={updateTokutou}
        />
        <Checkbox
          name="tokunan"
          label="特南"
          checked={props.isTokunan}
          onChange={updateTokunan}
        />
        <Checkbox
          name="houtou"
          label="鳳東"
          checked={props.isHoutou}
          onChange={updateHoutou}
        />
        <Checkbox
          name="hounan"
          label="鳳南"
          checked={props.isHounan}
          onChange={updateHounan}
        />
      </div>
    </div>
  );
};

export default GamePicker;
