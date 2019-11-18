import React from 'react';

import { ReactComponent as OpenDotIcon } from '../svg/open-dot.svg';

const formatAddress = address => {
  let formattedAddress = address;

  if (address.length !== 2) {
    const address1 = [address[0], address[1]].join(', ');
    formattedAddress = [address1, address[2]];
  }

  return (
    <div className="result-address">
      {formattedAddress.map((part, index) => (
        <div key={index} className={`address-part-${index}`}>
          {part}
        </div>
      ))}
    </div>
  );
};

const MarkerPopup = ({ result }) => {
  const { alias, name, address, isClosed } = result;

  return (
    <div id={`${alias}-marker-popup`}>
      <h3>{name}</h3>
      {!isClosed && (
        <div className="result-open-status">
          <OpenDotIcon /> Open now
        </div>
      )}
      {address.length && formatAddress(address)}
    </div>
  );
};

export default MarkerPopup;
