const User = require("../models/User.js");
const Post = require("../models/Post.js");

/* READ */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { firstName, lastName, bio, picturePath, location, occupation } =
      req.body;

    await User.findOneAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        bio,
        picturePath,
        location,
        occupation,
        picturePath: req.file?.filename,
      }
    );

    const savedUser = await User.findById(id);
    const p = await Post.updateMany(
      { userId: id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          location: location,
          userPicturePath: savedUser.picturePath,
        },
      }
    );

    delete savedUser.password;
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((_id) => _id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  addRemoveFriend,
  updateUser,
  getUserFriends,
  getUser,
};
