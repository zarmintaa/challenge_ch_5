const { user_game } = require("../models");
const UserHelper = require("../helpers/UserHelper");
const bycript = require("bcryptjs");

exports.getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  const singleUser = await UserHelper.getSingleUser(id);
  const userBiodata = await UserHelper.getUserBiodata(id);
  const userHistory = await UserHelper.getUserHistory(id);

  res.render("detail-user", {
    title: "Detail User",
    user: singleUser,
    biodata: userBiodata,
    histories: userHistory,
    parseDate: (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  });
};

exports.addSkor = async (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  //   res.redirect(`/user/${id}`);
};

exports.addUserPage = (req, res, next) => {
  res.render("add-user");
};

exports.addUser = async (req, res, next) => {
  const { nama, image, email, password } = req.body;
  bycript
    .hash(password, 12)
    .then((hashed) => {
      user_game.create({ nama, image, email, password: hashed });
    })
    .then((result) => {
      res.redirect("/");
    });
};

exports.editUserPage = (req, res, next) => {
  const user_id = req.params.id;
  user_game.findByPk(user_id).then((user) => {
    res.render("edit-user", {
      title: "Edit User",
      user,
    });
  });
};

exports.editUser = (req, res, next) => {
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
      res.redirect(`/user/detail/${req.params.id}`);
    });
};

exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  user_game
    .destroy({ where: { user_id: id } })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
