import express from 'express'

const router = express.Router()

//import controllers
import { allDomains, createDomain } from '../controllers'

//routes
router.route('/').get(allDomains).post(createDomain)

export { router as domainRouter }
