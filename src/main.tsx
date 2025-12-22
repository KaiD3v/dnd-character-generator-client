import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CharacterProvider from './providers/character-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </StrictMode>
)
