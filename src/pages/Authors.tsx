import {
  IonContent,
  IonHeader,
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

export const AuthrosPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  useEffect(() => {
    const authorRepository = dataSourceAuthor.getRepository(Author)
    authorRepository.find().then((result) => {
      setAuthors(result)
    })
  }, [])

  const authorItems = authors.map((author) => {
    return <IonItem key={author.id}>name: {author.name}</IonItem>
  })

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
      </IonContent>
    </IonPage>
  )
}

// export default AuthrosPage
