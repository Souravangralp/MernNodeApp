const express = require('express');
const app = express();
const port = 8080;
const apiMiddleware = require('./middlewares/apiMiddleware')
var cors = require('cors')

const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}

// Middleware to parse JSON
app.use(express.json());
app.use(cors(corsOptions));

//configure api endpoints
app.use('/api', apiMiddleware);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});