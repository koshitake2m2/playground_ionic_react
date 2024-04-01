import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'reflect-metadata'
import { InitializeDataSourceService } from './InitializeDataSourceService'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import { setupIonicReact } from '@ionic/react'

console.log('initializing... at main.tsx')

setupIonicReact()

const initializeDataSources = new InitializeDataSourceService()
initializeDataSources.init().then(() => {
  console.log('initializing done')

  // TODO: いい感じに待ってください. globalなstateで管理する？
  new Promise((r) => setTimeout(r, 1000)).then(() => {
    const container = document.getElementById('root')
    const root = createRoot(container!)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  })
})
