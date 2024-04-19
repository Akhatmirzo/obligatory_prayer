const QuranVerses = require("../model/QuranVersesSchema");

exports.quranVersesPost = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      error: "Not Body Object",
    });
  }

  if (!req?.body?.text || !req?.body?.text === undefined) {
    return res.status(400).send({
      error: "Invalid Body Object key or value",
    });
  }

  try {
    const QuranVersesText = await QuranVerses({ ...req.body });

    await QuranVersesText.save();

    return res.status(201).send({
      message: "Quran Verses was created",
      QuranVerse: QuranVersesText,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal Server Error",
    });
  }
};

exports.quranVersesGet = async (req, res) => {
  try {
    const QuranVersesTexts = await QuranVerses.find().exec();

    if (QuranVersesTexts.length === 0) {
      return res.status(404).send({
        error: "No Quran Verses found",
      });
    }

    return res.status(200).send({
      message: "Quran Verses was found",
      data: [...QuranVersesTexts],
    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal Server Error",
      description: error,
    });
  }
};
