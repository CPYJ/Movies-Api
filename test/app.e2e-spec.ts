import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 실제 환경과 똑같이 세팅
    app.useGlobalPipes(new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted : true, 
      transform:true,
    }),
    );

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()) // http://localhost:3000/ 같은 걸 안 쓰기 위해서 사용
      .get('/')
      .expect(200) // 응답 코드
      .expect('welcome to my Movie Api');// 최종 return 값
  });


  describe('movies',()=> {

    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    });


    it('POST', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({ // post 할 때 보내는 데이터
        title : 'hello',
        year : 2023,
        genres : ["genre"]
      })
      .expect(201) // 생성되었다는 뜻
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404); //
    });  
  });




  describe('movies/:id',()=>{
    it('GET 200', () => {
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
    }); 


    it("GET 404", ()=> {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    });

    it('PATCH', ()=> {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title : 'patch title'
      })
      .expect(200);
    });

    it('DELETE', ()=> {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });


    it('POST 400', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({ // post 할 때 보내는 데이터
        title : 'hello',
        year : 2023,
        genres : ["genre"],
        other : 'thing' // 존재하지 않는 것까지 포함
      })
      .expect(400);
    });




    it.todo("Ex");

  });

});
