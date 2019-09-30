import { UserInputError } from "apollo-server";
import stortUrl from "../util/ShortUrl";
import { findOne, create } from "../services/dbServices";
import { urlRegex } from "../util/regex";

export default {
  Query: {
    hello: () => "Hello world!"
  },
  Mutation: {
    getShortUrl: async (_, { url }, { db }) => {
      const { Url } = db;
      const option = {
        where: {
          realUrl: url
        }
      };

      if (!urlRegex.test(url)) {
        throw new UserInputError("Kindly enter a correct url.");
      }

      let shortUrl = await findOne(Url, option);

      if (!shortUrl) {
        shortUrl = await stortUrl(url);
        
        const data = {
          realUrl: url,
          shortUrl
        };

        await create(Url, data);
      } else {
        shortUrl = shortUrl.dataValues.shortUrl;
      }

      return shortUrl;
    }
  }
};
