const { deepStrictEqual } = require("assert");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if (file.fieldname === "img") {
            cb(null, './public/uploads/img/');
        }
        else if (file.fieldname === "file1") {
            cb(null, './public/uploads/sahadatnama/');
        }
     },
        
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

module.exports.upload = upload;