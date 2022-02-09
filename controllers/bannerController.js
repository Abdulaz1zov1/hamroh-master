const Banner = require('../models/Banner');
const md5 = require('md5');
const path = require('path')
const fs = require('fs')
const sharp = require('sharp');

exports.createOne = async (req, res, next) => {
    let compressedFile = path.join(__dirname, '../public/uploads', md5(new Date().getTime()) + '.jpg')
    await sharp(req.file.path) // req.file.path - bu original rasm
      .resize(289, 136)
      .jpeg({ quality: 100 })
      .toFile(compressedFile, (error) => {
       if (error) {
        res.send(error)
       }
        // origininal rasmni ochirib yuboradi
       fs.unlink(req.file.path, async (error) => {
        if (error) {
         res.send(error)
        }
       })
      })

    const result = new Banner({
        image: path.basename(compressedFile)
    })
    result.save()
    .then(() => {
        res.redirect('/api/banner/all')
    })
    .catch((error) => {
        res.status(400).json({message: "Data is not created", data: error})
    })
}
exports.updateOne = async (req, res, next) => {

    await Banner.findById({ _id: req.params.id })
    .exec((error, data) => {
        if (error) {
            res.status(404).json({ success: false, error: error })
        } else {
            let filePath = path.join(__dirname, `../public/uploads/${data.image}`)
                fs.unlink(filePath, async (error) => {
                     if (error) {
                        throw error
                    }
                })
            }
    })
    let compressedFile = path.join(__dirname, '../public/uploads', md5(new Date().getTime()) + '.jpg')
    await sharp(req.file.path) // req.file.path - bu original rasm
      .resize(875, 435)
      .jpeg({ quality: 100 })
      .toFile(compressedFile, (error) => {
       if (error) {
        res.send(error)
       }
        // origininal rasmni ochirib yuboradi
       fs.unlink(req.file.path, async (error) => {
        if (error) {
         res.send(error)
        }
       })
      })


    const result = await Banner.findByIdAndUpdate(req.params.id)
    result.image = path.basename(compressedFile) 
    result.save()
    .then(() => {
        res.redirect('/api/banner/all')
    })
    .catch((error) => {
        res.status(400).json({message: "Badly", data: error})
    })
}
exports.deleteOne = async (req, res, next) => {
    await Banner.findById({ _id: req.params.id })
        .exec(async (error, data) => {
         if (error) {
          throw error
         } else {
          let filePath = path.join(__dirname, `../public/uploads/${data.image}`)
          fs.unlink(filePath, async (error) => {
           if (error) {
            throw error
           }
          })
          await Banner.findByIdAndDelete({ _id: req.params.id })
          res.redirect('/api/banner/all')
         }
        })
}



exports.getAll = async (req, res,next ) => {
    const result = await Banner.find()
    const user = req.session.admin; // admin session
    res.render("./admin/banner/index", { layout: "./admin_layout", user, result});
}