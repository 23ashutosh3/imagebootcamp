const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/Files/editedavatar");



const editedSchema = new mongoose.Schema(
    {

        avatar: {
            type: String,
        },
        filename: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + '.jpg');
    },
});

editedSchema.statics.editedUploadedAvatar = multer({ storage: storage }).single(
    "avatar"
);
editedSchema.statics.editedAvatarPath = AVATAR_PATH;

const EditedUpload = mongoose.model("EditedUpload", editedSchema);

module.exports = EditedUpload;
