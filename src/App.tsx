import { useState } from 'react'
import './App.css'
import { CharacterForm } from './components/character-form'

function App() {
  const [isSend, setIsSend] = useState(false)
  return (
    <main>
      <h1>D&D Character Generator</h1>
      {!isSend && <CharacterForm isSend={isSend} setIsSend={setIsSend} />}
      {isSend && <p>Character submitted successfully!</p>}
    </main>
  )
}

export default App
