import { Elysia } from "elysia";

const app = new Elysia()
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
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
