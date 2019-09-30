import db from "../models";
import { findOne } from "../services/dbServices";

const shortUrl = async () => {
  const baseUrl = process.env.BACKEND_BASE_URL;
  const letters = "abcdefghilklmnopqrstuvwxyz1234567890";
  let shortUrl = baseUrl;
  for (let i = 0; i < 6; i++) {
    shortUrl += letters.charAt(Math.floor(Math.random() * 36));
  }

  const option = {
    where: {
      shortUrl
    }
  };

  const findShortUrl = await findOne(db.Url, option);

  if (!findShortUrl) {
    return shortUrl;
  }

  shortUrl();
};

export default shortUrl;
