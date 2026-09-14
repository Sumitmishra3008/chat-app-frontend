import { useState,useRef , useEffect} from 'react'
import './App.css'

function App() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  function sendMessage() {
    if (ws && inputRef.current) {
      ws.send(inputRef.current.value)
    }
  }
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080')
    setWs(socket);
    socket.onopen = () => {
      console.log('WebSocket connection established')
    }
    socket.onmessage = (event) => {
      console.log('Received message:', event.data)
    }
  }, [])


  return (
    <div>
      <input type="text" placeholder="send ping " ref={inputRef} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
