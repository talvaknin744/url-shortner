import { Router } from 'express'
import pino from 'pino-http'

const handleLogging = (router: Router) => {
    router.use(pino)
}

export {handleLogging};