import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import db from "./models";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  uploads: false
});

const app = express();
app.use(cors());
server.applyMiddleware({ app });

const router = express.Router();

app.use(router);

app.get("/:character", async (req, res) => {
  const { realUrl } = await db.url.findOne({
    where: {
      shortUrl: `${process.env.BACKEND_BASE_URL}${req.params.character}`
    }
  });

  res.redirect(realUrl);
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({
    data: {
      message: "Route not found."
    },
  });
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

export default server;
