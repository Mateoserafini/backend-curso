import errorDictionary from './diccionary.error.js';

function errorHandler(err, req, res, next) {
    console.log("errorHandler")
    const error = errorDictionary[err.code];
    if (error) {
        res.status(error.code).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default errorHandler;