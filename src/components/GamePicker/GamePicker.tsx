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
  setIsThreePlayers: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFourPlayers: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTokutou: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTokunan: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHoutou: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHounan: React.Dispatch<React.SetStateAction<boolean>>;
}

const GamePicker: React.FC<Props> = ({
  isThreePlayers,
  isFourPlayers,
  isTokutou,
  isTokunan,
  isHoutou,
  isHounan,
  setIsThreePlayers,
  setIsFourPlayers,
  setIsTokutou,
  setIsTokunan,
  setIsHoutou,
  setIsHounan,
}) => {
  const updateFourPlayers = () => setIsFourPlayers(!isFourPlayers);
  const updateThreePlayers = () => setIsThreePlayers(!isThreePlayers);
  const updateTokutou = () => setIsTokutou(!isTokutou);
  const updateTokunan = () => setIsTokunan(!isTokunan);
  const updateHoutou = () => setIsHoutou(!isHoutou);
  const updateHounan = () => setIsHounan(!isHounan);

  return (
    <div className="gamePickerBox">
      <div>
        <Checkbox
          name="fourPlayer"
          label="四麻"
          checked={isFourPlayers}
          onChange={updateFourPlayers}
        />
        <Checkbox
          name="threePlayer"
          label="三麻"
          checked={isThreePlayers}
          onChange={updateThreePlayers}
        />
      </div>
      <div>
        <Checkbox
          name="tokutou"
          label="特東"
          checked={isTokutou}
          onChange={updateTokutou}
        />
        <Checkbox
          name="tokunan"
          label="特南"
          checked={isTokunan}
          onChange={updateTokunan}
        />
        <Checkbox
          name="houtou"
          label="鳳東"
          checked={isHoutou}
          onChange={updateHoutou}
        />
        <Checkbox
          name="hounan"
          label="鳳南"
          checked={isHounan}
          onChange={updateHounan}
        />
      </div>
    </div>
  );
};

export default GamePicker;
