import React from 'react';
import cn from 'classnames';

import OpenStatus from './OpenStatus';
import FilthRating from './FilthRating';

const Drawer = ({
  results,
  loading,
  error,
  highlightedFeatureId,
  showFeaturePopup,
  hideFeaturePopup,
}) => {
  let content;

  if (results.length) {
    content = (
      <table className="results-table">
        <tbody>
          {results.map(business => {
            const { id, alias, name, isClosed } = business.properties;
            const isSelected = highlightedFeatureId === id;
            return (
              <tr
                key={alias}
                className={cn('results-table-row', {
                  'results-table-row--selected': isSelected,
                })}
                onMouseEnter={() => showFeaturePopup(business)}
                onMouseLeave={hideFeaturePopup}
              >
                <td>
                  <h3>{name}</h3>
                  <div className="results-table-row__footer">
                    <FilthRating business={business} />
                    <OpenStatus isClosed={isClosed} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else if (loading) {
    content = 'Loading...';
  } else if (error) {
    content = 'Error retrieving results';
  } else {
    content = 'No filth for you';
  }

  return (
    <aside
      className={cn('results-drawer', {
        'results-drawer--no-results': !results.length,
      })}
    >
      {content}
    </aside>
  );
};

export default Drawer;
