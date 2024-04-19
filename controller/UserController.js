const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");
const PrayerTimesSchema = require("../model/PrayerTimesSchema");
const { calculateAge, calc12_age } = require("../utils/helper");

//* POST => Register User
exports.registerUser = async (req, res) => {
  const { username, password, birthday } = req.body;

  let errorMessage = "";

  if (!username || !password || !birthday) {
    errorMessage = "Please provide username, password or birthday";
  } else if (password.length < 6) {
    errorMessage = "Password must be at least 6 characters long";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  }

  try {
    const foundUser = await User.find({ username }).exec();
    if (foundUser.length > 0) {
      return res.status(400).send({
        error: "This user has already registered!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const age = calculateAge(birthday);
    const obligatoryTime = calc12_age(birthday);
    const age12Time = obligatoryTime;

    // Creating new admin
    const newUser = new User({
      username,
      birthday,
      age,
      obligatoryTime,
      age12Time,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while creating the user",
      description: error,
    });
  }

  const token = jwt.sign(
    {
      username,
      role: "user",
    },
    process.env.jwt_secret_key
  );

  res.status(201).send({
    message: "User created successfully",
    token,
  });
};

//* POST => Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  let errorMessage = "";
  if (!username || !password) {
    errorMessage = "Username and Password are required";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  } else if (!username) {
    return res.status(400).send({
      error: "Invalid Username",
    });
  }

  try {
    const foundUser = await User.find({ username }).exec();
    if (foundUser.length > 0) {
      bcrypt.compare(password, foundUser[0].password, (err, decoded) => {
        if (!decoded) {
          return res.status(400).send({
            error: "Invalid Password",
          });
        }
        const token = jwt.sign(
          {
            username,
            role: "user",
          },
          process.env.jwt_secret_key
        );

        return res.status(200).send({
          message: "User successfully authenticated",
          token,
        });
      });
    } else {
      return res.status(400).send({
        error: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).send({
      err,
      description: err,
    });
  }
};

// * DELETE => delete user
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (id == "me") {
      const user = await User.findByIdAndDelete(req.userId).exec();

      if (!user) {
        return res.status(400).send({
          error: "User not found",
        });
      } else {
        await PrayerTimesSchema.find({ userId: req.userId }).deleteMany({});
      }

      return res.status(200).send({
        message: "User was deleted",
      });
    }

    return res.status(400).send({
      error: "You can't delete other users",
    });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while deleting User",
      description: error,
    });
  }
};

//* GET => Get user
exports.getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(400).send({
        error: "User not found",
      });
    }

    return res.status(200).send({
      message: "User was found",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while getting users",
      description: error,
    });
  }
};

//* POST => Logout User
exports.logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send({ error: "Token was not found" });
    }

    jwt.verify(
      token,
      process.env.jwt_secret_key,
      async function (err, decoded) {
        if (err) {
          res.code(400).send({
            error: "Invalid Token",
          });
        }
      }
    );

    return res.status(200).send({
      message: "User successfully logged out",
    });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while logging out user",
      description: error,
    });
  }
};
