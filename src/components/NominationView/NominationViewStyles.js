import styled from 'styled-components';
import hexToRgb from '../../utils/hexToRgb';

import { m as motion } from 'framer-motion';
import { NominationButton } from '../MovieDisplay/NominationButton/NominationButtonStyles';
import { MovieDisplayContainer } from '../MoviesView/MoviesViewStyles';

export const NominationDisplayContainer = styled(MovieDisplayContainer)`
  margin-top: 4%;
`;

export const RemoveNominationButtonComponent = styled(NominationButton)`
  color: ${({ theme }) => theme.error};
  background: ${({ theme }) => hexToRgb(theme.error, 0.2)};

  &:hover,
  &:active {
    background: ${({ theme }) => theme.error};
    color: ${({ theme }) => theme.white};
  }
`;
