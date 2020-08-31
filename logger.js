 function Auth (req, res, next) {
    console.log("Athentication ... ");
    next();
  }

  module.exports = Auth;
