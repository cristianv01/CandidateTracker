import {Express, Request, Response } from "express";




const express = require('express');
const router = express.Router();

router.get('/', (req: Request,res: Response) =>{
    res.send('this is admin route');
})

router.post('/roster', (req: Request, res: Response) =>{
    res.send('this retrieves roster')
})


module.exports = router