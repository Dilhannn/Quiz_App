import * as React from 'react';
import background2 from '../assets/background2.gif';

const styles = {
  position: 'fixed',
  zIndex: '-1',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  opacity: 0.4
};

export default function Background() {
  return (
    <img src={background2} style={styles} />
  );
}
