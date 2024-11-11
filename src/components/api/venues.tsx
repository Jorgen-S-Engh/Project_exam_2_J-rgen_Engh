const baseUrl = "https://v2.api.noroff.dev/";

export const getVenues = async () => {
  const response = await fetch(`${baseUrl}holidaze/venues/`);
  const results = await response.json();
  return results.data;
};
