import {Router} from 'express'
import login from '../controller/login.ctr.js'

const routerLogin =Router()

routerLogin.post("/login",login)

export default routerLogin
