import NavBar from '../Nav/Nav';
import Loading from '../../reusables/Loading';
import themeContext from '../../context/themeContext';

import { ThemeProvider } from 'styled-components';
import { getNominationList } from '../../utils/helpers';
import { default as toast, Toaster } from 'react-hot-toast';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect, useRef } from 'react';
import {
  ExitFeature,
  MotionConfig,
  GesturesFeature,
  AnimationFeature,
  AnimateLayoutFeature,
} from 'framer-motion';

const MoviesSearch = lazy(() => import('../MoviesView/MoviesView'));
const Nominations = lazy(() => import('../NominationView/NominationView'));

export default function App() {
  const location = useLocation();
  const [applicationTheme, setTheme] = useState('dark');
  const timeoutRef = useRef([]);

  useEffect(() => {
    if (getNominationList().size > 0) return;

    const welcomeMessages = [
      'Hello 👋! Welcome to the shoppies',
      'Here you can search for movies and nominate your favorite ones for a shoppie award',
      'Keep in mind however that you can only nominate five movies',
      'That is all the necessary information, happy nominating!',
    ];

    welcomeMessages.forEach((message, ind) => {
      let timeout = setTimeout(() => {
        toast(message, { duration: 4000 });
      }, ind * 5000);

      timeoutRef.current.push(timeout);
    });

    return () => timeoutRef.current.forEach(timeout => clearTimeout(timeout));
  }, []);

  return (
    <ThemeProvider theme={themeContext[applicationTheme]}>
      <MotionConfig
        features={[AnimateLayoutFeature, AnimationFeature, ExitFeature, GesturesFeature]}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: 'toast',
          }}
        />

        <NavBar setTheme={setTheme} />
        <>
          <Suspense fallback={<Loading fullscreen={true} />}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/">
                <MoviesSearch />
              </Route>

              <Route path="/nominations">
                <Nominations />
              </Route>
            </Switch>
          </Suspense>
        </>
      </MotionConfig>
    </ThemeProvider>
  );
}
