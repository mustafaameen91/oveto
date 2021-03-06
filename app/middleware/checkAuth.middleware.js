const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      if (decoded.roleId == 2) {
         req.studentId = decoded.idUser;
      } else {
         req.studentId = -1;
      }
      console.log(decoded);
      next();
   } catch (err) {
      return res.status(401).json({
         message: "auth failed",
      });
   }
};
