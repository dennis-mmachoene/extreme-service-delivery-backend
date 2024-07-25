const origins = [
    'http://localhost:3000',
    'http://localhost:5173'
];

const options = {
    origin: (origin, callback) => {
        if(origins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = options;
