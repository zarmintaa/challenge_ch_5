const {
  user_game_history,
  user_game,
  user_game_biodata,
} = require("../models");

exports.deleteHistory = (req, res, next) => {
  const { id } = req.params;
  const userId = req.query.uid;
  console.log(userId);

  user_game_history
    .destroy({ where: { user_history_id: id } })
    .then((result) => {
      console.log();
      res.redirect(`/user/detail/${userId}`);
    });
};

exports.addHistory = (req, res, next) => {
  const { skor, id } = req.body;
  user_game_history
    .create({
      skor: +skor,
      user_id: id,
    })
    .then((history) => {
      res.redirect(`/user/detail/${id}`);
    });
};
