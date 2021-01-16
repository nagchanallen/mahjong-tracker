import { hot } from 'react-hot-loader';
import * as React from 'react';
import GamePicker from './components/GamePicker/GamePicker';
import Games from './components/Games/Games';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
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
