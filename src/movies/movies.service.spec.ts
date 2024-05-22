import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  function createMovie() {
    service.create({
      title: 'test Movie',
      genres: ['test'],
      year: 2000,
    });
  }


  // 이름은 아무렇게나 지어도 됨
  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
      // result 가 array 인지 확인
    });
  });




  describe("getOne", () => {
    it("shoudl return a movie", () => {
      //getOne을 테스트 하기 위해 테스트 데이터를 넣음
      createMovie();

      const movie = service.getOne(1);
      expect(movie).toBeDefined(); // undefined 가 아님
      expect(movie.id).toEqual(1);
    });


    // 없는 id로 movie를 찾을 때 에러가 적절히 터지는지
    it("should throw 404 error", () => {
      try{
        service.getOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`movie with id 999 not found`);
      }
    });
  });





  describe("deleteOne" , () => {
    it("deletes a movie", () => {
      createMovie();
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });


    it("should return 404", () => {
      try{
        service.deleteOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`movie with id 999 not found`);
      }
    });
  });




  describe("create", ()=> {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      createMovie();
      const afterCreate = service.getAll().length;
      
      console.log(service.getAll());
      expect(afterCreate).toBeGreaterThan(beforeCreate);

    });
  });

  

  


  describe("update", () => {
    it("should update a movie", () => {
      createMovie();

      service.update(1, {title : 'updatedTest'});
      const movie = service.getOne(1);
      
      expect(movie.title).toEqual('updatedTest');
    });


    it("should throw a NotFound Exception", () => {
      try{
        service.update(999,{title:'update'});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`movie with id 999 not found`);
      }
    });
  });

});



