const asyncMiddleware = (fn) => (req, res, next) => {
  Promise
    .resolve(fn(req, res, next))
    .catch(next)
}

const MySportsFeeds = require('mysportsfeeds-node');
const msfTwo = new MySportsFeeds('2.0', true);
msfTwo.authenticate(process.env.MSF_API, 'MYSPORTSFEEDS');

module.exports = {
  asyncMiddleware,
  msfTwo
}
