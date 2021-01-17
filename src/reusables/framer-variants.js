export const defaultPageTransitionVariants = {
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.1 },
  },

  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};
