import "dotenv/config";
import { defineConfig } from "prisma/config";

const dbUrl = process.env["DATABASE_URL"] || "";
const directUrl = process.env["DATABASE_URL"] || "";
const isStudio = process.argv.some((arg) => arg.includes("studio"));

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: isStudio && directUrl ? directUrl : dbUrl,
  },
});