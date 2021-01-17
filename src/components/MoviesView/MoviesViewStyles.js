import styled from 'styled-components';
import hexToRgb from '../../utils/hexToRgb';

import { m as motion } from 'framer-motion';
import { resultsInfoVariant } from './MoviesViewVariants';
import { defaultPageTransitionVariants } from '../../reusables/framer-variants';

export const MoviesSearchContainer = styled(motion.section).attrs({
  className: 'section-container',
  variants: defaultPageTransitionVariants,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
})`
  &.section-container {
    height: auto;
  }

  position: relative;
  padding: 7% 7% 0 7%;

  .loader {
    top: 50%;
  }
`;

const movieDisplayPadding = '5%';

export const MovieDisplayContainer = styled(motion.div).attrs({
  variants: defaultPageTransitionVariants,
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(250px, calc(100% / 5), 400px), 0.4fr));
  gap: 5em;
  padding: 0 ${movieDisplayPadding};
  grid-auto-flow: dense;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  place-content: center;
  padding-bottom: 40px;
`;

export const ResultInfo = styled(motion.h3).attrs({
  variants: resultsInfoVariant,
})`
  position: relative;
  font-weight: var(--bold);
  width: 100%;
  padding: 0 calc(${movieDisplayPadding});
  text-align: left;
  margin: 10% 0 4% 0;

  span {
    font-weight: var(--regular);
    color: ${({ theme }) => hexToRgb(theme.whiteDark, 0.5)};
    font-size: 0.9em;
  }
`;
