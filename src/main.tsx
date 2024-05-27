import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from '@/routes/index.tsx'
import {isChrome} from '@/platforms/index.ts'

ReactDOM.createRoot(document.getElementById('PIPE-ROOT')!).render(
  <React.StrictMode>{isChrome() ? <App /> : <Provider />}</React.StrictMode>,
)
