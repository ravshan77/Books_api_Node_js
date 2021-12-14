function log(req, res, next) {
    console.log("log medlvare");
    next();
  }

  module.exports = log