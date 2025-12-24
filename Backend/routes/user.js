const { Router } = require("express");
const bcrypt = require("bcrypt");
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { usermiddleware } = require("../middleware/user");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
    const { email, password, firstname, lastname } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
        email,
        password: hashedPassword,
        firstname,
        lastname
    });

    res.json({
        message: "Signup Succeeded"
    });
});

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(403).json({
            message: "Invalid credentials"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(403).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        { id: user._id },
        JWT_USER_PASSWORD
    );

    res.json({
        token
    });
});

userRouter.get("/purchases",usermiddleware, async function (req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    });

    res.json({
        purchases
    });
});

module.exports = {
    userRouter
};
