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

    it('Should change task status based on state transition', async (done) => {
      const id= 1;
      supertest.default(Server.init())
        .put(`/task/:${id}/status`)
        .send({
            "status":"inprogress",
        }).end((err, res)=>{
          if (err) done(err);
          expect(res.body).keys(['id', 'title', 'description', 'createdBy'])
          done()
        })
    })

    it('Should assign task status based on state transition', async (done) => {
      const id= 1;
      supertest.default(Server.init())
        .put(`/task/:${id}/assign`)
        .send({
            "assignee":2,
        }).end((err, res)=>{
          if (err) done(err);
          expect(res.body).keys(['id', 'title', 'description', 'createdBy'])
          done()
        })
    })

  })