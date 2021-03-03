# Ionic

## 시점

- 페이지 마운트시 
> vue에서 mounted()
```
  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })
```
- 페이지 나갈 때
> vue에서 beforeDestroyed()
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
  : 처음 로그인을 하면 둘 다(refreshToken, accessToken)을 발급해주고,
  매번 http 통신시 accessToken을 붙여서 요청을 보내면 서버에서 다시 또 두개를 발급해줌.
  : refreshToken의 유효기간은 2주, accessToken은 1시간이라고 치고.
  : 1시간이 지나서 accessToken의 유효기간이 끝나면 서버에서 만료된 걸 알고 만료됐다고 알려줌. 그러면 숨겨왔던 refreshToken을 꺼내들고 accessToken을 다시 발급해달라고 요청함.
  : 다시 accessToken이 생김.