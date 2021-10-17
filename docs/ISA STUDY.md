# Ionic

## 시점

- 페이지 마운트시 
> vue에서 mounted()
> useIonViewWillEnter가 useEffect보다 먼저임.
```
  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })
```
- 페이지 나갈 때
> vue에서 beforeDestroyed()
> 어드민에서는 PageHeader영역을 토글하는 것이외에도 프롭스(예: 메뉴명)을 내려주는 구조이기 때문에 보여줄 때에도 Return 영역에 기재를 해야 한다.
```  
  useIonViewWillLeave(() => {
    $ui.setIsBottomTab(true)
  })
```

# Store

## 활용 가이드

- 반복되는 UI코드를 스토어에서 제어

> 화면에서의 제어
```
import { useStore } from '../hooks/use-store'
const { $ui, $user } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsHeaderBar(false)
  })

  useIonViewWillLeave(() => {
    $ui.setIsHeaderBar(true)
  })
```

> 실제 보여질지 말지 하는 컴포넌트에서는 요런식으로
```
return $ui.getIsHeaderBar ? <div className='m-red'>{message}</div> : <></>
```




# 로그인 방식(JWT)

## accessToken, refreshToken
  > src > services > auth-store.ts 참고
  > accessToken은 프론트에서 암호화해서 스토어에 저장함.(읽기전용/ constant)
  : 처음 로그인을 하면 토큰 2개(refreshToken, accessToken)를 발급해주고,
  매번 http요청시 accessToken을 붙여서 요청을 보내면 서버에서 accessToken이 기간 만료가 되지 않았는지 확인한다.
  : refreshToken의 유효기간은 2주, accessToken은 1시간이라고 한다면,
  : 1시간이 지나서 accessToken의 유효기간이 끝났는데 http요청을 했을 경우, 서버에서 만료됐다고 알려줌. 그러면 숨겨왔던 refreshToken을 꺼내들고 accessToken을 다시 발급해달라고 요청함. 
  : 다시 accessToken이 생김.
  >클라이언트 쪽에서 알아서 만료되면 accessToken을 먼저 달라고 하는 경우도 있다는데 mocomoco는 그렇게 안 해놓음. 이런 인증 방식은 정하기 나름임. accessToken만 매번 http요청시 새로 발급 받을 수도 있음.

## 토큰 관련 DB
  - (http://localhost:8080/api/sys/users) USERS 테이블에 보면 FCM_TOKEN이라는 필드가 있음.

## 로그인 순서
- GuardRoute로 씌워져있는 Route들은 로그인 한 사람만 볼 수 있도록 되어있음. ($auth.isLogin을 바라보다가 false가 되는 순간 /sign-in 페이지로 라우팅함.)
- App.tsx에서 useEffect 시점에 init()을 호출하고 그 안에서 await Promice.all로 $auth.signInWithToken으로 사용자를 검증함.
- 새로고침을 할 때마다 $auth.siginInWithToken으로 accessToken을 확인한 후, 로그인 상태를 유지시킬 것인지를 판단함. 에러가 catch되면 refreshToken으로 다시 권한을 셋.




# 어드민 운영
## 기능 관련
  - 어드민은 sign-up이 없다.
  : 일단 App과 같은 user db를 사용한다. users컬럼에 roles에 보면 'ADMIN'인지 일반사용자인지, 'SYSTEM'인지를 구분할 수 있다. 일단 그걸로 사용한다.
  : 일반 사용자들은 AdMIN에 로그인을 할 수 있지만 roles가 'ADMIN'이상이 아니면 접근할 수 있는 데이터가 없도록 코딩하면 된다.

  - 어드민에서는 일단 로그인한 사람의 정보를 수정할 수 없다. (추후 개발 논의) 앱에서 할 수 있기 때문. 일단 중요한 것부터 개발.




# 프론트에서의 암/복호화
## inko
- https://www.npmjs.com/package/inko/v/1.0.6?activeTab=readme
- 비밀번호의 경우, 한글로 입력한 input에 대하여 영문화를 진행한다.
```
import Inko from 'inko'
const inko = new Inko()
inkop.ko2en(password) // 한국어를 영어로 변환.
```



# DB
## postman
- 개발 단계에서는 서버를 올렸다가 내리면 DB가 cleansing 되게 해 놨다.
- postman으로 DB에 데이터를 넣을 수 있다.
- 회원가입 테스트를 하려면 communities 테이블에 community를 먼저 추가해야 user를 등록할 수 있다.
- gradle bootRun을 하지 않으면 DB를 볼 수 없다.

## 개발 단계에서의 순서
```
- gradle bootRun
(... db create ...)
- create communities
- sign-up
- sign-in
- 어드민 유저셋: COMMUNITY-USERS에서 ROLE = 'ROLE_ADMIN'으로 변경 
```



# 하마 어드민 개발노트
## 스토어의 분리
- auth 스토어: 로그인 한 사람에 대한 스토어
- user 스토어: 로그인 한 사람 이외의 모든 사람을 대상으로 하는 스토어
## 누가 어드민인가
- USER 테이블에 roles는 서버에서 체크하는 필드이므로 화면에서 볼 필요 없음.
```
어드민: COMMUNITY-USERS > ROLE = 'ROLE_ADMIN'
일반사용자: COMMUNITY-USERS > ROLE = 'ROLE_USER'
```

- 특정 커뮤니티에 대한 정보 가져오기
> GET `/v1/communities/1` 

adminUsers[] => 1번 커뮤니티의 어드민 유저 정보,
userCount:number => 1번 커뮤니티의 총 가입자 수,
users[] => 1번 커뮤니티의 모든 유저 정보

> 일단 관리자는 1명이라고 생각하고 개발.
> SYS 계정은 차후에 개발.


# 메모
## fcmToken
- 모바일에 푸쉬할 때 필요한 토큰. (알림 같은 거)

## community Id가 2인 커뮤니티의 정보를 가져온다.
> url
http://localhost:8080/api/v1/communities/1
> return value
이 커뮤니티에 가입한 userCount랑 users리스트도 가져온다.



## 코딩 패턴
```
 return useObserver(() =>
     $home.getApvList.map({
       pending: () => {
         return (
           <div>안뇽</div>
         )
       },
       resolved: () => (
         <div>하세요</div>
       )
     })
   )
```

## memo 
// 로그인 되기 전: http.post

// 로그인 이후: api.post
// accessToken, refreshToken이 set이 되어야 api-service.setAuthoriationBy() 가 호출되고 그 이후에 api.get을 사용할 수 있음.

