import io from 'socket.io-client';

const connect = () => {
  return io(`https://${process.env.REACT_APP_API_HOST}`, {
    path: '/websocket'
  })

}
const subscribe = (socket:any, accountName:string, email:string) => {
  socket.emit('subscribe', `${accountName}:${email}`)
}

const unsubscribe = (socket:any, accountName:string, email:string) => {
  socket.emit('unsubscribe', `${accountName}:${email}`)
}

export default { connect, subscribe, unsubscribe }
