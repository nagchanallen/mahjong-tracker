import React from 'react';
import Checkbox from '../UI/Checkbox';
import '../../styles/GameFilter.css';
import { FilterOptions } from '../../types';

interface Props {
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

const GameFilter: React.FC<Props> = ({
  filterOptions,
  setFilterOptions,
}): React.ReactElement => {
  return (
    <div className="game-filter-box">
      <div>
        <Checkbox
          name="fourPlayer"
          label="四麻"
          checked={filterOptions.fourPlayer}
          onChange={() =>
            setFilterOptions({
              ...filterOptions,
              fourPlayer: !filterOptions.fourPlayer,
            })
          }
        />
        <Checkbox
          name="threePlayer"
          label="三麻"
          checked={filterOptions.threePlayer}
          onChange={() =>
            setFilterOptions({
              ...filterOptions,
              threePlayer: !filterOptions.threePlayer,
            })
          }
        />
      </div>
      <div>
        <Checkbox
          name="tokutou"
          label="特東"
          checked={filterOptions.tokutou}
          onChange={() =>
            setFilterOptions({
              ...filterOptions,
              tokutou: !filterOptions.tokutou,
            })
          }
        />
        <Checkbox
          name="tokunan"
          label="特南"
          checked={filterOptions.tokunan}
          onChange={() =>
            setFilterOptions({
              ...filterOptions,
              tokunan: !filterOptions.tokunan,
            })
          }
        />
        <Checkbox
          name="houtou"
          label="鳳東"
          checked={filterOptions.houtou}
          onChange={() =>
            setFilterOptions({
              ...filterOptions,
              houtou: !filterOptions.houtou,
            })
          }
        />
        <Checkbox
          name="hounan"
          label="鳳南"
          checked={filterOptions.hounan}
          onChange={() =>
            setFilterOptions({
              ...filterOptions,
              hounan: !filterOptions.hounan,
            })
          }
        />
      </div>
    </div>
  );
};

export default GameFilter;
