const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.raw({ type: '*/*' })); // capture all content types as raw data

// POST endpoint at the root that echoes back the request body with the same content type
app.post('/', (req, res) => {
    const contentType = req.get('content-type') || 'text/plain';
    res.set('Content-Type', contentType);
    const body = req.body && req.body.length ? req.body : ''; // Handle empty body case
    res.send(body);
}); 


// only start the server if this file is run directly, not when imported for testing
if( require.main === module ) { 
    app.listen(PORT, () => {
        console.log(`Echo server is running on port ${PORT}`);
    });
};

module.exports = app; // export the app for testing