const crypto                =  require('crypto'),
      path                  =  require('path'),
      mongoose              =  require('mongoose'),
      jwt                   =  require('jsonwebtoken'),
      env                   =  require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),     
      secret                =  env.secret,
      User                  =  require(path.resolve('./app/models/user')),
      async					        =  require('async'),
      datatable             =  require(path.resolve('./app/config/libs/datatable'));


class userController  {


  addUser(req, res) {
    console.log(req.body)
    req.body.password = '123456'
    let user = new User(req.body)
    user.save(function (err, _user) {
      if (err) {
        console.log(err)
        res.status(412).json({ type: "error", message: "Invalid Username or Password.", errors: [err] });
      } else {
        res.json({ success: true, message: "User created successfully.", data: _user });
      }
    })
  };

  userList(req, res) {
    console.log("start", req.body.start);
    console.log('length', req.body.length);
    let limit = Number(req.body.length),
      _skip = Number(req.body.start);
    async.parallel({
      count: (callback) => {
        User.count(callback);
      },
      records: (callback) => {
        User.aggregate([
          {
            $project: {
              "_id": 1,
              "username": 1,
              "email": 1,
              "mobile": 1,
              "status": 1
            }
          },
          {
            $skip: _skip
          },
          {
            $limit: limit
          }
        ], callback)
      }
    }, (err, result) => {
      if (err) {
        return res.json({ errors: err });
      }
      let status_list = {
        class: {
          true: "info",
          false: "danger"
        },
        status: {
          true: "Active",
          false: "InActive"
        }
      };
      let dataTableObj = datatable.userTable(status_list, result.count, result.records, Number(req.body.draw));
      res.json(dataTableObj);

    })
  };

  userView(req, res) {
    console.log('req.params', req.params.id)
    User.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        res.json({ type: "error", message: "Invalid User.", errors: [err] });
      } else {
        result.password = undefined;
        res.json({ success: true, data: result })
      }
    })
  } 

  userEdit(req, res) {
    let id = req.params.id;
    console.log(req.params.id);
    User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }, function (err, user) {
      if (err) {
        res.json({ type: "error", message: "Invalid User.", errors: [err] });
      } else {
        user.password = undefined;
        console.log(user)
        res.json({ success: true, data: user })
      }
    })
    // async.waterfall([
    //   function(callback){
    //     User.findOne({_id:id},function(err,user){
    //       if(err){
    //         callback(err,null)
    //       }else{
    //         callback(null,user)
    //       }
    //     })
    //   },
    //   function(user,callback){
    //     console.log(user)
    //     User.
    //   }
    // ])
  }

  userDelete(req, res) {
    console.log(req.params)
  }

}

module.exports = userController;