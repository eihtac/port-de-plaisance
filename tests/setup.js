const axios = require('axios');
const assert = require('chai').assert;

let token;

const EMAIL = 'john@xxx.com';
const PASSWORD = 'password';

before(async () => {
    try {
        const response = await axios.post('http://localhost:8080/login', {
            email: EMAIL, 
            password: PASSWORD
        }, {
            headers: {
                'x-test': 'true'
            }
        });

        console.log('Reponse login complete : ', response.data);

        assert.exists(response.data.token, 'Le token doit exister');
        token = response.data.token;
        console.log('Token récupéré pour les tests');
    } catch (error) {
        console.error('Erreur lors de la récupération du token :', error.message);
        throw error;
    }
});

module.exports = {
    getToken: () => token
};