import { definePrismaConfig } from "@prisma/cli-engine";

export default definePrismaConfig({
  // Contract configuration – source schema and output directory
  contract: {
    source: "prisma/schema.prisma",
    output: "prisma/contract",
  },
  // Composer section describes the data model contract (datasource + generator)
  composer: {
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
  },
  // Empty orm section required for the contract workflow – filled with minimal valid objects
  orm: {
    adapter: {
      // Minimal required fields for a no‑op adapter
      id: "dummy-adapter",
      kind: "adapter",
      version: "1.0.0",
      familyId: "dummy-family",
      targetId: "dummy-target",
      create: () => ({}),
    },
    family: {
      id: "dummy-family",
      kind: "family",
      version: "1.0.0",
      familyId: "dummy-family",
      emission: {},
      create: () => ({}),
    },
    target: {
      id: "dummy-target",
      kind: "target",
      version: "1.0.0",
      familyId: "dummy-family",
      targetId: "dummy-target",
      create: () => ({}),
    },
  },
  // No custom skills needed for now
  skills: {},
});