import React from 'react';
import cn from 'classnames';

import OpenStatus from './OpenStatus';
import FilthRating from './FilthRating';

const Drawer = ({ businesses, loading, error, selectedIndex }) => {
  let content;

  if (businesses.length) {
    content = (
      <table className="results-table">
        <tbody>
          {businesses.map((business, index) => {
            const { id, properties } = business;
            const { name, isClosed } = properties;
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
        'results-drawer--no-results': !businesses.length,
      })}
    >
      {content}
    </aside>
  );
};

export default Drawer;
