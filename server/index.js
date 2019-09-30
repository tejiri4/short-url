import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./models";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { findOne } from "./services/dbServices";

dotenv.config();

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  uploads: false,
  introspection: true,
  playground: {
    endpoint: `/graphql`
  },
});

const app = express();
app.use(cors());
server.applyMiddleware({ app });

const router = express.Router();

app.use(router);

app.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome to short url app." })
);

app.get("/:character", async (req, res) => {
  const option = {
    where: {
      shortUrl: `${process.env.BACKEND_BASE_URL}${req.params.character}`
    }
  };

  try {
    const { realUrl } = await findOne(db.Url, option);
    res.redirect(realUrl);
  } catch (e) {
    res.status(404).json({ message: "Route not found." });
  }
});

// Handle routes not found
app.use("*", (req, res) =>
  res.status(404).json({ message: "Route not found." })
);

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);

export default server;
