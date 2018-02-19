
const crypto                = require('crypto'),
      path                  = require('path'),
      mongoose              = require('mongoose'),
      jwt                   = require('jsonwebtoken'),
      env                   = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),     
      secret                = env.secret,
      Admin                 = require(path.resolve('./app/models/admin'));



class AdminController  {

    /**
     * method : POST
     * endpoint: /admin_api/login
     * @param {username} req 
     * @param {password} req
     */
    login(req, res) {
        let obj = req.body;
        console.log("obj", obj)
        let match = { $or: [{ username: obj.username }, { email: obj.username }] };
        let projection = {
            mobile: 1, username: 1, firstname: 1, lastname: 1, email: 1, password: 1, type: 1, image: 1, status: 1, bio: 1, role: 1, loginCount: 1
        }
        Admin.findOne(match, projection, (err, user) => {
            console.log("user", user);
            if (err) return res.status(412).json({ type: "error", message: "Invalid Username or Password.", errors: ['Invalid Username or Password.'] });
            if (!user || !user.matchPassword(obj.password)) {
                return res.status(412).json({ type: "error", message: "Invalid Username or Password.", errors: ['Invalid Username or Password.'] });
            } else if (!user.status) {
                return res.status(412).json({ type: "error", message: 'Your account is not active yet.', errors: ['Your account is not active yet.'] });
            } else {
                user = {
                    mobile: user.mobile,
                    status: user.status,
                    type: user.type,
                    email: user.email,
                    bio: user.bio,
                    username: user.username,
                    lastname: user.lastname,
                    firstname: user.firstname,
                    _id: user._id,
                    role: user.role
                };
                let token = jwt.sign(user, secret, { expiresIn: "14 days" });
                return res.json({ success: true, message: "You've been authenticated successfully.", data: user, token: token, });
            }
        });
    }

    

     

}

module.exports = AdminController;