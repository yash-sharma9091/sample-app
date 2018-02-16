"use strict";
const DS            = "/",
      PORT          = 8000,
      __DB           = "inHouse",
      base_url      = "http://localhost:"+PORT+DS ;

module.exports = {
    db: {
        name: __DB,
        URL: "mongodb://localhost/" + __DB,
        options: {
            user: '',
            pass: ''
        }
    },
    DS: DS,
    debug_mongo:true,
    admin_base_url: base_url + "manager/",
    API: {
        site: '/api/',
        admin: '/admin_api/'
    },
    secret: new Buffer("@#$Ggf34#$Yfwv12&*_34sdVV5443g$#G$#TVS@#f3g2&^%JH#2fc2@@@@@^%f2f23f#@@#fg").toString('base64'),
    server: {
        PORT: PORT
    },
    MasterPassword :"123456",

}     