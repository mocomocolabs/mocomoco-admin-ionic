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
return $ui.getIsHeaderBar ? <div className='m-red'>{message}</div> : <></
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


# 사용자 관련
## 누가 어드민인가
  - USERS 테이블에 보면 ROLES라는 필드가 있음. (일반 사용자, 어드민을 구분해주는듯)



# 어드민 운영
## 기능 관련
  - 어드민은 sign-up이 없다.
  : 관리자 페이지이기 때문에 마을에서 관리자인 사람들은 별도의 채널로 mocomoco팀에게 contact 하여 아이디를 만들고 초기 비밀번호를 설정해준 걸 알려준다.
  : 그 이후 본인이 로그인해서 비밀번호를 바꾸는 식으로 운영한다.




# postman
## 서버 개발자가 정의해놓은 json들을 import 해서 실행한다.
- sign-in 시 발급되는 accessToken을 붙여 넣어서 모든 요청에 붙여 넣어야 함.(Authorization > token)
- 데이터를 수정하고 싶으면 실데이터를 수정하고 revert 하면 됨.
# gradle
> gradle 이 없으면 ./gradlew 를 붙여서 JAVA springboot 에 내장되어있는 gradle을 쓸 수도 있다.
