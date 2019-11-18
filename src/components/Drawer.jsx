import React from 'react';
import cn from 'classnames';
import { ReactComponent as TrashFilledIcon } from '../svg/trash-filled.svg';
import { ReactComponent as TrashOutlineIcon } from '../svg/trash-outline.svg';
import { ReactComponent as OpenDotIcon } from '../svg/open-dot.svg';
import { ReactComponent as ClosedDotIcon } from '../svg/closed-dot.svg';

const formatOpenStatus = isClosed => {
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

// TODO: result different rating based on result ratings/terms
const formatFilthRating = result => {
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

const Drawer = ({ results, loading, selectedIndex }) => {
  let content;
  if (loading) {
    content = 'Loading...';
  } else if (results && results.businesses && results.businesses.length) {
    content = (
      <table className="results-table">
        <tbody>
          {results.businesses.map((business, index) => {
            const { id, name, is_closed } = business;
            return (
              <tr
                key={id}
                className={cn('results-table-row', {
                  'results-table-row--selected': selectedIndex === index,
                })}
              >
                <td>
                  <h3>{name}</h3>
                  <div className="results-table-row__footer">
                    {formatFilthRating(business)}
                    {formatOpenStatus(is_closed)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    content = 'No filth for you.';
  }

  return <aside className="results-drawer">{content}</aside>;
};

export default Drawer;
