## **🖥️**  Movies API
- 회원가입 및 로그인 후 영화 정보를 CRUD 할 수 있는 api 서버 입니다.
  <br>  <br> 

### **📌** 개발환경

- **Language** : TypeScript

- **IDE** : VSCode

- **FrameWork** : Nest.js

- **ORM** : TypeORM

- **DataBase** : PostgreSQL

- **Authentication** : JWT, Passport
<br> 

### **📌** Code

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
