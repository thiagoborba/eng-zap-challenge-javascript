import * as React from 'react';

export const Spacing = props => {
  return (
    <div
      style={{ height: props['height'] ||  undefined }}
      {...props}
    />
  );
}

export default Spacing;
