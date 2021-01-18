import styled from 'styled-components';
import hexToRgb from '../../../utils/hexToRgb';
import BaseButton from '../../../reusables/BaseButton';

export const NominationButton = styled(BaseButton)`
  padding: min(12px, 5%);
  border-radius: 3px;
  border: none;
  background: ${({ theme }) => hexToRgb(theme.baseColor, 0.2)};
  color: ${({ theme }) => theme.baseColor};
  font-weight: var(--xXBold);
  font-size: 1em;
  transition: color 0.3s ease, background 0.3s ease;
  cursor: pointer;

  &:hover,
  &:active {
    background: ${({ theme }) => theme.baseColor};
    color: ${({ theme }) => theme.white};
  }

  &:disabled {
    filter: grayscale(1);
    pointer-events: none;
  }
`;
