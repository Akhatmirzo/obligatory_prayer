const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prayerTimesSchema = new Schema({
  bomdod: {
    type: Boolean,
    required: true,
  },
  peshin: {
    type: Boolean,
    required: true,
  },
  asr: {
    type: Boolean,
    required: true,
  },
  shom: {
    type: Boolean,
    required: true,
  },
  xufton: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PrayerTimes = mongoose.model("PrayerTimes", prayerTimesSchema);

module.exports = PrayerTimes;
