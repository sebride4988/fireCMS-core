# fireCMS-core

firebase를 활용하는 CMS의 코어

## 특징

- 해당 코어는 리액트 프로젝트의 submodule로 기획되었습니다.
- 코어 자신은 아무것도 할 수 없습니다. 필요한 submodule을 추가적으로 더 이식해야만 합니다.
- 해당 코어는 react-redux를 사용합니다. 따라서 해당 서브모듈을 사용할 경우 추가적인 react-redux 스토어를 쓸 수 없거나 매우 어렵습니다.

## 사용하는 법

`index.tsx`앱 최상단에 아래와 같은 느낌으로 코드를 추가한다.

```typescript
import Analytics from 'fireCMS/analytics';
import Authentication from 'fireCMS/authentication';

const firebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

function App() {
  return (
    <React.StrictMode>
      <FireCMSCore
        firebaseConfig={firebaseConfig}
        services={{
          analytics: Analytics,
          authentication: Authentication,
        }}
      >
        {props.children}
      </FireCMSCore>
    </React.StrictMode>
  );
}
```

## 라이브러리 의존성

- react
- @reduxjs/toolkit
- antd
- firebase
- react-redux
