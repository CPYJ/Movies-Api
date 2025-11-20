## **🖥️**  프로젝트 소개
회원가입 / 로그인 후, 영화 정보를 CRUD 할 수 있는 API 서버를 구현한 프로젝트
 <br>  
- **배포 URL** : 54.180.109.164:3000/movies
  <br>  <br> 

## **📌** 개발환경

- **Language** : TypeScript

- **IDE** : VSCode

- **FrameWork** : Nest.js

- **ORM** : TypeORM

- **DataBase** : PostgreSQL

- **Authentication** : JWT, Passport

- **API** : Restful API

- **Deploy** : AWS + Docker

<br> 

## **📌** Code

#### 영화
- [Movies.controller](src/movies/movies.controller.ts)
- [Movies.service](src/movies/movies.service.ts)
- [Movies.repository](src/movies/movies.repository.ts)

#### 인증
- [Auth.controller](src/auth/auth.controller.ts)
- [Auth.service](src/auth/auth.service.ts)

#### 테스트
- [Unit Test](src/movies/movies.service.spec.ts)
- [E2E Test](test/app.e2e-spec.ts)
