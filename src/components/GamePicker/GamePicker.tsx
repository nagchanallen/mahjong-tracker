import React, { useState } from 'react';
import Checkbox from '../UI/Checkbox';
import './GamePicker.css';

const GamePicker: React.FC = () => {
  const [fourPlayers, setFourPlayers] = useState(true);
  const [threePlayers, setThreePlayers] = useState(false);
  const [tokutou, setTokutou] = useState(false);
  const [tokunan, setTokunan] = useState(false);
  const [houtou, setHoutou] = useState(false);
  const [hounan, setHounan] = useState(true);

  const updateFourPlayers = () => setFourPlayers(!fourPlayers);
  const updateThreePlayers = () => setThreePlayers(!threePlayers);
  const updateTokutou = () => setTokutou(!tokutou);
  const updateTokunan = () => setTokunan(!tokunan);
  const updateHoutou = () => setHoutou(!houtou);
  const updateHounan = () => setHounan(!hounan);

  return (
    <div className="gamePickerBox">
      <div>
        <Checkbox
          name="fourplayer"
          label="四麻"
          checked={fourPlayers}
          onChange={updateFourPlayers}
        />
        <Checkbox
          name="threeplayer"
          label="三麻"
          checked={threePlayers}
          onChange={updateThreePlayers}
        />
      </div>
      <div>
        <Checkbox
          name="tokutou"
          label="特東"
          checked={tokutou}
          onChange={updateTokutou}
        />
        <Checkbox
          name="tokunan"
          label="特南"
          checked={tokunan}
          onChange={updateTokunan}
        />
        <Checkbox
          name="houtou"
          label="鳳東"
          checked={houtou}
          onChange={updateHoutou}
        />
        <Checkbox
          name="hounan"
          label="鳳南"
          checked={hounan}
          onChange={updateHounan}
        />
      </div>
    </div>
  );
};

export default GamePicker;
