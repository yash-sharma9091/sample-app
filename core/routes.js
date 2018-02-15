"use strict";
const   express     = require('express'),
        path        = require('path'),
        config 		= require(require(path.resolve('./core/env')).getEnv),
        adminRoutes = require(path.resolve('./core/admin_router')),
        matchRoute  = require(path.resolve('./core/lib/matchRoute')),
        router 		= express.Router(),
        admin 		= express.Router();
        

adminRoutes.routes.forEach(x => matchRoute(admin, x));


module.exports = {
    admin: admin
}