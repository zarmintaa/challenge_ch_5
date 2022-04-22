const { user_game_biodata } = require("../models");

exports.getAllBiodata = (req, res, next) => {
  const parameter = { where: { user_id: req.body.id } };
  user_game_biodata
    .findAll()
    .then((user) => {
      res
        .status(200)
        .json({ message: "Berhasil mengambil biodata user", user });
    })
    .catch((error) =>
      res.status(402).json({ message: "Gagal mengambil biodata user", error })
    );
};

exports.createBiodata = (req, res, next) => {
  const { nama, bio, gender, user_id } = req.body;
  user_game_biodata
    .create({
      nama,
      bio,
      gender,
      user_id,
    })
    .then((biodata) => {
      res.status(201).json({
        message: "Berhasil menambah biodata user",
        data: { nama, bio, gender, user_id },
      });
    })
    .catch((error) =>
      res.status(402).json({ message: "Gagal menambah biodata user", error })
    );
};

exports.getSingleBiodata = (req, res, next) => {
  user_game_biodata
    .findByPk(req.params.id)
    .then((user) => {
      res
        .status(200)
        .json({ message: "Berhasil mengambil biodata user", user });
    })
    .catch((error) =>
      res.status(402).json({ message: "Gagal mengambil biodata user", error })
    );
};

exports.updateBiodata = (req, res, next) => {
  const { nama, bio, gender, user_id } = req.body;
  console.log({ nama, bio, gender, user_id, paramId: req.params.id });
  console.log({ param: req.params, body: req.body });
  user_game_biodata
    .update(
      {
        nama,
        bio,
        gender,
      },
      { where: { user_game_id: req.params.id } }
    )
    .then((biodata) => {
      res.status(201).json({
        message: "Success mengupdate biodata",
        data: { nama, bio, gender },
      });
    })
    .catch((error) =>
      res.status(401).json({ message: "Error mengupdate biodata", error })
    );
};

exports.deleteBiodata = (req, res, next) => {
  user_game_biodata
    .destroy({ where: { user_game_id: req.params.id } })
    .then((result) =>
      res.status(201).json({ message: "Berhasil menghapus data", result })
    )
    .catch((error) =>
      res.status(401).json({ message: "Gagal menghapus data", error })
    );
};
