import styled from 'styled-components';
import hexToRgb from '../../utils/hexToRgb';

import { m as motion } from 'framer-motion';
import { movieDisplayVariant } from './MovieDisplayVariants';

export const MovieDisplayContainer = styled(motion.div).attrs({
  variants: movieDisplayVariant,
})`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  cursor: pointer;

  img,
  .default-poster {
    flex-basis: 90%;
    border-radius: 7px;
  }

  img {
    max-width: 100%;
    height: auto;
    object-fit: fill;
    object-position: top;
  }

  .default-poster {
    background: ${({ theme }) => hexToRgb(theme.whiteDark, 0.4)};
    padding: min(5%, 20px);
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 65%;
      fill: ${({ theme }) => hexToRgb(theme.black, 0.4)};
      height: auto;
    }
  }
`;

export const MovieInfoWrapper = styled(motion.div)`
  width: 100%;
  flex-grow: 1;
  align-self: flex-start;

  h4 {
    font-size: var(--base);
    color: ${({ theme }) => theme.white};
    margin: 10px 0 0 0;
  }

  p {
    margin: 5px 0;
    font-weight: var(--medium);
    color: ${({ theme }) => hexToRgb(theme.greyDark, 0.2)};
  }
`;
