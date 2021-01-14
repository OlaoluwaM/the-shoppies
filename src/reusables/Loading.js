import PropTypes from 'prop-types';
import PopcornSVG from './Popcorn';

import { m as motion } from 'framer-motion';
import { default as styled, css } from 'styled-components';

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren' },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const popcornVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    scale: 1,
  },

  visible: {
    y: 0,
    opacity: 1,
    scale: [1, 1.1, 1],
    transition: {
      type: 'spring',
      delay: 0.2,
      scale: { repeat: Infinity, repeatType: 'mirror', delay: 0.5 },
    },
  },

  exit: {
    opacity: 0,
    scale: 1,
    y: 20,
  },
};

const Overlay = styled(motion.div).attrs({
  'data-testid': 'loader',
  variants: variants,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  key: 'overlay',
  className: 'loader',
})`
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;

  .popcorn-loader {
    width: auto;
    display: flex;
    justify-content: center;
    position: relative;

    svg {
      position: inherit;
      height: auto;
      width: min(25%, 100px);
    }
  }

  ${({ isFullscreen }) =>
    isFullscreen
      ? css`
          position: fixed;
          height: 100%;
        `
      : css`
          position: absolute;
          height: 45%;
        `}
`;

export default function Loading({ fullscreen = false, layoutId, children }) {
  const layoutObj = layoutId ? { layoutId } : { layout: true };

  return (
    <Overlay isFullscreen={fullscreen} {...layoutObj}>
      {children ?? <PopcornSVG variants={popcornVariants} layout className="popcorn-loader" />}
    </Overlay>
  );
}

Loading.propTypes = {
  fullscreen: PropTypes.bool,
  layoutId: PropTypes.string,
  children: PropTypes.element,
};
