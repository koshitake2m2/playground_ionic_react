import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Tab1.css'
import { useEffect, useRef, useState } from 'react'
import { Author } from '../databases/entities/author'
import authorDataSource, { dataSourceAuthor } from '../databases/data-source'
import { add, chevronUpCircle } from 'ionicons/icons'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'

interface AuthorAddModalProps {
  trigger: string
  onWillDismiss: (event: CustomEvent<OverlayEventDetail>) => void
}

export const AuthorAddModal: React.FC<AuthorAddModalProps> = ({
  trigger,
  onWillDismiss,
}) => {
  const modal = useRef<HTMLIonModalElement>(null)
  const input = useRef<HTMLIonInputElement>(null)
  // const queryRunner = authorDataSource.dataSource.createQueryRunner()

  const [authors, setAuthors] = useState<Author[]>([])
  useEffect(() => {
    const authorRepository = dataSourceAuthor.getRepository(Author)
    authorRepository.find().then((result) => {
      setAuthors(result)
    })
  }, [])

  const onClickConfirm = async () => {
    const authorRepository = dataSourceAuthor.getRepository(Author)
    const newAuthor = new Author()
    newAuthor.name = `${input.current?.value ?? ''}`
    newAuthor.email = `${newAuthor.name}@example.com`
    // await queryRunner.connect()
    // await queryRunner.startTransaction()

    const createdAuthor = await authorRepository.save(newAuthor)
    // await queryRunner.commitTransaction()
    // await queryRunner.release()

    console.log('createdAuthor', createdAuthor)
    await modal.current?.dismiss()
  }

  return (
    <IonModal ref={modal} trigger={trigger} onWillDismiss={onWillDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Add</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={onClickConfirm}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Enter your name"
            labelPlacement="stacked"
            ref={input}
            type="text"
            placeholder="Your name"
          />
        </IonItem>
      </IonContent>
    </IonModal>
  )
}
