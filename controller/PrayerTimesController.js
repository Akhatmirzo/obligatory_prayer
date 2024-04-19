const PrayerTimes = require("../model/PrayerTimesSchema");
const User = require("../model/UserSchema");
const { increaseDateByOneDay } = require("../utils/helper");

exports.PrayerTimeSend = async (req, res) => {
  const prayerTime = req.body;

  if (!prayerTime) {
    return res.status(400).send({ error: "Informations was not found" });
  }

  const { bomdod, peshin, asr, shom, xufton } = prayerTime;

  const isPrayerData = bomdod || peshin || asr || shom || xufton;

  if (!isPrayerData) {
    return res.status(400).send({ error: "Informations was not found" });
  }

  try {
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(400).send({ error: "User not found" });
    }

    const data = {
      ...prayerTime,
      date: userData.obligatoryTime,
      completed: true,
      userId: req.userId,
    };

    const newPrayerTime = new PrayerTimes(data);

    const obligatoryTime = increaseDateByOneDay(userData.obligatoryTime);

    const userChangeData = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $set: {
          obligatoryTime,
        },
      }
    );

    if (!userChangeData) {
      return res.status(400).send({ error: "Wrong Informations" });
    } else {
      await newPrayerTime.save();

      return res.status(201).send({
        message: "PrayerTime save successfully",
        data: newPrayerTime,
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while creating PrayerTime",
      description: error,
    });
  }
};

exports.PrayerTimeGet = async (req, res) => {
  const id = req.userId;

  try {
    const PrayersData = await PrayerTimes.find({userId: id});

    if (!PrayersData || PrayersData.length === 0) {
      return res.status(400).send({ error: "PrayerTime not found" });
    }

    return res.status(200).send({
      message: "PrayerTimes was found",
      data: [...PrayersData],
    });

  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while getting PrayerTime",
      description: error,
    });
  }
};
