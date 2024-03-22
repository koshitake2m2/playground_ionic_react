import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'

import { AuthrosPage } from './pages/Authors'
import { HomePage } from './pages/Home'
import { TabsPage } from './pages/Tabs'

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/" component={HomePage} />
        <Route path="/tabs" component={TabsPage} />
        <Route path="/authors" component={AuthrosPage} />
        <Redirect from="*" to="/" />
      </IonReactRouter>
    </IonApp>
  )
}

export default App
