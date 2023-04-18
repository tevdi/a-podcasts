import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PodcastMainItem from 'components/PodcastMainItem';
import { NoPodcastsFoundsLocallyOrOutdated } from 'helpers/arePodcastsValid';
import { Grid } from 'react-loader-spinner';
import { MainContext } from 'components/ContextWrapper';
import { customFetch } from 'helpers/asyncServices';

const filterMinLength = 0;

const PodcastsList = (): JSX.Element => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [filterString, setFilterString] = useState('');
  const { setIsLoading }: any = useContext(MainContext);

  useEffect(() => {
    setIsLoading(true);
    const podcasts = NoPodcastsFoundsLocallyOrOutdated('podcasts-list');
    if (podcasts.length === 0) {
      console.log('Fetching ...');
      customFetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
        )}`,
      ).then((data) => {
        console.log('Fetch completed !');
        const podcasts = JSON.parse(data.contents).feed.entry;
        localStorage.setItem('podcasts-list', JSON.stringify({ podcasts, expirationDate: new Date().getTime() }));
        setIsLoading(false);
        setPodcasts(podcasts);
      });
    } else {
      console.log(
        'The list of the podcasts was fetched at least 24h before, NOT fetching data and updating the time ...',
      );
      localStorage.setItem('podcasts-list', JSON.stringify({ podcasts, expirationDate: new Date().getTime() }));
      setIsLoading(false);
      setPodcasts(podcasts);
    }
  }, []);

  useEffect(() => {
    setFilteredPodcasts(podcasts);
  }, [podcasts]);

  const filterArrayByString = (array, string) => {
    const filteredElementsList: any = [];
    array.filter((element) => {
      if (
        !(
          element['im:artist'].label.toLowerCase().indexOf(string.toLowerCase()) === -1 &&
          element['im:name'].label.toLowerCase().indexOf(string.toLowerCase()) === -1
        )
      ) {
        filteredElementsList.push(element);
      }
    });

    return filteredElementsList;
  };

  const onChangeSearch = (evt) => {
    const filterText = evt.target.value.length >= filterMinLength ? evt.target.value : '';
    setFilterString(evt.target.value);
    if (filterText) {
      setFilteredPodcasts(filterArrayByString(podcasts, filterText));
    } else {
      setFilteredPodcasts(podcasts);
    }
  };

  return (
    <>
      <div className="my-podcasts-wrapper flex-direction">
        <h4>
          My Podcasts: <span className="bold">{filteredPodcasts.length}</span>
        </h4>
        <input
          type="text"
          className="search-bar form-control"
          value={filterString}
          placeholder="Search for ..."
          onChange={onChangeSearch.bind(this)}
        />
      </div>
      {podcasts.length === 0 && (
        <div className="loader-wrapper">
          <Grid height="100" width="100" color={'#0d6efd'} ariaLabel="loading" />
        </div>
      )}
      {podcasts.length !== 0 && (
        <div className="podcasts-grid">
          {filteredPodcasts.map((item, key) => {
            return (
              <div className="item" key={key}>
                <Link to={`/podcast/${item['id']['attributes']['im:id']}`}>
                  <PodcastMainItem data={item} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default PodcastsList;
