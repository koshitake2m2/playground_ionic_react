import {
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import './Tab1.css'

export const HomePage: React.FC = () => {
  const pageLinks = ['/tabs', '/authors']

  const pageLinkItems = pageLinks.map((pageLink) => {
    return (
      <IonItem key={pageLink} routerLink={pageLink}>
        page: {pageLink}
      </IonItem>
    )
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>HomePage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">HomePage</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonGrid>
          <IonList>{pageLinkItems}</IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
