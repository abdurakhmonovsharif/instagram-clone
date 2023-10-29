import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RemovedUsers from "../models/RemovedUsers";
// REGISTER //
export const Register = async (req, res) => {
  try {
    // get users
    const users = await User.find();
    const newUserOrdinal =
      users.length === 0 ? 1 : users[users.length - 1].ordinal + 1;
    const { fullname, username, birthday, email, mobile, password } = req.body;
    if (username === password) {
      res.status(401).json({
        message:
          "Your password can't be the same as your username. Please create a new one.",
      });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname,
      username,
      birthday,
      email,
      mobile,
      password: passwordHash,
      ordinal: newUserOrdinal,
    });
    const data = await newUser.save();
    res.status(201).json({ data, message: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// LOGIN //
export const Login = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    let findedUser;
    if (username) {
      findedUser = await User.findOne({ username });
    } else if (email) {
      findedUser = await User.findOne({ email });
    } else if (mobile) {
      findedUser = await User.findOne({ mobile });
    }
    if (findedUser) {
      const passwordMatch = await bcrypt.compare(password, findedUser.password);
      if (passwordMatch) {
        // Passwords match, user is authenticated
        const token = jwt.sign(
          {
            id: findedUser._id,
            expire: Date.now() + 1000 * 60 * 60, // 1 hour
          },
          process.env.JWT_SECRET_KEY
        );

        // Create a new object without ordinal,password,__v
        const userWithout = { ...findedUser._doc };
        delete userWithout.ordinal;
        delete userWithout.password;
        delete userWithout.__v;

        res
          .status(201)
          .json({ data: userWithout, token, message: "Login successful" });
      } else {
        // Passwords don't match
        res.status(401).json({
          message: `Sorry, your password was incorrect. Please double-check your password.`,
        });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE USER ITEMS //
export const UpdateUser = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const {
      fullname,
      birthday,
      email,
      username,
      bio,
      profile_image,
      gerden,
      mobile,
    } = req.body;

    const editingUser = await User.findById(user_id);
    if (editingUser) {
      editingUser.fullname = fullname;
      editingUser.birthday = birthday;
      editingUser.email = email;
      editingUser.username = username;
      editingUser.bio = bio;
      editingUser.profile_image = profile_image;
      editingUser.gerden = gerden;
      editingUser.mobile = mobile;
      // Save the updated user
      await editingUser.save();
    }
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// DELETE USER ACCOUNT FROM USERS AND SAVE TO REMOVED_USERS //
export const DeleteAccount = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const deletingUser = await User.findById(user_id);
    if (deletingUser) {
      const {
        fullname,
        birthday,
        email,
        username,
        bio,
        profile_image,
        gerden,
        mobile,
        createdAt,
      } = deletingUser;
      const removedUser = new RemovedUsers({
        fullname,
        birthday,
        email,
        username,
        bio,
        profile_image,
        gerden,
        mobile,
        account_created: createdAt,
      });
      await removedUser.save().then(async () => {
        await User.findOneAndDelete(user_id).then(() => {
          res.status(201).json({ message: "Account deleted successfully" });
        });
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
