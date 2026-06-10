import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Used by CLI for `db push` or migrations (must be direct connection)
    url: process.env.DIRECT_URL
  }
})
