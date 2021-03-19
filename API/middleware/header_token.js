// This is a middle ware that will be used if the random string has been supplied as a header.
// The middleware will only allow calls where the header is supplied.
// For other calls, the middleware will give a 401, not allowed error.
module.exports = (req, res, next) => {
  if (req.headers.random_string == process.env.RANDOM_STRING) {
    next();
    return;
  }
  res.status(401).json({ message: "You are not allowed to do this." });
};
