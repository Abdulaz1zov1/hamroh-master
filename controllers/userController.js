const User = require("../models/User");
exports.register = async (req, res, next) => {
    const user = new User({
        fullName: req.body.fullName,
        password: req.body.password,
        phone: req.body.phone,
    });
    await user.save()
        .then(async () => {
            res.status(201).json({
                success: true,
                data: user
            });
            // console.log(req.session)

        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error,
            });
        });
};
exports.editAuth = async (req, res, next) => {
    const user = await User.findByIdAndUpdate({ _id: req.params.id });
    if (!user) {
        res.status(404).json({ success: false, data: "Auth Not Found" });
    }
    user.fullName = req.body.fullName;
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.password = req.body.password;
    await user
        .save()
        .then(() => {
            res.status(200).json({ success: true, data: user });
        })
        .catch((error) => {
            res.status(400).json({ success: false, error: error });
        });
};
exports.deleteAuth = async (req, res, next) => {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ success: true, data: [] });
};
exports.login = async (req, res, next) => {
    const { phone, password } = req.body;
    if (!phone || !password) {
        res.status(400).json({
            data: "Error"
        })
    }
    const users = await User.findOne({ phone: phone }).select("password");
    if (!users) {
        res.status(400).json({
            data: "Error"
        })
    }
    const isMatch = await users.matchPassword(password);
    if (!isMatch) {
        res.status(400).json({
            data: "Error"
        })
    }
    const body = await User.findOne({ phone: req.body.phone });
    if (!isMatch && !users) {
        res.status(400).json({
            data: "Error"
        })
    } else {
        req.session.user = body;
        req.session.save();
        res.status(200).json({
            data: body
        })
    }
};
exports.logout = async (req, res, next) => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect("/");
};
exports.getMe = async (req, res, next) => {
    const my = req.session.user;
    if(!my) {
        res.status(400).json({ success: true, data: "Failed" });
    }else{
        const user = await User.findById({ _id: my._id });
        res.status(201).json({ success: true, data: user });
    }
    
};
exports.getUserAll = async (req, res, next) => {
    const user = await User.find({ role: 3 }).sort({ date: -1 });
    res.status(200).json({ success: true, data: user });
};
exports.getAdminAll = async (req, res, next) => {
    const user = await User.find({ role: 2 }).sort({ date: -1 });
    res.status(200).json({ success: true, data: user });
};
exports.getLockedUserAll = async (req, res, next) => {
    const user = await User.find({ role: 3, isActive: false }).sort({ date: -1 });
    res.status(200).json({ success: true, data: user });
};