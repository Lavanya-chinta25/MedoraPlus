  const router = require("express").Router();
  const ensureAuth = require("../Middlewares/Auth");
  router.get("/",ensureAuth,(req,res)=>{
    res.status(200).json([
      {
        name:"tarun",price:200
      },
      {
        name:"tarun",price:200
      }
    ])
  });
  module.exports = router;