const express = require("express");
const router = express.Router();
var multer  = require('multer');
var upload = multer();
const Information = require("../models/Information");
const FileType = require('file-type');

router.post("/", upload.fields([
    { name: 'picture', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]), async (req, res) => {
    try {
        const newInfo = await Information.create({ picture: req.files.picture[0].buffer, file:req.files.file[0].buffer });
        return res.status(200).send(newInfo);
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const info = await Information.findByPk(req.params.id, {raw:true});
        if(!info) return res.status(404).send({error:"Information not found."});
      
        const pictureBuffer = Buffer.from(info.picture);
        const infoPictureType = await FileType.fromBuffer(pictureBuffer);

        const fileBuffer = Buffer.from(info.file);
        const infoFileType = await FileType.fromBuffer(Buffer.from(fileBuffer));

        const response = {
          ...info,
          picture: `data:${infoPictureType.mime};base64, ${pictureBuffer.toString("base64")}`,
          file: `data:${infoFileType.mime};base64, ${fileBuffer.toString("base64")}`
        }

        return res.status(200).send(response);
      } catch (error) {
        return res.status(500).send(error);
      }
})

module.exports = router;