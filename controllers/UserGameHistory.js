const { user_game_history } = require("../models");

exports.getAllHistory = (req, res, next) => {
  user_game_history
    .findAll()
    .then((history) => {
      console.log(history);
      res
        .status(200)
        .json({ message: "Berhasil mengambil history user", history });
    })
    .catch((error) =>
      res.status(402).json({ message: "Gagal mengambil history user", error })
    );
};

exports.getSingleHistory = (req, res, next) => {
  const { id } = req.params;
  user_game_history
    .findByPk(id)
    .then((history) => {
      res
        .status(200)
        .json({ message: "Berhasil mengambil history user", history });
    })
    .catch((error) =>
      res.status(402).json({ message: "Gagal mengambil history user", error })
    );
};

exports.createHistory = (req, res, next) => {
  const { skor, user_id } = req.body;
  console.log({ skor, user_id });
  user_game_history
    .create({
      skor,
      user_id,
    })
    .then((history) => {
      res.status(201).json({
        message: "Berhasil menambah history user",
        data: { user_id, skor },
      });
    })
    .catch((error) =>
      res.status(401).json({ message: "Gagal menambah history user", error })
    );
};

exports.updateHistory = (req, res, next) => {
  const { skor } = req.body;
  user_game_history
    .update(
      {
        skor,
      },
      { where: { user_history_id: req.params.id } }
    )
    .then((biodata) => {
      res.status(201).json({
        message: "Success mengupdate biodata",
        biodata,
      });
    })
    .catch((error) =>
      res.status(401).json({ message: "Error mengupdate biodata", error })
    );
};

exports.deleteHistory = (req, res, next) => {
  const { id } = req.params;
  user_game_history
    .destroy({ where: { user_history_id: id } })
    .then((result) =>
      res.status(201).json({ message: "Berhasil menghapus data", result })
    )
    .catch((error) =>
      res.status(401).json({ message: "Gagal menghapus data", error })
    );
};
