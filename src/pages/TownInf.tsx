import {
  IonContent,


  IonIcon,


  IonPage,
  IonThumbnail
} from '@ionic/react';
import { camera } from 'ionicons/icons';
import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { TextLg } from '../components/atoms/TextLgComponent';
import { PageHeader } from '../components/molecules/PageHeaderComponent';
import { useStore } from '../hooks/use-store';

export const TownInf: React.FC = () => {
  const { $townInf } = useStore()
  
  return useObserver(() => 
    <IonPage>
      <PageHeader pageTitle="우리마을정보" menuBtn={true} homeBtn={true} userBtn={true}/>
      <IonContent>
        <div className='px-container my-4'>
          <div className='flex-center' slot='start'>
            <IonThumbnail style={{width:'400px', height:'200px'}}>
              <img src={$townInf.getTownInf.profileUrl} alt='프로필이미지'/>
            </IonThumbnail>
            <IonIcon
              style={{position:"absolute", transform:"translate(150px,80px)", color: 'white'}}
              size="large"
              slot='start'
              icon={camera}
            />
          </div>
          <div className='flex-center' slot='end'>
            <TextLg className='text-bold'>{$townInf.getTownInf.name}</TextLg>
          </div>
          <div className="basic-inf mt-8">
            <div className="block flex">
              &nbsp;<TextLg>지역</TextLg>
              <TextLg className="ml-auto mr-8">{$townInf.getTownInf.location}</TextLg>
            </div>
            <div className="block flex">
              &nbsp;<TextLg>마을사람들</TextLg>
              <TextLg className="ml-auto mr-8">{$townInf.getTownInf.townNo}명</TextLg>
            </div>
            <div className="block flex">
              &nbsp;<TextLg>마을관리자</TextLg>
              <TextLg className="ml-auto mr-8">{$townInf.getTownInf.adminNm}</TextLg>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
