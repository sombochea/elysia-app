import { apollo, gql } from "@elysiajs/apollo";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(
    apollo({
      path: "/graphql",
      context: async ({ request }) => {
        const authorization = request.headers.get('authorization')
        if (!authorization) {
          return {}
        }
        // console.log("Authorization", authorization)
        return {
          authorization
        }
      },
      typeDefs: gql`
          type Book {
              title: String
              author: String
          }

          type Query {
              books: [Book]
          }
      `,
      resolvers: {
        Query: {
          books: () => {
            return [
              {
                title: 'Elysia',
                author: 'saltyAom',
              },
              {
                title: 'Bun on the run',
                author: 'Sambo Chea',
              }
            ]
          }
        }
      }
    })
  )
  .get("/", () => "ok")
  .get("/health", () => {
    return {
      status: "ok",
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      version: process.version,
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
