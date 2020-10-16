// Constants.js
const prod = {
    url: {
        API_URL: 'https://polar-dawn-50426.herokuapp.com/api/'
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost:5000/api/'
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;