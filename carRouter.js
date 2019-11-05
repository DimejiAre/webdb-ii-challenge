const express = require('express');

const router = express.Router();

router.get('/', (req,res)=>{
    res.json({message: 'You have reached cars endpoint'})
})

module.exports = router;