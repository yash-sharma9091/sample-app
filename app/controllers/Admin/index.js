'use strict';

const mongoose           = require('mongoose'),
      path               = require('path'),
      Admin              = require(path.resolve('./app/models/admin'));


class Index {
    checkAdminAccount() {
        Admin.findOne({
            role: "superAdmin",
        }, (err, result) => {
            if (!result) {
                var admin = {
                    username: "admin@yopmail.com",
                    email: 'admin@yopmail.com',
                    password: '123456',              
                    role: "superAdmin",
                    lastname: "lastname",
                    firstname: "superAdmin",
                    status :true
                };

                var user = new Admin(admin);
                user.save((err, result) => {
                    /*User Create*/
                });
            }
        });
    }
}

module.exports = Index;