import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Tab1.css'
import { useEffect, useState } from 'react'
import { Author } from '../databases/entities/author'
import { dataSourceAuthor } from '../databases/data-source'

const Tab1: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  useEffect(() => {
    const authorRepository = dataSourceAuthor.getRepository(Author)
    authorRepository.find().then((result) => {
      setAuthors(result)
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        first author name: {authors[0] && authors[0].name}
      </IonContent>
    </IonPage>
  )
}

export default Tab1
