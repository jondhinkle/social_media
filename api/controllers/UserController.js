const User = require('../models/User');
const Friendship = require('../models/Friendship');

const UserController = () => {
  const getUser = async (req, res) => {
    return res.status(200).json({ user: req.user });
  };

  const getUsers = async (req, res) => {
    try {
      const { size, page } = parsePaginationQuery(req.query);

      const result = await User.findAndCountAll({
        limit: size,
        offset: (page - 1) * size,
      });

      return res.status(200).json({
        totalCount: result.count,
        count: result.rows.length,
        users: result.rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getFriends = async (req, res) => {
    try {
      const friends = await Friendship.getForUserId(req.user.id) || [];
      return res.status(200).json({
        totalCount: friends.length,
        friends,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getUser,
    getUsers,
    getFriends,
  };
};

UserController.middleware = {
  fetchOneUser: async (req, res, next) => {
    try {
      if (Number.isInteger(parseInt(req.params.id, 10))) {
        req.user = await User.findByPk(req.params.id);
      }

      if (req.user) {
        return next();
      }

      return res.status(404).json({ msg: 'Not Found: user not found' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },
};

function parsePaginationQuery(query) {
  let { size, page } = query;
  size = parseInt(size, 10);
  page = parseInt(page, 10);

  if (!Number.isInteger(size) || size < 0) {
    size = 10;
  }
  if (!Number.isInteger(page) || page < 0) {
    page = 1;
  }

  return { size, page };
}

module.exports = UserController;
