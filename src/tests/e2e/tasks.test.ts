import { expect } from 'chai';
import * as supertest from 'supertest';
import Server from "../../bootstrap/Server";
describe('Tasks stories', () => {
  
    it('Should return a created task', async (done) => {
      supertest.default(Server.init())
        .post('/task')
        .send({
            "title":"task 1",
            "description":"some description",
            "createdBy":1,
        }).end((err, res)=>{
          if (err) done(err);
          expect(res.body).keys(['id', 'title', 'description', 'createdBy'])
          done()
        })
    })

  })