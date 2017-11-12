'use strict';

require('babel-polyfill');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(randomGenerator);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var random = require('random-name');

function randomGenerator(amount) {
    return regeneratorRuntime.wrap(function randomGenerator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!(amount-- > 0)) {
                        _context.next = 5;
                        break;
                    }

                    _context.next = 3;
                    return random.first() + ' ' + random.last();

                case 3:
                    _context.next = 0;
                    break;

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

var logger = function logger(req, res, next) {
    var request = {
        'user_agent': req.get('user-agent'),
        'method': req.method,
        'url': req.originalUrl
    };
    console.log('Received message: ' + request.method + ' ' + request.url + ' from ' + request.user_agent);
    next();
};

app.use(logger);
app.use(bodyParser.json());

router.get('/', function (req, res) {
    var names = [].concat(_toConsumableArray(randomGenerator(10)));
    res.json({ names: names });
});

app.use('/', router);
app.listen(8080);
console.log('Server running on port 8080.');
//# sourceMappingURL=index.js.map