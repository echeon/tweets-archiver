export const fetchTweets = query => (
  $.ajax({
    method: 'GET',
    url: '/api/search_tweets',
    data: { query },
  })
);

export const downloadTweets = query => (
  $.ajax({
    method: 'GET',
    url: '/api/download_tweets',
    data: { query },
    success: (data) => {
      debugger
    }
  })
)
