import styled from 'styled-components';

import { m as motion } from 'framer-motion';
import { navWrapperVariant } from './NavVariants';

export const Nav = styled.nav`
  width: 100%;
  height: 10vh;
  padding: 10px;
  position: relative;
  background: transparent;
`;

export const NavWrapper = styled(motion.ul).attrs({
  variants: navWrapperVariant,
  initial: 'hidden',
  animate: 'visible',
})`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0 2%;

  li {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;

    a {
      color: inherit;
      text-decoration: none;
      transition: font-weight 0.4s ease;
      text-transform: lowercase;

      &.active {
        font-weight: var(--xBold);
      }
    }
  }
`;

export const LogoWrapper = styled(motion.li)`
  display: flex;
  align-items: center;
  flex-basis: auto;
  overflow: hidden;
  flex-basis: 20%;

  div {
    display: flex;
    justify-content: center;
    margin-right: min(10px, 7%);

    svg {
      width: 25px;
      height: auto;
    }
  }

  span {
    font-weight: var(--xXBold);
    color: ${({ theme }) => theme.baseColor};
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
`;

export const SearchPageLink = styled.li`
  margin-left: auto;
  font-weight: var(--regular);
`;

export const NominationsLink = styled.li`
  margin: 0 4%;
  font-weight: var(--regular);

  & + li.theme-switch {
    flex-basis: auto;

    div {
      display: flex;
      justify-content: flex-end;
    }

    & svg {
      width: 30px;
      height: auto;
    }
  }
`;
