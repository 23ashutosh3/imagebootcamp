
const User = require("../../../models/user");
const Upload = require("../../../models/upload");
const Edited = require("../../../models/editedupload");
const Marks = require("../../../models/marks");

var fs = require("fs");
const path = require("path");

const AVATAR_PATH = path.join("/uploads/Files/avatars");


module.exports.userRegister = async function (req, res) {
  try {
    if (!req.body) {
      return res.json(400, {
        message: "body can not empty",
      });
    }


    const userAccount = await User.create({
      email: req.body.email,
      name: req.body.name,
      bootcamp: req.body.bootcamp,
    });

    userAccount.save();

    return res.json(200, {
      message: "user Registered",
      userAccount:userAccount,
    });

  } 
  catch (err) {
    return res.json(500, {
      message: "internal error",
    });
  }
};


module.exports.download = async function (req, res)
{
  try{
   
     Upload.find({ _id: req.params.id }, (err, data) => {
       console.log("hi");
       if (err) {
         console.log(err);
       } else {
         var path1 =path.join( __dirname + `\\..\\..\\..` + AVATAR_PATH ,data[0].filename) ;
         res.download(path1);
         console.log(path1);
       }
     });  
  }
  catch{
    return res.json(500, {
      message: "internal error",
    });
  }
}


module.exports.Editedupload = async function (req, res) {
  try {
    // get the editedUploadedAvatar from statics of model file, which contains the values using multer
    Edited.editedUploadedAvatar(req, res, function (err) {
      if (err) {
        console.log("Multer Error", err);
      }

      //if there is a file in your request, use this
      if (req.file) {
        // create a new entry in your DB
        Edited.create({
          avatar: path.join(Edited.editedAvatarPath, "/", req.file.filename),
          filename: req.file.filename,
        });
      }
    });

    //  this.upload.save();


    return res.json(200, {

      message: "upload Successfull",


    });
    // return res.redirect("back");
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }


};



module.exports.getmarks = (req, res) => {
  Marks.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured",
      });
    });
};


module.exports.marksById = (req, res) => {
  Marks.findById({ _id: req.params.id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured",
      });
    });
};