import {Router} from 'express'
import {register} from '../controller/register.ctr.js'

const routerRegister =Router()

routerRegister.post("/register",register)

export default routerRegister
