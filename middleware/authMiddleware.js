const restricted = (req, res, next) => {
  console.log(req.session);
  req.session && req.session.user
    ? next()
    : res.status(401).json({ error: "Valid username and password required" });
};

module.exports = restricted;
