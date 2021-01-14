import Search from '../MovieSearch/MovieSearch.js';
import Loading from '../../reusables/Loading';
import themeContext from '../../context/themeContext';

import { ThemeProvider } from 'styled-components';
import { Suspense, lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import {
  ExitFeature,
  MotionConfig,
  AnimatePresence,
  GesturesFeature,
  AnimationFeature,
  AnimateLayoutFeature,
} from 'framer-motion';

const MovieSearch = lazy(() => import('../MovieSearch/MovieSearch.js'));

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={themeContext}>
      <MotionConfig
        features={[AnimateLayoutFeature, AnimationFeature, ExitFeature, GesturesFeature]}>
        <Loading fullscreen={true} />
        {/* <>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Suspense fallback={<Loading fullscreen={true} />}>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/">
                  <MovieSearch />
                </Route>

                <Route path="/nominations">
                  <Nomin
                </Route>
              </Switch>
            </Suspense>
          </AnimatePresence>
        </> */}
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
