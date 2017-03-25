import React from 'react';
import ReactDOM from 'react-dom';
import Twitter from 'twitter';

export default class App extends React.Component {
  render() {
    // const client = new Twitter({
    //   consumer_key: 'Dl0EU13B6ecJxDyiDl0NXNGkW',
    //   consumer_secret: 'xixpTPbV1BlMWWO8jhx4nO3sxYoloQDjlkdB1x2Sq6ISXOJ4qx',
    //   access_token_key: '845455556500471808-9YsN2Lmh7MskuYZNJ46RAiweDrhoA6G',
    //   access_token_secret: 'WsmMCc8Sw1kNIzKqvktzUSk6044uL9kygRaBTDbvs1Oxu'
    // });


    const bearer_token = 'Bearer AAAAAAAAAAAAAAAAAAAAAPwzzwAAAAAAZmG6j9Go6gscwiilzS7oCoI26s0%3DBzHGeRYLHqE6187abZwsylgZIjn7ErScFWfzTK5wtvP10CeQLw';

    fetch('https://api.twitter.com/search/tweets.json?q=node', {
      method: 'GET',
      header: {
        'Authorization': bearer_token,
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })

    // client.get('favorites/list', (error, tweets, response) => {
    //   console.log(error);
    //   console.log(tweets);  // The favorites.
    //   console.log(response);  // Raw response object.
    // });

    return (
      <div>
        <h1>Hello!</h1>
      </div>
    )
  }
}
