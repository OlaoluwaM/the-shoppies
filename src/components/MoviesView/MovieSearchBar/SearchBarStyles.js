import styled from 'styled-components';
import hexToRgb from '../../../utils/hexToRgb';

import { m as motion } from 'framer-motion';
import { searchBarVariant } from './SearchBarVariants';

export const SearchWrapper = styled(motion.div).attrs({
  variants: searchBarVariant,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
})`
  width: 50%;
  padding: min(12px, 1%);
  margin: 0 auto;
  background: ${({ theme }) => hexToRgb(theme.blackDark, 0.4)};
  color: ${({ theme }) => hexToRgb(theme.whiteDark, 0.4)};
  fill: ${({ theme }) => hexToRgb(theme.whiteDark, 0.4)};
  border-radius: 5px;

  form {
    width: 100%;
    display: flex;
    height: 100%;
    transition: color 0.2s ease;

    .year-dropdown {
      flex-grow: 1;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        border-radius: 8px;
        height: 70%;
        background: ${({ theme }) => hexToRgb(theme.grey, 0.5)};
        top: 50%;
        transform: translateY(-50%);
        transition: inherit;
      }

      .dropdown-menu {
        top: 120%;
        border-radius: 5px;
        overflow-x: hidden;
        text-align: center;

        div {
          display: flex;
          justify-content: center;
          padding: 10%;
          margin: 5px;
        }
      }
      .dropdown-control {
        background: inherit;
        color: inherit;
        border: none;
        height: 100%;
        padding: 0%;
        display: flex;
        justify-content: center;
        cursor: pointer;
        align-items: center;
        /* text-transform: lowercase; */

        .dropdown-placeholder {
          margin-right: min(7px, 8%);

          font-weight: var(--regular);
        }

        .dropdown-placeholder + div {
          flex-basis: 10%;
          height: 20px;
          position: relative;

          span {
            width: 40%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
          }
        }
      }
    }

    .text-input-wrapper {
      flex-basis: 80%;
      display: flex;
      flex-direction: row-reverse;

      input,
      button {
        height: 100%;
      }

      input {
        background: transparent;
        flex-grow: 1;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        width: 100%;
        border: none;
        font-weight: var(--regular);
        font-size: 1em;
        padding: 0.7%;
        color: inherit;
        outline: transparent;

        &::placeholder {
          color: ${({ theme }) => hexToRgb(theme.grey, 0.3)};
        }
      }

      button {
        display: flex;
        flex-basis: 15%;
        border: none;
        background: transparent;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        svg {
          width: 20px;
          fill: inherit;
          transition: inherit;
        }
      }
    }
  }

  &:focus-within {
    color: ${({ theme }) => theme.white};
    fill: ${({ theme }) => theme.white};

    .year-dropdown::before {
      background: ${({ theme }) => hexToRgb(theme.white, 0.8)};
    }
  }
`;
