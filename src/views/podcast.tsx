import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import EpisodeDetails from 'components/EpisodeDetails';
import EpisodeList from 'components/EpisodeList';
import { NoPodcastsFoundsLocallyOrOutdated } from 'helpers/arePodcastsValid';
import { Grid } from 'react-loader-spinner';
import { MainContext } from 'components/ContextWrapper';

interface IProps {
  showEpisode?: boolean;
  showListEpisodes?: boolean;
}

const WrapperPodcast = ({ showEpisode, showListEpisodes }: IProps): JSX.Element => {
  const { podcastId, episodeId }: any = useParams();
  const [podcastDetails, setPodcastDetails] = useState({
    attributes: '',
    episodesList: [],
  });
  const [episodeData, setEpisodeData] = useState({
    description: '',
    trackName: '',
    episodeUrl: '',
  });
  const { setIsLoading }: any = useContext(MainContext);

  useEffect(() => {
    setIsLoading(true);
    const podcasts = NoPodcastsFoundsLocallyOrOutdated(podcastId);
    if (podcasts.length === 0) {
      console.log('Fetching ...');

      fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast &entity=podcastEpisode&limit=20`,
        )}`,
      )
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error('Network response was not ok.');
        })
        .then((data) => {
          const parsedData = JSON.parse(data.contents);
          const podcast = {
            attributes: parsedData['results'][0],
            episodesList: parsedData['results'].slice(1),
          };
          localStorage.setItem(
            podcastId,
            JSON.stringify({ podcasts: [podcast], expirationDate: new Date().getTime() }),
          );
          setPodcastDetails(podcast);
          setIsLoading(false);
        });
    } else {
      console.log(
        `This podcast with id ${podcastId} was fetched at least 24h before, NOT fetching data and updating the time ...`,
      );
      localStorage.setItem(podcastId, JSON.stringify({ podcasts, expirationDate: new Date().getTime() }));
      setPodcastDetails(podcasts[0]);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (episodeId && podcastDetails.episodesList.length !== 0) {
      var result: any = podcastDetails.episodesList.find((obj) => {
        return String(obj['trackId']) === String(episodeId);
      });
      setEpisodeData({
        description: result['description'],
        trackName: result['trackName'],
        episodeUrl: result['episodeUrl'],
      });
    }
  }, [podcastDetails, episodeId]);

  if (podcastDetails.episodesList.length === 0) {
    return (
      <div className="loader-wrapper">
        <Grid height="100" width="100" color={'#0d6efd'} ariaLabel="loading" />
      </div>
    );
  } else {
    return (
      <div>
        <div className="podcast flex-direction">
          <Link to={`/podcast/${podcastId}`}>
            <img src={podcastDetails.attributes['artworkUrl100']} />
            <div className="title">{podcastDetails.attributes['collectionName']}</div>
            <div>
              by <span>{podcastDetails.attributes['artistName']}</span>
            </div>
          </Link>
          <div>
            {showListEpisodes && <EpisodeList podcastId={podcastId} listEpisodes={podcastDetails.episodesList} />}
            {showEpisode && <EpisodeDetails {...episodeData} />}
          </div>
        </div>
      </div>
    );
  }
};

export default WrapperPodcast;
