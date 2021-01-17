import NavBar from '../Nav/Nav';
import Loading from '../../reusables/Loading';
import themeContext from '../../context/themeContext';

import { ThemeProvider } from 'styled-components';
import { Suspense, lazy, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import {
  ExitFeature,
  MotionConfig,
  AnimatePresence,
  GesturesFeature,
  AnimationFeature,
  AnimateLayoutFeature,
} from 'framer-motion';

const MoviesSearch = lazy(() => import('../MoviesView/MoviesView'));

function App() {
  const location = useLocation();
  const [applicationTheme, setTheme] = useState('dark');

  return (
    <ThemeProvider theme={themeContext[applicationTheme]}>
      <MotionConfig
        features={[AnimateLayoutFeature, AnimationFeature, ExitFeature, GesturesFeature]}>
        <NavBar />
        <>
          {/* <AnimatePresence exitBeforeEnter initial={false}> */}
          <Suspense fallback={<Loading fullscreen={true} />}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/">
                <MoviesSearch />
              </Route>
            </Switch>
          </Suspense>
          {/* </AnimatePresence> */}
        </>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
