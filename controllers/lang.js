exports.getItems = async(req, res) => {
    res.json({ lang: req.session.ulang })
}