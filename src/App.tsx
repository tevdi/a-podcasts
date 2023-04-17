import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import ContextWrapper, { MainContext } from 'components/ContextWrapper';
import Podcast from 'views/podcast';
import PodcastsList from 'views/podcasts-list';
import 'styles/App.scss';

const basename = process.env.BASENAME || '/';

const AppWrapper = ({ children }) => {
  const { isLoading }: any = useContext(MainContext);

  return (
    <>
      <Link to="/">
        <h1>A Podcasts</h1>
      </Link>
      <div className="content-wrapper">
        <h4>Podcaster</h4>
        <div
          id="loading-light"
          style={{
            background: isLoading ? '#5b98d2' : 'green',
          }}
        />
      </div>
      {children}
    </>
  );
};

const App = () => {
  return (
    <>
      <div className="app-wrapper">
        <ContextWrapper>
          <Router basename={basename}>
            <Routes>
              <Route
                path="/podcast/:podcastId/episode/:episodeId"
                element={
                  <AppWrapper>
                    <Podcast showEpisode />
                  </AppWrapper>
                }
              />
              <Route
                path="/podcast/:podcastId"
                element={
                  <AppWrapper>
                    <Podcast showListEpisodes />
                  </AppWrapper>
                }
              />
              <Route
                path="/"
                element={
                  <AppWrapper>
                    <PodcastsList />
                  </AppWrapper>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ContextWrapper>
      </div>
    </>
  );
};

export default App;
