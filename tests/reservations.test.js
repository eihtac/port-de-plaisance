const request = require('supertest');
const setup = require('./setup');
const expect = require('chai').expect;
const app = 'http://localhost:8080';

let token;
let createdReservationId;

describe('Tests reservations', () => {
    before(async () => {
        token = await setup.getToken();
    });

    it('POST /catways/4/reservations - doit créer une réservation', async () => {
        const res = await request(app)
            .post(`/catways/4/reservations`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                catwayNumber: 4,
                clientName: 'Jean Test',
                boatName: 'Test Boat',
                checkIn: '2025-04-15',
                checkOut: '2025-04-20'
            });

        expect(res.status).to.equal(302);

        const getRes = await request(app)
            .get('/reservations')
            .set('Authorization', `Bearer ${token}`);

        const match = getRes.text.match(/Catway n°4[\s\S]*?href="\/catways\/4\/reservations\/([a-f0-9]{24})"/);
        expect(match).to.not.be.null;
        createdReservationId = match[1];
    });

    it('GET /reservations - doit afficher toutes les réservations', async () => {
        const res = await request(app)
            .get('/reservations')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.text).to.include('Réservations');
    });

    it('GET /catways/4/reservations/:id - doit afficher une réservation', async () => {
        const res = await request(app)
            .get(`/catways/4/reservations/${createdReservationId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.text).to.include('Détails de la réservation');
    });

    it('DELETE /catways/4/reservations/:id - doit supprimer une réservation', async () => {
        const res = await request(app)
            .delete(`/catways/4/reservations/${createdReservationId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(302);
    });
});
