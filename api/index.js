const WebSocketServer = require('websocket').server;
const http = require('http');

const CHANNEL_FULL_ERROR = { error: 'CHANNEL_FULL' };
const CHANNEL_NOT_DEFINED_ERROR = { error: 'CHANNEL_NOT_DEFINED' };
const JOIN_CHANNEL = 'JOIN_CHANNEL';
const LEAVE_CHANNEL = 'LEAVE_CHANNEL';
const CHANNELS = new Map();

const server = http.createServer(({ response }) => {
    response.writeHead(404);
    response.end();
});

server.listen(4000, () => console.log('API is up an running at port 4000'));

const WS_SERVER = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

const whitelist = ['http://localhost:8080'];
const isValidOrigin = origin => whitelist.includes(origin);

const isJoinChannelEvent = message =>
    (message.type && message.payload && message.type === JOIN_CHANNEL)

const isLeaveChannelEvent = message =>
    (message.type && message.type === LEAVE_CHANNEL)

const leaveAllChannels = (connection) => {
  CHANNELS.forEach((x, channelName) => leaveChannel(channelName, connection));
}
const leaveChannel = (channelName, connection) => {
    const { channel, error } = getChannelByName(channelName);
    if (error) {
      return connection.send(getError(channelName, error));
    }
    channel.connections.delete(connection);
    if (channel.connections.size === 0) {
      CHANNELS.delete(channel);
    }
}
const getChannel = (channelConfig) => {
    if (!CHANNELS.has(channelConfig.name)) {
        CHANNELS.set(channelConfig.name, {
            connections: new Set(),
            ...channelConfig
        });
    }
    return CHANNELS.get(channelConfig.name);
};
const joinChannel = (message, connection) => {
    let channel = getChannel(message.payload);
    if (channel.connections.size === channel.maxSize) {
        return CHANNEL_FULL_ERROR;
    }
    channel.connections.add(connection);
    return { channel };
}
const getChannelByName = channelName => {
  const channel = CHANNELS.get(channelName);
  if (!channel) {
    return CHANNEL_NOT_DEFINED_ERROR;
  }
  return { channel };
};
const getError = (channelName, error) => JSON.stringify({
    channel: { name: channelName },
    ...error
})

WS_SERVER.on('request', request => {
    if (!isValidOrigin(request.origin)) {
        request.reject();
        return;
    };

    const connection = request.accept('echo-protocol', request.origin);

    // Broadcast incoming messages back to other connections on channel
    // First connection to send a JOIN_CHANNEL message, creates the channel
    connection.on('message', (data) => {
        const { message, channelName, meta = {} } = JSON.parse(data.utf8Data);

        if (isJoinChannelEvent(message)) {
          let { error } = joinChannel(message, connection);
          if (error) {
              return connection.send(getError(channelName, error));
          }
        }

        if (isLeaveChannelEvent(message)) {
          leaveChannel(channelName, connection);
        }

        const { error, channel } = getChannelByName(channelName);
        if (error) {
          return connection.send(getError(channelName, error));
        }
        Array.from(channel.connections)
            .filter(con => con !== connection)
            .forEach(con => con.send(JSON.stringify({
                    message, meta,
                    channel: {
                        size: channel.connections.size,
                        name: channelName
                    }
                }
            )));
    });

    connection.on('close', () => leaveAllChannels(connection));
});

