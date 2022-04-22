const {
  user_game,
  user_game_history,
  user_game_biodata,
} = require("../models");

exports.getSingleUser = async (id) => {
  const response = await user_game.findByPk(id);
  return response;
  //   user_game.findByPk(id).then((user) => console.log(user));
};

exports.getAllUsers = async () => {
  const response = await user_game.findAll();
  return await response.map((user) => user.dataValues);
};

exports.getUserBiodata = async (id) => {
  const response = await user_game_biodata.findOne({ where: { user_id: id } });
  return response;
};

exports.getUserHistory = async (id) => {
  const response = await user_game_history.findAll({
    where: { user_id: id },
  });
  return response;
};
