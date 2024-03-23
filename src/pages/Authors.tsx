import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Tab1.css'
import { useEffect, useState } from 'react'
import { Author } from '../databases/entities/author'
import { dataSourceAuthor } from '../databases/data-source'
import { add, chevronUpCircle } from 'ionicons/icons'
import { AuthorAddModal } from './AuthorAddModal'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'

export const AuthrosPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  const authorRepository = dataSourceAuthor.getRepository(Author)
  useEffect(() => {
    authorRepository.find().then((result) => {
      console.log(result)
      setAuthors(result)
    })
  }, [])

  const authorItems = authors.map((author) => {
    return <IonItem key={author.id}>name: {author.name}</IonItem>
  })

  const modalTrigger = 'add-modal'
  const onWillDismis = (event: CustomEvent<OverlayEventDetail>) => {
    console.log('onWillDismiss')
    authorRepository.find().then((result) => {
      console.log(result)
      setAuthors(result)
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Authors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>{authorItems}</IonList>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" /> */}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon id={modalTrigger} icon={add}></IonIcon>
          </IonFabButton>
          <AuthorAddModal trigger={modalTrigger} onWillDismiss={onWillDismis} />
          {/* <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={document}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={colorPalette}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={globe}></IonIcon>
            </IonFabButton>
          </IonFabList> */}
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

// export default AuthrosPage
