const { user_game } = require("../models");
const bycript = require("bcryptjs");

exports.getAllUserGame = (req, res, next) => {
  user_game
    .findAll()
    .then((users) => {
      res.status(200).json({ message: "Success", users });
    })
    .catch((error) =>
      res.status(402).json({ message: "Error mengambil data user", error })
    );
};

exports.createUser = (req, res, next) => {
  const { nama, image, email, password } = req.body;
  const defaultImg = "https://source.unsplash.com/random/500x500/?user";
  bycript
    .hash(password, 12)
    .then((hashed) => {
      if (image === null) {
        user_game.create({ nama, image: defaultImg, email, password: hashed });
      }
      user_game.create({ nama, image, email, password: hashed });
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Success", data: { nama, image, email, password } });
    })
    .catch((error) =>
      res.status(402).json({ message: "Error create user game", error })
    );
};

exports.getSingleUser = (req, res, next) => {
  user_game
    .findByPk(req.params.id)
    .then((user) => {
      res.status(200).json({ message: "Berhasil mengambil user", user });
    })
    .catch((error) =>
      res.status(402).json({ message: "Gagal mengambil user", error })
    );
};

exports.updateUser = (req, res, next) => {
  const { nama, image, email, password } = req.body;
  bycript
    .hash(password, 12)
    .then((hashedPassword) => {
      user_game.update(
        { nama, image, email, password: hashedPassword },
        { where: { user_id: req.params.id } }
      );
    })
    .then((result) => {
      res.status(201).json({
        message: "Berhasil mengupdate user",
        data: { nama, image, email, password },
      });
    })
    .catch((error) => {
      res.status(401).json({ message: "Gagal mengupdate user", error });
    });
};

exports.deleteUser = (req, res, next) => {
  user_game
    .destroy({ where: { user_id: req.params.id } })
    .then((user) => {
      res.status(201).json({ message: "Sukses menghapus data", user });
    })
    .catch((error) =>
      res.status(402).json({ message: "Gagal menghapus data", error })
    );
};
