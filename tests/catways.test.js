const request = require('supertest');
const setup = require('./setup');
const expect = require('chai').expect;
const app = 'http://localhost:8080';

let token;
let createdCatwayId;

describe('Tests catways', () => {
    before(async () => {
        token = await setup.getToken();
    });

    it('POST /catways - doit créer un catway', async () => {
        const res = await request(app)
            .post('/catways')
            .set('Authorization', `Bearer ${token}`)
            .send({
                catwayNumber: 36,
                type: 'short',
                catwayState: 'bon état'
            });

        expect(res.status).to.equal(302);

        const getRes = await request(app)
            .get('/catways')
            .set('Authorization', `Bearer ${token}`);

        const match = getRes.text.match(/Catway n°36[\s\S]*?href="\/catways\/([a-f0-9]{24})"/);
        expect(match).to.not.be.null;
        createdCatwayId = match[1];
    });

    it('GET /catways - doit renvoyer un tableau de catways', async () => {
        const res = await request(app)
            .get('/catways')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.text).to.include('Catways');
    });

    it('GET /catways/:id - doit renvoyer un catway via son ID', async () => {
        const res = await request(app)
            .get(`/catways/${createdCatwayId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.text).to.include('Catway');
    });

    it("PATCH /catways/:id - doit modifier l'état d'un catway", async () => {
        const res = await request(app)
            .patch(`/catways/${createdCatwayId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ catwayState: 'mauvais état' });

        expect(res.status).to.equal(302);
    });

    it('DELETE /catways/:id - doit supprimer un catway', async () => {
        const res = await request(app)
            .delete(`/catways/${createdCatwayId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(302);
    });
});