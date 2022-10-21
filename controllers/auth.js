const { user_game } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SIGNATURE_KEY } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            const existUser = await user_game.findOne({
                where: { username: username },
            });
            if (existUser) {
                return res.status(409).json({
                    status: false,
                    message: "username already used!",
                });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await user_game.create({
                username,
                password: encryptedPassword,
            });

            return res.status(201).json({
                status: true,
                message: "success",
                data: {
                    username: user.username,
                },
            });
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            const user = await user_game.findOne({
                where: { username: username },
            });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: "user doesn't exist!",
                });
            }

            const correct = await bcrypt.compare(password, user.password);
            if (!correct) {
                return res.status(400).json({
                    status: false,
                    message: "user or password doesn't match!",
                });
            }

            // generate token
            payload = {
                id: user.id,
                username: user.name,
            };
            const token = jwt.sign(payload, JWT_SIGNATURE_KEY);
            //const token = "token";

            return res.status(200).json({
                status: true,
                message: "success",
                data: {
                    token: token,
                },
            });
        } catch (err) {
            next(err);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { oldPassword, newPassword, confirmNewPassword } = req.body;

            if (newPassword !== confirmNewPassword) {
                return res.status(422).json({
                    status: false,
                    message:
                        "new password and confirm new password doesnt match!",
                });
            }


            const correct = await bcrypt.compare(oldPassword, user.password);
            if (!correct) {
                return res.status(400).json({
                    status: false,
                    message: "old password does not match!",
                });
            }

            const encryptedPassword = await bcrypt.hash(newPassword, 10);
            const updateUser = await user_game.update(
                {
                    password: encryptedPassword,
                },
                {
                    where: {
                        id: user.id,
                    },
                }
            );

            return res.status(200).json({
                status: true,
                message: "password changed successfully",
            });
        } catch (err) {
            next(err);
        }
    },

    deleteDataUser: async (req, res, next) => {
        try {
            const id_user = req.user.id;
            await user_game.destroy({
                where: { id: id_user },
            });

            return res.status(200).json({
                status: "success",
                mesage: "user_games data deleted",
            });
        } catch (err) {
            next(err);
        }
    },
};
