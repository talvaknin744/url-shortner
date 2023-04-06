import supertest from 'supertest';
import { start, server, stop } from '../../server';
import { Url } from './urlModel.entity';

describe('unit tests', () => {
    beforeEach(async () => {
        await start();
        await Url.clear();
    });

    afterEach(async () => {
        await stop();
    });

    it('registerUrl in service succeed ', async () => {
        await supertest(server)
            .post('/registerUrl')
            .send({ url: 'https://www.google.com' })
            .expect(201);
    });

    it('pointing into non existing route ', async () => {
        await supertest(server).get('/registerUrlddd').expect(404);
    });

    it('shortUrl in service succeed in redirect ', async () => {
        const res = await supertest(server)
            .post('/registerUrl')
            .send({ url: 'https://www.google.com' });
        const { shortUrl } = JSON.parse(res.text);
        await supertest(server).get(`/shortUrl/${shortUrl}`).expect(302);
    });

    it('getFullUrl in service failed ', async () => {
        await supertest(server).get('/registerUrlddd').expect(404);
    });

    it('shortUrl without eight characters ', async () => {
        await supertest(server)
            .get('/shortUrl/999')
            .expect(400)
            .expect('url param need to be string of eight characters');
    });

    it('shortUrl with eight characters that not exist in db', async () => {
        await supertest(server)
            .get('/shortUrl/adfghjkl')
            .expect(404)
            .expect('no such url exist in db');
    });
});
