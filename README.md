## Doop 아기들을 위한.. ~.~

## 20250711
**수정사항**
- 메일 중복관리 설정 : firebase 함수에서 자동으로 중복처리함
- GET/POST 방식 : firebase에서 자동으로 POST방식 설정
**추가기능**
- 로그인시 firestore에 정보(문서) 저장되도록 함
  => uesr 문서 : 회원가입한 email, level (초기레벨 1), ownedFurnitures 컬렉션 자동생성
- furnitures 컬렉션
  : 앱 전체 가구를 포함하는 furnitures 컬렉션
  : 사용자 개별 ownedFurnitures 컬렉션 (회원가입시 생성)
  소유하게된 가구는 ownedFurnitures 컬렉션에 추가
**피드백**

## 파일 정리
- src : 기능 포함 파일
    App.js = auth파일 내부 js파일 불러오는 역할
    auth : 내부에 회원가입/로그인/로그아웃/회원탈퇴 등 모든 기능 포함 파일
        Login.js = 로그인 관리
        LogoutButton.js = 로그아웃 관리 (버튼으로 제작해뒀음)
        SignUp.js = 회원가입 관리
        WithDraw.js = 회원탈퇴 관리 * firebase의 경우 오래된 계정은 재로그인 - 회원탈퇴 절차 필요
        checkSession.js = 로그인 상태관리, 한 번 로그인하고 다시 들어가면 로그인 상태 유지되어있음
        **html에 해당하는 부분은 주석처리해둠, 필요하면 주석처리풀고 실행해보기(테스트)**


## 사용 방법
1) my-todo-app 파일 내부에 .env.local 생성
- 깃허브에 코드를 올려도 Firebase API 키 같은 중요한 정보는 노출되지 않도록!
  .env.local에 들어갈 내용은 카톡으로 전송해두겠습니당
**- 사용한 .env.local 파일은 깃허브에 절대 올리지 말것!!!!**

2) npm
- VS code 터미널 or 명령프롬포트에서 npm install
- npm start => 브라우저에서 접속 가능


## 참고사항
CRA(Creat React App)로 부스트랩 되었음  *CRA=초기셋팅도구
기본적으로 React Hooks(문법) + Firebase SDK(라이브러리) 사용
상태관리는 useState / onAuthStateChanged로 수행됨
