var express = require('express');
var router = express.Router();

let falsemodel = require('../models/falsemodel');
let bisectionmodel = require('../models/bisectionmodel');
let newtonmodel = require('../models/newtonmodel');
let onepointmodel = require('../models/onepointmodel');
let secantmodel = require('../models/secantmodel');
let simpletmodel = require('../models/simpletmodel');
let simplesmodel = require('../models/simplesmodel');
let compositetmodel = require('../models/compositetmodel');
let compositesmodel = require('../models/compositesmodel');
let forwardmodel = require('../models/forwardmodel');
let backwardmodel = require('../models/backwardmodel');
let centralmodel = require('../models/centralmodel');

/////////////////////////////////////////////////////////////

router.get('/showbisectionmodel', function(req, res, next) {
 
  bisectionmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/bisectionmodel',(req,res)=>{
  console.log(req.body);
  let doc = new bisectionmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showfalsemodel', function(req, res, next) {
 
  falsemodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/falsemodel',(req,res)=>{
  console.log(req.body);
  let doc = new falsemodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/shownewtonmodel', function(req, res, next) {
 
  newtonmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/newtonmodel',(req,res)=>{
  console.log(req.body);
  let doc = new newtonmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showonepointmodel', function(req, res, next) {
 
  onepointmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/onepointmodel',(req,res)=>{
  console.log(req.body);
  let doc = new onepointmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showsecantmodel', function(req, res, next) {
 
  secantmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/secantmodel',(req,res)=>{
  console.log(req.body);
  let doc = new secantmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showsimpletmodel', function(req, res, next) {
 
  simpletmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/simpletmodel',(req,res)=>{
  console.log(req.body);
  let doc = new simpletmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showsimplesmodel', function(req, res, next) {
 
  simplesmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/simplesmodel',(req,res)=>{
  console.log(req.body);
  let doc = new simplesmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showcompositetmodel', function(req, res, next) {
 
  compositetmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/compositetmodel',(req,res)=>{
  console.log(req.body);
  let doc = new compositetmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showcompositesmodel', function(req, res, next) {
 
  compositesmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/compositesmodel',(req,res)=>{
  console.log(req.body);
  let doc = new compositesmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showforwardmodel', function(req, res, next) {
 
  forwardmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/forwardmodel',(req,res)=>{
  console.log(req.body);
  let doc = new forwardmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showbackwardmodel', function(req, res, next) {
 
  backwardmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/backwardmodel',(req,res)=>{
  console.log(req.body);
  let doc = new backwardmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////////////////////////////////////

router.get('/showcentralmodel', function(req, res, next) {
 
  centralmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/centralmodel',(req,res)=>{
  console.log(req.body);
  let doc = new centralmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

module.exports = router;
