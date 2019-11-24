import React from 'react';
import cn from 'classnames';
import { ReactComponent as TrashFilledIcon } from '../svg/trash-filled.svg';
import { ReactComponent as TrashOutlineIcon } from '../svg/trash-outline.svg';
import { ReactComponent as OpenDotIcon } from '../svg/open-dot.svg';
import { ReactComponent as ClosedDotIcon } from '../svg/closed-dot.svg';

const Drawer = ({ businesses, loading, error, selectedIndex }) => {
  let content;
  if (businesses.length) {
    content = (
      <table className="results-table">
        <tbody>
          {businesses.map((business, index) => {
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
  } else if (loading) {
    content = noResultsMessage('Loading...');
  } else if (error) {
    content = noResultsMessage('Error retrieving results');
  } else {
    content = noResultsMessage('No filth for you');
  }

  return <aside className="results-drawer">{content}</aside>;
};

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

const formatFilthRating = result => {
  // TODO: show different rating based on result ratings/terms
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

const noResultsMessage = message => <div className="no-results">{message}</div>;

export default Drawer;
