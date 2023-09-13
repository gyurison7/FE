# Memory Mingle

### 1. 프로젝트 소개👪

#### 우리만의 순간을 담아 공유하는 추억 앨범 서비스
함께한 순간의 소중함을 간직하고 싶으신가요? 카톡으로는 찾아보기 힘들고, 인스타그램에는 공개하기가 어려워 숨겨진 추억들… 저희 Memory Mingle은 그 소중한 순간을 보관하고 오로지 함께한 친구들과만 나눌 수 있는 특별한 추억 앨범 서비스입니다. 단순한 사진 저장이 아닌, 의미 있는 추억의 공간을 함께 만들어보세요!
<br />
<br />


### 2. 개발 환경⚙️

[![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3.org/html/) [![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html) [![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/) [![React Query](https://img.shields.io/badge/React_Query-%2300C7B7.svg?style=for-the-badge&logo=react-query&logoColor=white)](https://react-query.tanstack.com/) [![Recoil](https://img.shields.io/badge/Recoil-%2361DAFB.svg?style=for-the-badge&logo=recoil&logoColor=white)](https://recoiljs.org/) [![styled-components](https://img.shields.io/badge/styled--components-%23DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/) [![Axios](https://img.shields.io/badge/Axios-%2300A8FF.svg?style=for-the-badge&logo=axios&logoColor=white)](https://github.com/axios/axios) [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/) [![Cloudinary](https://img.shields.io/badge/Cloudinary-%2393A5F3.svg?style=for-the-badge)](https://cloudinary.com/) [![AWS](https://img.shields.io/badge/AWS-%23232F3E.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/) [![Route 53](https://img.shields.io/badge/Route%2053-%232D7FF.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/route53/) [![CloudFront](https://img.shields.io/badge/CloudFront-%23232F3E.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/cloudfront/) [![S3 Bucket](https://img.shields.io/badge/S3%20Bucket-%235699D7.svg?style=for-the-badge&logo=amazon-s3&logoColor=white)](https://aws.amazon.com/s3/)
<br />
<br />


### 3. 프로젝트 관련 링크

🔗 [서비스 바로가기](https://memorymingle.shop/)

🔗 [팀 노션 바로가기](https://brass-result-164.notion.site/5-S-A-MemoryMingle-9286b897c31947e0aa144fdcf521d46f?pvs=4)

🔗 [백엔드 깃허브 바로가기](https://github.com/MemoryMingle/BE)
<br />
<br />


### 4. 주요 기능📷

#### 앨범 만들기 / 친구 초대
![](https://github.com/MemoryMingle/FE/assets/135217349/1f63d4a4-8cef-44c7-906a-a066a0820396)
![](https://github.com/MemoryMingle/FE/assets/135217349/e72dea65-a438-4da5-947d-a4a54f2d6c10)
<br/>

#### 앨범 상세 보기 / 카카오톡 공유하기
![](https://github.com/MemoryMingle/FE/assets/135217349/868865de-cbd0-441f-9c54-0e94eba89127)
![](https://github.com/MemoryMingle/FE/assets/135217349/0d386f75-2bae-40ba-b830-df28980771e5)
<br/>

#### 날짜, 앨범명, 장소 검색
![Cap 2023-09-07 16-34-00-745](https://github.com/MemoryMingle/FE/assets/135217349/78d62342-abf1-47ed-b950-d80a559998d9)
![Cap 2023-09-07 16-34-08-719](https://github.com/MemoryMingle/FE/assets/135217349/f7968e01-d613-4184-937d-fe47544eb42a)

#### 이미지 크롭 기능 / 회원 탈퇴
![Cap 2023-09-07 16-36-45-799](https://github.com/MemoryMingle/FE/assets/135217349/2cf6fa6e-52c3-4950-acf8-22ccc214445e)
![Cap 2023-09-07 16-36-52-394](https://github.com/MemoryMingle/FE/assets/135217349/678b6378-d7fa-4b42-b344-aaecdd45dd71)
<br/>
<br/>


### 5. 서비스 아키텍쳐🛠️
![service](https://github.com/MemoryMingle/FE/assets/135217349/dadc4ff3-8f13-45a5-8a36-f01f9f394f2d)
<br/>
<br/>


### 6. 기술적 의사 결정💡
| 사용 기술             | 기술 설명                                                                                                                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Recoil** | Recoil을 선택한 주요 이유는 그 간결성과 사용자 친화적인 특성 때문입니다. Redux와 같은 다른 상태 관리 도구와 비교했을 때, Recoil은 의존성 기반 구독 시스템을 통해 자동으로 아톰과 선택자(Selector) 간의 관계를 최적화합니다. 이로 인해 필요한 컴포넌트만 재렌더링되어 유연하고 효율적인 상태 관리가 가능합니다.                                                                                     |
| **React-Query**            | Redux 혹은 Rocoil을 이용한 비동기 처리는 서버 데이터 관리에 있어 코드의 복잡성과 길이가 증가합니다. 반면, React Query는 데이터 패칭, 캐싱, 동기적 처리, 그리고 업데이트를 보다 효과적으로 처리해줍니다. 또한 Redux나 Recoil에 비해 코드가 상당히 짧고 간결하므로 코드 가독성을 높일 수 있습니다. 이러한 장점들로 인해 React Query를 선택하게 되었습니다.                                                                                                            |
| **Axios**             | Fetch와 비교하여 Axios는 데이터를 JSON으로 변환하는 별도의 과정 없이 직접적으로 data object를 간단하게 반환시켜 줍니다. 또한 Axios는 비동기 HTTP 통신을 지원하며, 반환된 결과를 promise를 객체로 제공하여 응답 데이터를 다루기가 쉽습니다. 이러한 이유로 Axios를 선택하게 되었습니다.                                                                                                                                                                                 
| **Cloudinary**       | Cloudinary는 이미지 및 미디어 자료를 자동으로 최적화하여 웹 페이지 로딩 속도를 높이고, 사용자 경험을 향상시킵니다. 또한 이미지 크기 조정, 포맷 변환, 압축 등의 기능이 제공되어 사용자가 빠르게 컨텐츠를 로드할 수 있도록 도와줍니다. 이러한 이점들로 인해 Cloudinary를 선택하게 되었습니다.|

<br/>
<br/>


### 7. 담당 업무🧑‍💻

|  팀원  | Github                                       | 담당 업무                                                                                                                           |
| :----: | :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
|  손규리  | [🔗gyurison7](https://github.com/gyurison7) | 시작페이지 Carousel 구현, 로그인/회원가입 구현, 카카오 소셜 로그인 구현, 마이페이지/비밀번호 변경 페이지 구현, 이미지 크롭 기능 구현, 회원탈퇴 구현                                                                         |
|  Moses  | [🔗mmms2000](https://github.com/mmms2000)     | 메인페이지 구현, 앨범 만들기/수정하기 페이지 구현, 날짜/앨범/장소 검색 구현 |
|  Khusan  | [🔗khu107](https://github.com/Haegnim)         | 스크롤에 따른 다이나믹 헤더 구현, 앨범 자세히 보기 페이지 구현, 게시글 올리기/수정하기 구현, 댓글 구현, 푸터 구현                                             |

<br/>
<br/>


### 8. 폴더구조📂
```
📦src
 ┣ 📂api
 ┃ ┣ 📜auth.js
 ┃ ┣ 📜groupMainApi.js
 ┃ ┣ 📜index.jsx
 ┃ ┣ 📜postMainApi.js
 ┃ ┗ 📜searchApi.js
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┃ ┗ 📜PretendardVariable.woff2
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📜background.png
 ┃ ┃ ┣ 📜introduction1.png
 ┃ ┃ ┣ 📜introduction2.png
 ┃ ┃ ┣ 📜introduction3.png
 ┃ ┃ ┣ 📜introduction4.png
 ┃ ┃ ┗ 📜introduction5.png
 ┣ 📂components
 ┃ ┣ 📂commentDropdown
 ┃ ┃ ┗ 📜CommentDropDown.jsx
 ┃ ┗ 📂common
 ┃ ┃ ┣ 📂avatar
 ┃ ┃ ┃ ┗ 📜Avatar.jsx
 ┃ ┃ ┣ 📂button
 ┃ ┃ ┃ ┣ 📜Button.jsx
 ┃ ┃ ┃ ┗ 📜PlusButton.jsx
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┗ 📜Comment.jsx
 ┃ ┃ ┣ 📂dropdown
 ┃ ┃ ┃ ┗ 📜Drop.jsx
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┗ 📜Header.jsx
 ┃ ┃ ┣ 📂iconComponent
 ┃ ┃ ┃ ┣ 📜IconComponents.jsx
 ┃ ┃ ┃ ┗ 📜iconType.txt
 ┃ ┃ ┣ 📂imageCrop
 ┃ ┃ ┣ 📂input
 ┃ ┃ ┃ ┣ 📜Input.jsx
 ┃ ┃ ┃ ┗ 📜WriteImageUpload.jsx
 ┃ ┃ ┣ 📂loading
 ┃ ┃ ┃ ┣ 📜LoadingSpinner.css
 ┃ ┃ ┃ ┗ 📜LoadingSpinner.jsx
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📜CommonModal.jsx
 ┃ ┃ ┃ ┣ 📜CropperModal.jsx
 ┃ ┃ ┃ ┣ 📜DatePicker.jsx
 ┃ ┃ ┃ ┣ 📜MemberOutModal.jsx
 ┃ ┃ ┃ ┣ 📜MoreModal.jsx
 ┃ ┃ ┃ ┣ 📜MyPageProfileModal.jsx
 ┃ ┃ ┃ ┣ 📜NicknameModal.jsx
 ┃ ┃ ┃ ┣ 📜ProfileModal.jsx
 ┃ ┃ ┃ ┗ 📜SignupModal.jsx
 ┃ ┃ ┣ 📂nosearchresult
 ┃ ┃ ┃ ┗ 📜NoSearch.jsx
 ┃ ┃ ┣ 📂photo
 ┃ ┃ ┃ ┗ 📜Photo.jsx
 ┃ ┃ ┗ 📂profile
 ┃ ┃ ┃ ┗ 📜Profile.jsx
 ┣ 📂hooks
 ┃ ┣ 📜debounce.js
 ┃ ┣ 📜useStickyMode.jsx
 ┃ ┗ 📜useToast.jsx
 ┣ 📂layout
 ┃ ┣ 📂footer
 ┃ ┃ ┗ 📜Footer.js
 ┃ ┣ 📂header
 ┃ ┃ ┗ 📜GroupPageHeader.js
 ┃ ┗ 📜index.js
 ┣ 📂pages
 ┃ ┣ 📂app-introduction
 ┃ ┃ ┣ 📜Introduction.jsx
 ┃ ┃ ┗ 📜Introduction2.jsx
 ┃ ┣ 📂group
 ┃ ┃ ┣ 📜GroupEdit.jsx
 ┃ ┃ ┣ 📜GroupMain.jsx
 ┃ ┃ ┣ 📜GroupWrite.jsx
 ┃ ┃ ┗ 📜styleContainer.js
 ┃ ┣ 📂kakao-login
 ┃ ┃ ┗ 📜KakaoLogin.jsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📜MyPage.jsx
 ┃ ┃ ┗ 📜PasswordChange.jsx
 ┃ ┣ 📂notice
 ┃ ┃ ┗ 📜Notice.jsx
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜PostDetail.jsx
 ┃ ┃ ┣ 📜PostEdit.jsx
 ┃ ┃ ┣ 📜PostMain.jsx
 ┃ ┃ ┗ 📜PostWrite.jsx
 ┃ ┣ 📂search
 ┃ ┃ ┣ 📜Search.jsx
 ┃ ┃ ┣ 📜SearchAlbum.jsx
 ┃ ┃ ┣ 📜SearchContainer.js
 ┃ ┃ ┣ 📜SearchDate.jsx
 ┃ ┃ ┗ 📜SearchPlace.jsx
 ┃ ┗ 📂signup-login
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┣ 📜Signup.jsx
 ┃ ┃ ┗ 📜UserProfile.jsx
 ┣ 📂recoil
 ┃ ┗ 📜Atom.js
 ┣ 📂router
 ┃ ┣ 📜NotProtectedRoute.jsx
 ┃ ┣ 📜ProtectedRoute.jsx
 ┃ ┗ 📜Router.jsx
 ┣ 📂utils
 ┃ ┣ 📜GoogleAnalytics.js
 ┃ ┣ 📜nicknameValidation.js
 ┃ ┣ 📜passwordValidation.js
 ┃ ┗ 📜shareKakao.js
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜index.js
```