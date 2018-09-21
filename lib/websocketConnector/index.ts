import * as  websocket from 'websocket';
import { Observable, Subject } from 'rxjs';
import { shareReplay, filter, takeUntil } from 'rxjs/operators';
import { createEventEmitter } from './event_emitter';

/**
 * Creates an observable that, when subscribed to, will emit
 * all messages from the Websocket connection in the next handler.
 * If the client is closed the observable will complete.
 * The observable implements a replay mechanism, so that late subscribers
 * will get past messages as well.
 *
 * @param client
 */
const createDownstreamObservable = (client: websocket.w3cwebsocket): Observable<any> => {
  const { addEventHandler } = createEventEmitter(client);
  const connection = Observable.create((observer) => {
    const next = (ev) => {
      let data;
      try {
        data = JSON.parse(ev.data);
      } catch (e) { }
      observer.next({ data, event: ev });
    };
    const unsubs = [
      addEventHandler('onopen', next),
      addEventHandler('onmessage', next),
      addEventHandler('onerror', ev => observer.error(ev)),
      addEventHandler('onclose', (ev) => {
        next(ev);
        observer.complete();
      })
    ];
    return () => unsubs.forEach(unsub => unsub());
  });

  return connection.pipe(shareReplay());
};

/**
 * Creates object with connection API.
 *
 * @param host
 * @param port
 */
export const createClient = (host: string, port: number) => {
  let client: websocket.w3cwebsocket;
  const backlog = new Set();
  const connect = (client: websocket.w3cwebsocket, meta) => {
    const downstream = createDownstreamObservable(client);
    const send = (channelName: string, message = {}) => {
      let encodedPayload;
      try {
        encodedPayload = JSON.stringify({
          message,
          meta,
          channelName
        });
      } catch (e) {
        throw new Error('INVALID MESSAGE');
      }

      if (client.readyState !== client.OPEN) {
        const lazySend = () => {
          client.send(encodedPayload);
          backlog.delete(lazySend);
        };
        backlog.add(lazySend);
        return;
      }

      client.send(encodedPayload);
    };

    const join = (channelName: string, channelConfig = { maxSize: Number.MAX_SAFE_INTEGER }) => {
      const userLeft = new Subject();
      const channelDownstream = downstream.pipe(
        filter(resp => (
          resp.data && resp.data.channel.name === channelName
        )),
        takeUntil(userLeft)
      );

      const JOIN_EVENT = {
        type: 'JOIN_CHANNEL',
        payload: {
          name: channelName,
          ...channelConfig
        }
      };
      const LEAVE_EVENT = {
        type: 'LEAVE_CHANNEL'
      };

      send(channelName, JOIN_EVENT);

      return {
        /**
         * Send message to channel
         * @param channelName string
         * @param message any
         */
        send: message => send(channelName, message),
        /**
         * Leave channel.
         * Downstream observable will complete.
         */
        leave: () => {
          send(channelName, LEAVE_EVENT);
          userLeft.next(true);
        },
        /**
         * Channel downstream observable.
         * Subscribe to recieve downstream messages.
         */
        downstream: channelDownstream
      };
    };

    /*
        Internal subscription to opening of connections
        and handling messages send before connection was established.
    */
    const backlogSub = downstream
      .pipe(filter(resp => resp.event.type === 'open'))
      .subscribe(() => {
        backlog.forEach(lazySend => lazySend());
        backlogSub.unsubscribe();
      });

    return {
      /**
       * Connection downstream
       * Subscribes to all messages.
       */
      downstream,
      /**
       * Join a named channel
       */
      join
    };
  };

  return {
    /**
     * Close current client connection.
     * Any downstream subscription will complete when client is closed.
     */
    close() {
      if (!client) {
        throw new Error('Client is not connected');
      }
      client.close();
      client = null;
    },
    /**
     * Creates a client connection and returns object for
     * joining, leaving  and sending messages on a specified channel.
     * Takes a `meta` object that will be passed along each message.
     *
     * @param meta
     */
    connect(meta = {}) {
      if (client) {
        throw new Error('Client is already connected');
      }
      client = new websocket.w3cwebsocket(`ws://${host}:${port}/`, ['echo-protocol']);
      return connect(client, meta);
    }
  };
};
