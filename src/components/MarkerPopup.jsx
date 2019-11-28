import React from 'react';

import { ReactComponent as OpenDotIcon } from '../svg/open-dot.svg';

const MarkerPopup = ({ feature }) => {
  const { alias, name, address, isClosed } = feature.properties;

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

const formatAddress = address => {
  const splitAddress = address.split(', ');
  let formattedAddress = splitAddress;

  if (splitAddress.length !== 2) {
    const address1 = [splitAddress[0], splitAddress[1]].join(', ');
    formattedAddress = [address1, splitAddress[2]];
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

export default MarkerPopup;
