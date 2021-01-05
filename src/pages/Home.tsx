import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader, IonCardTitle, IonCheckbox, IonCol, IonContent,
  IonGrid,
  IonHeader,
  IonIcon,

  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { home, personCircle } from 'ionicons/icons';
import { default as React } from 'react';
interface IEvent {
  eventNm?: string;
  date?: string;
}
interface IApvLIst {
  name?: string;
  email?: string;
  reqDate?: string;
  checked?: boolean;
}
export const Home: React.FC = () => {
  const asdf:IEvent[] = [
    { eventNm: '신년행사', date: "2020-01-01"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
    { eventNm: '상철이생일', date: "2020-01-26"},
  ]
  const apvList:IApvLIst[] = [
    {name: '이지혜', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01"},   
    {name: '이지혜', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01"},   
    {name: '이지혜', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01"},   
    {name: '이지혜', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01"},   
    {name: '이지혜', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01"},   
  ]
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} color="dark"></IonMenuButton>
          </IonButtons>
          <IonTitle>HOME</IonTitle>
          <IonButtons slot="end">
            <IonIcon
              slot='end'
              ios={personCircle}
              md={home}
              size="large"
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='px-container'>
          <div style={{marginTop: "20px"}} className="apv-wrap">
            <header>
              <h4 style={{ display: "inline"}}><strong>가입승인을 기다려요</strong></h4>
              <span> 5 / 100</span>
              <IonButton style={{ marginLeft:"60px", transform: "translateY(-10px)" }} size="small" color="dark">승인</IonButton>
            </header>
            <div className="apv-list-wrap" style={{marginLeft:"-5px"}}>
              <IonGrid>
                <IonRow>
                  <IonCol size="1"></IonCol>
                  <IonCol size="2">이름</IonCol>
                  <IonCol size="5">이메일</IonCol>
                  <IonCol size="4">가입신청일</IonCol>
                </IonRow>
                {apvList.map((a, i) =>(
                  <IonRow key={i}>
                    <IonCol size="1" style={{maxWidth: "28px", width:"28px"}}><IonCheckbox style={{width:"23px", height:"23px"}} checked={a.checked} color="dark"/></IonCol>
                    <IonCol size="2" style={{fontSize:"13px"}}>{a.name}</IonCol>
                    <IonCol size="5" style={{fontSize:"13px"}}>{a.email}</IonCol>
                    <IonCol size="4" style={{fontSize:"13px"}}>{a.reqDate}</IonCol>
                  </IonRow>
                ))}
              </IonGrid>
            </div>
          </div>
          <br />
          <div className="month-event-wrap">
            <header style={{ marginBottom: "-30px"}}>
              <h4>
                <strong style={{ display: "inline-block"}}>
                  이번달 우리마을 일정
                </strong>
              </h4>
            </header>
            <br/>
              {/* <IonList>
                {asdf.map((v, i) => (
                  <IonItem key={i}>
                    <IonLabel>
                    {v.date} { v.eventNm }
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList> */}
              <div className="month-event-list-wrap" style={{marginLeft: "-5px"}}>
                <IonList>
                  {asdf.map((v, i) => (
                    <IonCard key={i} style={{marginBottom: "-10px"}}>
                      <IonCardHeader>
                        {/* <IonCardSubtitle>{v.date}</IonCardSubtitle> */}
                        <IonCardTitle style={{fontSize: "14px"}}>
                          {v.date} &nbsp;&nbsp;&nbsp;&nbsp;{v.eventNm}
                        </IonCardTitle>
                      </IonCardHeader>

                      {/* <IonCardContent>
                        Keep close to Nature's heart... and break clear away, once in awhile,
                        and climb a mountain or spend a week in the woods. Wash your spirit clean.
                      { v.eventNm }
                      </IonCardContent> */}
                    </IonCard>
                  ))}
                </IonList>
              </div>
          </div>
          {/* <NewsSearch />
          <NewsList /> */}
        </div>
      </IonContent>
    </IonPage>
  )
}
