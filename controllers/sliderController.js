const Slider = require('../models/Slider');
const md5 = require('md5');
const path = require('path')
const fs = require('fs')
const sharp = require('sharp');

exports.createOne = async (req, res, next) => {
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

    const result = new Slider({
        image: path.basename(compressedFile)
    })
    result.save()
    .then(() => {
        res.redirect('/api/slider/all')
    })
    .catch((error) => {
        res.status(400).json({message: "Data is not created", data: error})
    })
}
exports.updateOne = async (req, res, next) => {

    await Slider.findById({ _id: req.params.id })
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


    const result = await Slider.findByIdAndUpdate(req.params.id)
    result.image = path.basename(compressedFile) 
    result.save()
    .then(() => {
        res.redirect('/api/slider/all')
    })
    .catch((error) => {
        res.status(400).json({message: "Badly", data: error})
    })
}
exports.deleteOne = async (req, res, next) => {
    await Slider.findById({ _id: req.params.id })
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
          await Slider.findByIdAndDelete({ _id: req.params.id })
          res.redirect('/api/slider/all')
         }
        })
}
exports.getOne = async (req, res,next ) => {
    const result = await Slider.findById(req.params.id)
    const user = req.session.admin; // admin session
    res.render("./admin/slider/update", { layout: "./admin_layout", user, result});
}
exports.getAll = async (req, res,next ) => {
    const result = await Slider.find()
    const user = req.session.admin; // admin session
    res.render("./admin/slider/index", { layout: "./admin_layout", user, result});
}


exports.get_slider_CLIENT = async (req, res,next ) => {
    const result = await Slider.find()
    res.json(result)
}