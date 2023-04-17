import React, { useState, useEffect, useRef } from 'react';

interface DetailsProps {
  trackName: string;
  description: string;
  episodeUrl: string;
}

const EpisodeDetails = (props: DetailsProps) => {
  const { trackName, description, episodeUrl } = props;
  const [details, setDetails] = useState<DetailsProps>({
    trackName: '',
    description: '',
    episodeUrl: '',
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setDetails({
      trackName,
      description,
      episodeUrl: episodeUrl,
    });
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [props]);

  return (
    <div className="episode-details">
      <h5>{details.trackName}</h5>
      <div className="description" dangerouslySetInnerHTML={{ __html: details.description }} />
      <audio controls ref={audioRef}>
        <source src={details.episodeUrl} type="audio/mpeg" />
        <p>Your browser does not support HTML5 audio.</p>
      </audio>
    </div>
  );
};

export default EpisodeDetails;
