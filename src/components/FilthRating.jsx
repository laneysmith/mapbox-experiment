import React from 'react';

import { ReactComponent as TrashFilledIcon } from '../svg/trash-filled.svg';
import { ReactComponent as TrashOutlineIcon } from '../svg/trash-outline.svg';

const FilthRating = business => {
  // TODO: show different rating based on business ratings/terms
  return (
    <div className="result-filth-rating">
      <TrashFilledIcon />
      <TrashFilledIcon />
      <TrashFilledIcon />
      <TrashOutlineIcon />
      <TrashOutlineIcon />
    </div>
  );
};

export default FilthRating;
