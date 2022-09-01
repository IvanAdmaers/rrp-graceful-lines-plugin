import React from 'react';

import { IBottomChildrenOptions } from '../../types';

import './BottomChildren.css';

const BottomChildren = ({
  replaceBottomArrowWithTopArrow,
  hideSideArrows,
}: IBottomChildrenOptions) => (
  <div>
    {replaceBottomArrowWithTopArrow !== true ? (
      <div className="roulette-pro-graceful-lines-design-bottom-line" />
    ) : (
      <div className="roulette-pro-graceful-lines-design-top down" />
    )}
    {hideSideArrows !== true && (
      <>
        <div className="roulette-pro-graceful-lines-design-bottom-left-line" />
        <div className="roulette-pro-graceful-lines-design-bottom-right-line" />
      </>
    )}
  </div>
);

export default BottomChildren;
