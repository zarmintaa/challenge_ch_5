const { user_game_biodata } = require("../models");

exports.getBiodataUser = (req, res, next) => {
  const { id } = req.params;
  user_game_biodata.findByPk(id).then((biodata) => {
    res.render("detail-biodata", {
      active: true,
      biodata: biodata.user,
      id,
    });
  });
};

exports.addBiodata = (req, res, next) => {
  const id = req.query.id;
  const { nama, bio, gender } = req.body;

  user_game_biodata
    .create({
      nama,
      bio,
      gender,
      user_id: id,
    })
    .then((result) => {
      res.redirect(`/user/detail/${id}`);
    });
};

exports.getFormBiodata = (req, res, next) => {
  res.render("add-biodata", {
    id: req.params.id,
  });
};

exports.editBiodata = (req, res, next) => {
  const { id } = req.params;
  const { nama, bio, gender } = req.body;
  const user_id = req.query.uid;

  user_game_biodata
    .update(
      {
        nama,
        bio,
        gender,
      },
      { where: { user_game_id: id } }
    )
    .then((result) => {
      res.redirect(`/user/detail/${user_id}`);
    });
};

exports.getEditBiodata = (req, res, next) => {
  const { id } = req.params;
  user_game_biodata.findByPk(id).then((biodata) => {
    res.render("edit-biodata", {
      active: true,
      biodata,
      id,
    });
  });
};
