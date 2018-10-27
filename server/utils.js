const asyncMiddleware = (fn) => (req, res, next) => {
  console.log('middleware')
  Promise
    .resolve(fn(req, res, next))
    .catch(next)
}

const MySportsFeeds = require('mysportsfeeds-node');
const msfTwo = new MySportsFeeds('2.0', true);
msfTwo.authenticate('b57b9597-7a4b-4b7b-b6b7-10fd58', 'MYSPORTSFEEDS');

module.exports = {
  asyncMiddleware,
  msfTwo
}
