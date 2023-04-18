export const customFetch = (url: string) => {
  return fetch(url).then((response) => {
    if (response.ok) return response.json();
    throw new Error('Network response was not ok.');
  });
};
