/*
 * Boilerplate imports
 */
import './index.scss';
import 'material-design-lite';

/*
* Demo of Websocket connector
* (should be removed as part of the submission)
*/
// 1) import the client connector
// -------------------------
import { createClient } from '../lib/websocketConnector';

// 2) Create a client object
// -------------------------
// This will not create a WS connection, but will only
// return an object that controls the opening and closing
// of the connection.
const client = createClient('localhost', 4000);

// 3) At a later point in the implementation we can use the
// -------------------------
// client object to open a connection.
// I.e we now have an active Websocket open
// You can pass in an optional meta object that will be attached to all messages,
// a possible use case is an object identifying the user on the connection.
const connection = client.connect({ name: 'George' });

// 4) Join a channel (ch1) and subscribe to downstream messages.
// -------------------------
// If a channel does not exist one will be created.
// The `downstream` object is of type <Observable>
const channel = connection.join('ch1');
channel.downstream.subscribe({
  next: ({ data }) => {
    if (data.error) {
      console.log('# Something went wrong', data.error);
      return;
    }
    if (data.message === 'ping') {
      console.log('# Sending pong');
      channel.send('pong');
    }
    if (data.message === 'pong') {
      console.log('# Received pong', data);
    }
  },
  error: err => console.log('# Something went wrong', err),
  complete: () => console.log('# Complete')
});

// Ping other connected clients every 5 sec.
const pinging = setInterval(() => channel.send('ping'), 5000);

// Leave channel after 20 sec.
setTimeout(() => {
  clearInterval(pinging);
  channel.leave();
}, 20000);
