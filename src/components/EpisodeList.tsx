import React from 'react';
import { Link } from 'react-router-dom';
import { parseDate, convertMillistoHMS } from 'helpers/timeRelatedConversions';

interface EpisodeListIProps {
  podcastId: string;
  listEpisodes: Record<string, any>;
}

const EpisodeList = ({ podcastId, listEpisodes }: EpisodeListIProps): JSX.Element => {
  return (
    <div>
      <h4 className="episodes-header">Episodes: {listEpisodes.length}</h4>
      <div className="episodes-list">
        <div>
          <div className="title">Title</div>
          <div className="date">Date</div>
          <div className="duration">Duration</div>
        </div>
        {listEpisodes.map((item: Record<string, any>, key: string) => {
          return (
            <div className="episode-link" key={item + key}>
              <Link to={`/podcast/${podcastId}/episode/${item.trackId}`}>
                <div>{item.trackName}</div>
              </Link>
              <div>{parseDate(item.releaseDate)}</div>
              <div>{convertMillistoHMS(item.trackTimeMillis)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EpisodeList;
