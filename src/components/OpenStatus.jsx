import React from 'react';

import { ReactComponent as OpenDotIcon } from '../svg/open-dot.svg';
import { ReactComponent as ClosedDotIcon } from '../svg/closed-dot.svg';

const OpenStatus = ({ isClosed }) => {
  let text = 'Open';
  let icon = <OpenDotIcon title="open" />;

  if (isClosed) {
    text = 'Closed';
    icon = <ClosedDotIcon title="closed" />;
  }

  return (
    <div className="result-open-status">
      {text} {icon}
    </div>
  );
};
export default OpenStatus;
