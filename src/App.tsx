import { hot } from 'react-hot-loader';
import * as React from 'react';
import GamePicker from './components/GamePicker/GamePicker';
import Games from './components/Games/Games';

const App: React.FC = () => {
  return (
    <div>
      <GamePicker />
      <Games />
    </div>
  );
};

export default hot(module)(App);
