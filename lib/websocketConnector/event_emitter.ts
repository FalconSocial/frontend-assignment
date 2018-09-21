import * as  websocket from 'websocket';

interface HandlersObject {
  onopen?: Set<Function>;
  onmessage?: Set<Function>;
  onerror?: Set<Function>;
  onclose?: Set<Function>;
}

const EVENT_NAMES = ['onopen', 'onmessage', 'onerror', 'onclose'];
const createHandlersObject = () => EVENT_NAMES.reduce<HandlersObject>((acc, name) => ({
  ...acc,
  [name]: new Set()
}), {});
const createAddEventHandler = (handlers: HandlersObject) => (name: string, handler) => {
  handlers[name].add(handler);
  return () => handlers[name].delete(handler);
};
const attactHandlers = (client: websocket.w3cwebsocket, handlers) => {
  EVENT_NAMES.forEach((name) => {
    client[name] = (...args) => handlers[name].forEach(handler => handler(...args));
  });
};

export const createEventEmitter = (client: websocket.w3cwebsocket) => {
  const handlers = createHandlersObject();
  attactHandlers(client, handlers);
  return {
    addEventHandler: createAddEventHandler(handlers)
  };
};
