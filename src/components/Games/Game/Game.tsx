import React from 'react';

const Game: React.FC = () => {
  return (
    <div className="container border">
      <div className="row border">
        <div className="col-2">01:38</div>
        <div className="col-4">四鳳南食赤</div>
        <div className="col-6">観戦</div>
      </div>
      <div className="row">
        <div className="col-3">あいうえおかきく</div>
        <div className="col-3">七段R2000</div>
        <div className="col-3">あいうえ</div>
        <div className="col-3">七段R2000</div>
      </div>
      <div className="row">
        <div className="col-3">あいうえおか</div>
        <div className="col-3">七段R2000</div>
        <div className="col-3">あい</div>
        <div className="col-3">七段R2000</div>
      </div>
    </div>
  );
};

export default Game;
