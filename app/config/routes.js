"use strict";

const path                  =   require("path"),
      fs                    =   require("fs"),
      expressJWT            =   require('express-jwt'),
      env                   =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
      admin_api_path        =   env.API.admin,
      api_path              =   env.API.site;

class AppRouter {
    constructor(app, router) {
        this.call = {
            frontend: {},
            backend: {}
        };
        this.frontend = {};
        this.backend = {};

        /**/
        this.api_path = api_path;
        this.admin_api_path = admin_api_path;

        /**/
        this.app = app;
        this.router = router;
    }

    /** to load all the classes of backend directory */
    loadAdminClasses() {
        fs.readdirSync(path.resolve('./app/controllers/Admin')).forEach(file => {
            let name = file.substr(0, file.indexOf('.'));
            /*Store Classes in backend object*/
            this.backend[name] = require(path.resolve(`./app/controllers/Admin/${name}`));
            /*Init All Classes & add Object to Array*/
            this.call['backend'][name] = new this.backend[name]();
        });
    }

    /** to load all the classes of frontend directory */
    loadAppClasses() {
        fs.readdirSync(path.resolve('./app/controllers/User')).forEach(file => {
            let name = file.substr(0, file.indexOf('.'));
            /*Store Classes in frontend object*/
            this.frontend[name] = require(path.resolve(`./app/controllers/User/${name}`));
            /*Init All Classes & add Object to Array*/
            this.call['frontend'][name] = new this.frontend[name]();
        });
    }

    /** define route in array of path:[] which will run without authentication */
    unlessRoutes() {
        this.router.use(expressJWT({
            secret: env.secret,
        }).unless({
            path: [
                this.admin_api_path + 'login',
                this.admin_api_path + 'forgot-password',
                this.admin_api_path + 'reset-password',
            ]
        }));
    }

    /**to load all the routes of admin  */
    loadAdminRoutes() {
        this.router.post('/login', this.call['backend']['AdminController'].login);
        // this.router.post('/my-profile', this.call['backend']['AdminController'].profile);
        // this.router.post('/forgot-password', this.call['backend']['AdminController'].forgotPassword);
        // this.router.post('/reset-password', this.call['backend']['AdminController'].resetPassword);

       
    }
    /** to load all the routes of Application (userend) */
    loadAppRoutes() {
        // this.router.get('/send-otp', this.call['User']['UserController'].sendOTP);
    }

    init() {
        this.loadAdminClasses();
        this.loadAppClasses();
        this.unlessRoutes();
        this.loadAdminRoutes();
        this.loadAppRoutes();

        return this.router;
    }
}

module.exports = AppRouter;