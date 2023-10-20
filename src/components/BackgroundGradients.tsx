// credit: https://stitches.dev/
import React from 'react';
import { useDarkMode } from 'usehooks-ts';

const VIOLET_GRADIENT =
  'radial-gradient(circle at 15% 50%, hsl(252 40.1% 22.5%), rgba(255, 255, 255, 0) 35%)';
const TEAL_GRADIENT =
  'radial-gradient(circle at 85% 30%, hsl(192 79.3% 12.8%), rgba(255, 255, 255, 0) 35%)';
const NEW_GRADIENT =
  'radial-gradient(circle at 55% 60%, hsl(300 32.3% 15.8%), rgba(255, 255, 255, 0) 35%)';

const BackgroundGradients = () => {
  const { isDarkMode } = useDarkMode();

  if (!isDarkMode) {
    return null;
  }

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 -z-10"
      style={{
        backgroundImage: `${VIOLET_GRADIENT}, ${TEAL_GRADIENT}, ${NEW_GRADIENT}`,
      }}
    />
  );
};

export default BackgroundGradients;
