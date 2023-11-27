import express from 'express'
import * as Controller from '../controller/information.js'
import { body } from "express-validator"


const router = express.Router()

router.get('/', Controller.getInformation)

export default router