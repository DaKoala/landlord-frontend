const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://poker-platform.herokuapp.com' : 'http://localhost:3000';

export default BASE_URL;
