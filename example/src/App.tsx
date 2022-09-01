import React, { useState, useEffect } from 'react';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

import gracefulLinesPlugin, {
  IGracefulLinesOptions,
} from 'rrp-graceful-lines-plugin';
import 'rrp-graceful-lines-plugin/dist/index.css';

import './App.css';

interface IPrize {
  image: string;
  text?: string;
}

const prizes: Array<IPrize> = [
  {
    image: 'https://i.ibb.co/6Z6Xm9d/good-1.png',
    text: 'Apple MacBook Pro 13 Late 2020',
  },
  {
    image: 'https://i.ibb.co/T1M05LR/good-2.png',
    text: 'Apple iPhone 13 Pro Max 512GB',
  },
  {
    image: 'https://i.ibb.co/Qbm8cNL/good-3.png',
    text: 'Apple MacBook Pro M1 13 256GB',
  },
  {
    image: 'https://i.ibb.co/5Tpfs6W/good-4.png',
    text: 'MacBook Air 13',
  },
  {
    image: 'https://i.ibb.co/64k8D1c/good-5.png',
    text: 'Apple iPad Pro 12.9',
  },
];

const winPrizeIndex = 0;

const reproductionArray = <Type,>(
  array: Array<Type>,
  length: number,
): Array<Type> => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const reproducedPrizeList = [
  ...prizes,
  ...reproductionArray<IPrize>(prizes, prizes.length * 3),
  ...prizes,
  ...reproductionArray<IPrize>(prizes, prizes.length),
];

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

const prizeList = reproducedPrizeList.map((prize) => ({
  ...prize,
  id: generateId(),
}));

const CACHED_OPTIONS_LOCAL_STORAGE_KEY = 'CACHED_OPTIONS';

interface IOption {
  label: string;
  value: string;
  options: Array<string>;
}

interface IDefaultOptions {
  [key: string]: IOption;
}

const defaultOptions: IDefaultOptions = {
  type: {
    label: 'Type',
    value: 'horizontal',
    options: ['horizontal', 'vertical'],
  },
  hideTopArrow: {
    label: 'hideTopArrow',
    value: 'false',
    options: ['false', 'true'],
  },
  hideSideArrows: {
    label: 'hideSideArrows',
    value: 'false',
    options: ['false', 'true'],
  },
  replaceBottomArrowWithTopArrow: {
    label: 'replaceBottomArrowWithTopArrow',
    value: 'false',
    options: ['false', 'true'],
  },
  prizesWithText: {
    label: 'prizesWithText',
    value: 'false',
    options: ['false', 'true'],
  },
};

const App = () => {
  const [options, setOptions] = useState<IDefaultOptions>(() => {
    const cachedValue = localStorage.getItem(CACHED_OPTIONS_LOCAL_STORAGE_KEY);

    if (cachedValue === null) {
      return JSON.parse(JSON.stringify(defaultOptions));
    }

    return JSON.parse(cachedValue);
  });
  const [start, setStart] = useState(false);

  const prizeIndex = prizes.length * 4 + winPrizeIndex;

  const handleStart = () => {
    setStart((prevState) => !prevState);
  };

  const handlePrizeDefined = () => {
    console.log('🥳 Prize defined! 🥳');
  };

  const handleOptionsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.dataset.option as keyof typeof options;
    const newValue = event.target.value;

    const prevOptionState = { ...options[key] };
    prevOptionState.value = newValue;

    setOptions((prevState) => ({ ...prevState, [key]: prevOptionState }));
  };

  useEffect(() => {
    const optionsJSON = JSON.stringify(options);

    localStorage.setItem(CACHED_OPTIONS_LOCAL_STORAGE_KEY, optionsJSON);
  }, [options]);

  const renderOptions = () => {
    return Object.keys(options).map((key) => {
      const { label, value, options: availableOptions } = options[key];

      return (
        <li key={key} className="options-list-item">
          <p>{label}</p>
          <select
            data-option={key}
            onChange={handleOptionsChange}
            value={value}
          >
            {availableOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </li>
      );
    });
  };

  const getDesignPluginConfig = (): IGracefulLinesOptions => {
    const config: IGracefulLinesOptions = {};

    const isBoolen = (value: string) => value === 'true';

    config.hideTopArrow = isBoolen(options.hideTopArrow.value);
    config.hideSideArrows = isBoolen(options.hideSideArrows.value);
    config.replaceBottomArrowWithTopArrow = isBoolen(
      options.replaceBottomArrowWithTopArrow.value,
    );
    config.prizesWithText = isBoolen(options.prizesWithText.value);

    return config;
  };

  const resetOptions = () => {
    localStorage.removeItem(CACHED_OPTIONS_LOCAL_STORAGE_KEY);

    const initialOptions = JSON.parse(JSON.stringify(defaultOptions));

    setOptions(initialOptions);
  };

  return (
    <>
      <div className={`roulette-wrapper ${options.type.value}`}>
        <RoulettePro
          prizes={prizeList}
          prizeIndex={prizeIndex}
          start={start}
          onPrizeDefined={handlePrizeDefined}
          designPlugin={gracefulLinesPlugin(getDesignPluginConfig())}
          type={options.type.value as 'vertical' | 'horizontal'}
          spinningTime={4}
        />
      </div>
      <div className="gray-block">
        <div className="button-wrapper">
          <button className="spin-button" type="button" onClick={handleStart}>
            Spin
          </button>
        </div>
      </div>
      <div className="options">
        <ul className="options-list">
          {renderOptions()}
          <li>
            <button
              onClick={resetOptions}
              className="options-reset-button"
              type="button"
            >
              Reset
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default App;
