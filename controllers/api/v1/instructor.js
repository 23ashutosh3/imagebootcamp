const Instructor = require("../../../models/instructor");
const Upload = require("../../../models/upload");
const Edited = require("../../../models/editedupload");
const Marks = require("../../../models/marks");
const path = require("path");
const jwt = require("jsonwebtoken");
module.exports.register = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "content can't be empty",
    });
  }

  //registeration for Doctor
  const register = new Instructor({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //save data in database
  register
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured",
      });
    });
};

module.exports.login = async function (req, res) {
  try {
    let user = await Instructor.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    return res.json(200, {
      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: "10000000" }),
      },
    });
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.upload = async function (req, res) {
  try {
        // get the uploadedAvatar from statics of model file, which contains the values using multer
        Upload.uploadedAvatar(req, res, function (err) {
          if (err) {
            console.log("Multer Error", err);
          }

          //if there is a file in your request, use this
          if (req.file) {
            // create a new entry in your DB
              Upload.create({
              avatar: path.join(Upload.avatarPath, "/", req.file.filename),
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




module.exports.getAll = (req, res) => {
  Upload.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured",
      });
    });
};


module.exports.getAllEdited = (req, res) => {
  Edited.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured",
      });
    });
};


module.exports.marks = async function (req, res) {
  try {

  const marksdata= Edited.findById({ _id: req.params.id })

  if(!marksdata)
  {
    return res.json(400, {
      message: "Not found",
    });
  }
    const obtainMarks = await Marks.create({
  
      marks: req.body.marks,
    });

    console.log(obtainMarks);

    obtainMarks.save();

    return res.json(200, {
      message: "Marks Given",
      obtainMarks: obtainMarks
    });
  }
 
  catch{
    return res.json(500, {
      message: "internal error",
    });
  }
}

