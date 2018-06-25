const serveAssetByClaim = require('../../controllers/assets/serveByClaim');
const serveAssetByIdentifierAndClaim = require('../../controllers/assets/serveByIdentifierAndClaim');

module.exports = (app) => {
  app.get('/:identifier/:claim', serveAssetByIdentifierAndClaim);
  app.get('/:claim', serveAssetByClaim);
};
