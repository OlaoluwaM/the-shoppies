import Moon from '../../reusables/Moon';

import { useEffect } from 'react';
import { trophyVariant } from './NavVariants';
import { m as motion, useAnimation } from 'framer-motion';
import { default as ShoppiesTrophy } from '../../reusables/Trophy';
import { Nav, NavWrapper, LogoWrapper, NominationsLink } from './NavStyles';

function Logo() {
  const trophyControls = useAnimation();

  useEffect(() => {
    trophyControls.set('hidden');
  }, []);

  const showTrophy = async () => {
    return await trophyControls.start('visible');
  };

  const hideTrophy = async () => {
    return await trophyControls.start('hidden');
  };

  const flipTrophy = async () => {
    return await trophyControls.start('flip');
  };

  return (
    <LogoWrapper layout className="logo-wrapper">
      <ShoppiesTrophy variants={trophyVariant} animate={trophyControls} layout />

      <motion.span onHoverStart={showTrophy} onHoverEnd={hideTrophy} onTap={flipTrophy} layout>
        the shoppies
      </motion.span>
    </LogoWrapper>
  );
}

export default function NavBar() {
  return (
    <Nav>
      <NavWrapper>
        <Logo />

        <NominationsLink className="nominations-link"> nominations</NominationsLink>

        <li className="theme-switch">
          <Moon />
        </li>
      </NavWrapper>
    </Nav>
  );
}
