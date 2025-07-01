const fs = require('fs');



function logRequestResponse(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `${Date.now()} - ${req.method} - ${req.url}\n`, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
    }
}

module.exports = {logRequestResponse};