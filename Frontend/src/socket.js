import io from 'socket.io-client';

let socket;

export const initializeSocket = (userId) => {
  socket = io('http://localhost:8000', {
    transports: ['websocket'],
    query: {
      userId: userId
    }
  });
};

export const getSocket = () => socket;