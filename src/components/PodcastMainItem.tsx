import React from 'react';

const PodcastsList = (props): JSX.Element => {
  return (
    <>
      <img src={props.data['im:image'][2].label} />
      <span className="podcast-title">{props.data['im:name'].label}</span>
      <span>Author: {props.data['im:artist'].label}</span>
    </>
  );
};

export default PodcastsList;
