export const navWrapperVariant = {
  hidden: {
    y: -70,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const trophyVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,
  },

  flip: {
    rotate: 360,
    transitionEnd: { rotate: 0 },
  },
};
