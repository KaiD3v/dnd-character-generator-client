import { useState } from 'react'
import './App.css'
import { CharacterForm } from './components/character-form'
import { CharacterSheet } from './components/character-sheet'

function App() {
  const [isSend, setIsSend] = useState(false)
  return (
    <main>
      <h1>D&D Character Generator</h1>
      {!isSend && <CharacterForm isSend={isSend} setIsSend={setIsSend} />}
      {isSend && <CharacterSheet />}
    </main>
  )
}

export default App
