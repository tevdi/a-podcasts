export const NoPodcastsFoundsLocallyOrOutdated = (key: string) => {
  let podcastsList = [];
  const getPodcastsFromLS = localStorage.getItem(key);
  if (getPodcastsFromLS) {
    const parsedPodcastsFromLS = JSON.parse(getPodcastsFromLS);
    const hoursAfterLastCheck = Math.floor(Math.abs(new Date().getTime() - parsedPodcastsFromLS.expirationDate) / 36e5);
    if (hoursAfterLastCheck <= 24) {
      podcastsList = parsedPodcastsFromLS.podcasts;
    }
  }
  return podcastsList;
};
