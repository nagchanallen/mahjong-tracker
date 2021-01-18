import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import GamePicker from './components/GamePicker/GamePicker';
import Games from './components/Games/Games';
import './App.css';

declare global {
  interface Window {
    sw: any;
  }
}

const App: React.FC = () => {
  const isFirstRendered = useRef(true);
  const [gameList, setGameList] = useState([]);

  if (isFirstRendered.current) {
    window.sw = (arr: string[]) => {
      setGameList(arr);
    };
    isFirstRendered.current = false;
  }

  return (
    <div>
      {gameList.map((e) => (
        <div>{e}</div>
      ))}
      <Helmet>
        <script src="https://tenhou.net/lib/base64.js" type="text/javascript" />
        <script src="https://mjv.jp/0/wg/0.js" type="text/javascript" />
      </Helmet>
      <div>
        <GamePicker />
      </div>
      <div className="window">
        <Games />
      </div>
    </div>
  );
};

export default hot(module)(App);
