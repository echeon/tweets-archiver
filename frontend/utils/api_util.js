export const fetchTweets = data => (
  $.ajax({
    method: 'GET',
    url: '/api/search_tweets',
    data,
  })
);

export const downloadTweets = data => (
  $.ajax({
    method: 'GET',
    url: '/api/download_tweets',
    data,
    success: (data) => {
      debugger
    }
  })
)
