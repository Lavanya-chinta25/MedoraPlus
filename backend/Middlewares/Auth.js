const jwt = require("jsonwebtoken");
const ensureAuth =(req,res,next)=>{
  const auth = req.headers['authorization'];
  if(!auth){
    return res.status(403).json({
      message:"Un authorized"
    })
  }
  try{
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
  }catch(e){
    return res.status(403).json({
      message:"Un authorized wrong"
    })
  }
}
module.exports = ensureAuth