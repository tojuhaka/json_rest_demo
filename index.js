import 'babel-polyfill'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const random = require('random-name');

function* randomGenerator(amount) {
    while (amount-- > 0) {
        yield `${random.first()} ${random.last()}`;
    }
}

let logger = (req, res, next) => {
    let request = {
        'user_agent': req.get('user-agent'),
        'method': req.method,
        'url': req.originalUrl
    };
    console.log(`Received message: ${request.method} ${request.url} from ${request.user_agent}`);
    next()
};

app.use(logger);
app.use(bodyParser.json());

router.get('/', (req, res) => {
    let names = [...randomGenerator(10)];
    res.json({ names: names})
});


app.use('/', router);
app.listen(8080);
console.log('Server running on port 8080.');
