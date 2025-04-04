const request = require('supertest');
const setup = require('./setup');
const expect = require('chai').expect;
const app = 'http://localhost:8080';

let token;
let createdUserId;

describe('Tests utilisateurs', () => {
    before(async () => {
        token = await setup.getToken();
    });

    it('POST /register - doit créer un nouvel utilisateur', async () => {
        const res = await request(app)
            .post('/register')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fromDashboard: true,
                name: 'Jean Test',
                email: 'jean@xxx.com',
                password: 'password'
            });

        expect(res.status).to.equal(302);

        const getRes = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        const match = getRes.text.match(/Jean Test[\s\S]*?href="\/users\/([a-f0-9]{24})"/);
        expect(match).to.not.be.null;
        createdUserId = match[1];
    });

    it('GET /users - doit afficher la liste des utilisateurs', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.text).to.include('Utilisateurs');
    });

    it('GET /users/:id - doit afficher un utilisateur', async () => {
        const res = await request(app)
            .get(`/users/${createdUserId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.text).to.include('Détails de l\'utilisateur');
    });

    it('DELETE /users/:id - doit supprimer un utilisateur', async () => {
        const res = await request(app)
            .delete(`/users/${createdUserId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(302);
    });
});
