export const fetchTweets = query => (
  $.ajax({
    method: 'GET',
    url: '/api/search_tweets',
    data: { query },
  })
);
