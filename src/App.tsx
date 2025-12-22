import { useState } from 'react'
import './App.css'
import { CharacterForm } from './components/character-form'
import { CharacterSheet } from './components/character-sheet'
import { PDFViewer } from '@react-pdf/renderer'
import { useCharacter } from './providers/character-provider'

function App() {
  const [isSend, setIsSend] = useState(false)
  const { character } = useCharacter();

  return (
    <main>
      <h1>D&D Character Generator</h1>
      {!isSend && <CharacterForm isSend={isSend} setIsSend={setIsSend} />}
      {isSend && (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <CharacterSheet character={character} />
        </PDFViewer>
      )}
    </main>
  )
}

export default App
