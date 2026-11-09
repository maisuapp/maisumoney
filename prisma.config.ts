import { definePrismaConfig } from "@prisma/cli-engine";

export default definePrismaConfig({
  datasource: {
    db: {
      provider: "sqlite",
      url: process.env.DATABASE_URL,
    },
  },
  generator: {
    client: {
      provider: "prisma-client-js",
    },
  },
  // Required empty orm section for the new contract workflow
  orm: {
    adapter: {},
    family: {},
    target: {},
  },
});
