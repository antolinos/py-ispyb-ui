import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Menu from 'pages/menu/menu';
import LoginPage from 'components/login/loginpage';
import { setSite } from 'redux/actions/site';
import sites from 'config/sites';
import EMSessionPage from 'pages/em/emsessionpage';
import MoviesPage from 'pages/em/movie/moviespage';
import SessionsPage from 'pages/sessionspage';
import ProposalsPage from 'pages/proposalspage';
import ShippingPage from 'pages/shippingpage';
import PreparePage from 'pages/preparepage';
import ErrorBoundary from 'components/errors/errorboundary';
import Page from 'pages/page';
import { useAppSelector, useAppDispatch } from 'hooks';
import LoadingPanel from 'components/loading/loadingpanel';

export default function App() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const site = useAppSelector((state) => state.site);

  /** Check if there is a site configured */
  if (!site.authentication.sso.enabled && site.authentication.authenticators.length === 0) {
    /** In case a single site is configured that should be the most of the cases then trigger the actions */
    if (sites.length > 1) {
      dispatch(setSite(sites[0]));
    }
    return <Alert variant="danger">Application is not configured. Site configuration is missing</Alert>;
  }
  if (!user.isAuthenticated) {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Menu />
          <LoginPage />
        </ErrorBoundary>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Menu />
      <Page>
        <Suspense fallback={<LoadingPanel></LoadingPanel>}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<SessionsPage user={user} />} />
              <Route path="/sessions" element={<SessionsPage user={user} />} />
              <Route path="/proposals" element={<ProposalsPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/prepare" element={<PreparePage />} />
              <Route path="/:proposalName/EM/:sessionId" element={<EMSessionPage />} />
              <Route path="/:proposalName/EM/:dataCollectionId/movies" element={<MoviesPage />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </Page>
    </BrowserRouter>
  );
}
