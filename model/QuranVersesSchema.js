const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuranVersesSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const QuranVerses = mongoose.model("QuranVerses", QuranVersesSchema);

module.exports = QuranVerses;
