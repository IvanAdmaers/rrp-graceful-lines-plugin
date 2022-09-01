import React from 'react';
import type {
  IDesignPlugin,
  IDesignPluginProps,
  PrizeType,
} from 'react-roulette-pro';

import TopChildren from './components/TopChildren';
import BottomChildren from './components/BottomChildren';

import { IGracefulLinesOptions } from './types';

import './index.css';

const width = 170;
const height = 150;
const heightWithText = 200;

const getHeight = (withText: IGracefulLinesOptions['prizesWithText']) =>
  withText === true ? heightWithText : height;

const prizeItemRenderFunction =
  (
    type: IDesignPluginProps['type'],
    prizesWithText: IGracefulLinesOptions['prizesWithText'],
    itemHeight: number,
  ) =>
  ({ image, text }: PrizeType) =>
    (
      <div
        className="roulette-pro-graceful-lines-prize-item "
        style={{ width, height: itemHeight }}
      >
        <div className="roulette-pro-graceful-lines-prize-item-content">
          <img
            className="roulette-pro-graceful-lines-prize-item-content-image"
            src={image}
            alt={text !== undefined ? `prize item ${text}` : 'prize item'}
          />
          {prizesWithText === true && (
            <p className="roulette-pro-graceful-lines-prize-item-content-text">
              {text}
            </p>
          )}
        </div>
        <div
          className={`roulette-pro-graceful-lines-prize-item-determinator ${type}`}
        />
      </div>
    );

const wrapperClassName = 'roulette-pro-graceful-lines-design-wrapper-overrides';

const gracefulLinesDesignPlugin =
  ({
    hideTopArrow,
    replaceBottomArrowWithTopArrow,
    hideSideArrows,
    prizesWithText,
  }: IGracefulLinesOptions = {}) =>
  ({ type }: IDesignPluginProps): IDesignPlugin => {
    const prizeItemHeight = getHeight(prizesWithText);

    return {
      prizeItemWidth: width,
      prizeItemHeight,
      topChildren: hideTopArrow !== true && <TopChildren />,
      bottomChildren: (
        <BottomChildren
          replaceBottomArrowWithTopArrow={replaceBottomArrowWithTopArrow}
          hideSideArrows={hideSideArrows}
        />
      ),
      prizeItemRenderFunction: prizeItemRenderFunction(
        type,
        prizesWithText,
        prizeItemHeight,
      ),
      classes: { wrapper: wrapperClassName },
    };
  };

export default gracefulLinesDesignPlugin;
