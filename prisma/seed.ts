// prisma/seed.ts
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // MASTER ADMIN user
  const master = await prisma.user.upsert({
    where: { email: "maisuapp@gmail.com" },
    update: {},
    create: {
      name: "Shirley (Master Admin)",
      email: "maisuapp@gmail.com",
      role: Role.MASTER_ADMIN,
    },
  });

  // STANDARD USER (empty portfolio)
  await prisma.user.upsert({
    where: { email: "standard@example.com" },
    update: {},
    create: {
      name: "Standard User",
      email: "standard@example.com",
      role: Role.STANDARD_USER,
    },
  });

  // Insert SBI holdings for master
  const sbiHoldings = [
    { id: 1, name: "SBI・iシェアーズ・ゴールドファンド（為替ヘッジなし）", account: "NISA_GROWTH", valuation: 315444, avgCost: 16584, currentNav: 23249, pl: 90431, plPercent: 40.19, monthlyContribution: 30000, orderDay: 15 },
    { id: 2, name: "野村世界業種別投資シリーズ（世界半導体株投資）", account: "NISA_GROWTH", valuation: 315333, avgCost: 194027, currentNav: 253810, pl: 74274, plPercent: 30.81, monthlyContribution: 30000, orderDay: 15 },
    { id: 3, name: "SBI・V・S&P500インデックス・ファンド", account: "TOKUTEI", valuation: 107743, avgCost: 18136, currentNav: 39080, pl: 57743, plPercent: 115.49, monthlyContribution: 0, orderDay: null },
    { id: 4, name: "iシェアーズ 米国株式（S&P500）インデックス・ファンド", account: "NISA_GROWTH", valuation: 204227, avgCost: 59930, currentNav: 80509, pl: 52203, plPercent: 34.34, monthlyContribution: 50000, orderDay: 15 },
    { id: 5, name: "SBI・V・S&P500インデックス・ファンド", account: "NISA_TSUMITATE", valuation: 156831, avgCost: 27411, currentNav: 39080, pl: 46828, plPercent: 42.57, monthlyContribution: 55000, orderDay: 2 },
    { id: 6, name: "eMAXIS Slim 米国株式（S&P500）", account: "NISA_TSUMITATE", valuation: 127208, avgCost: 30250, currentNav: 42755, pl: 37206, plPercent: 41.34, monthlyContribution: 30000, orderDay: 15 },
    { id: 7, name: "One高配当利回り厳選ジャパン", account: "NISA_GROWTH", valuation: 86733, avgCost: 20604, currentNav: 29784, pl: 26733, plPercent: 44.56, monthlyContribution: 20000, orderDay: 15 },
    { id: 8, name: "eMAXIS Slim 米国株式（S&P500）", account: "NISA_GROWTH", valuation: 47962, avgCost: 26743, currentNav: 42755, pl: 17962, plPercent: 59.87, monthlyContribution: 0, orderDay: null },
    { id: 9, name: "SBI全世界高配当株式ファンド（年4回決算型）", account: "NISA_GROWTH", valuation: 81235, avgCost: 10380, currentNav: 13253, pl: 17610, plPercent: 27.68, monthlyContribution: 20000, orderDay: 15 },
    { id: 10, name: "SBI・V・米国高配当株式インデックス・ファンド", account: "NISA_GROWTH", valuation: 57533, avgCost: 17230, currentNav: 24782, pl: 17532, plPercent: 43.83, monthlyContribution: 20000, orderDay: 15 },
    { id: 11, name: "ブラックロックESG世界株式ファンド（為替ヘッジなし）", account: "NISA_GROWTH", valuation: 61596, avgCost: 34941, currentNav: 47827, pl: 16596, plPercent: 36.88, monthlyContribution: 5000, orderDay: 15 },
    { id: 12, name: "iFreeNEXT FANG+インデックス", account: "NISA_GROWTH", valuation: 53361, avgCost: 66435, currentNav: 88625, pl: 13361, plPercent: 33.40, monthlyContribution: 10000, orderDay: 15 },
    { id: 13, name: "NZAM・ベータ 米国2資産（株式＋REIT）", account: "NISA_GROWTH", valuation: 40985, avgCost: 18754, currentNav: 25621, pl: 10985, plPercent: 36.61, monthlyContribution: 10000, orderDay: 15 },
    { id: 14, name: "SBI・V・S&P500インデックス・ファンド", account: "NISA_GROWTH", valuation: 150618, avgCost: 36328, currentNav: 39080, pl: 10607, plPercent: 7.57, monthlyContribution: 0, orderDay: null },
    { id: 15, name: "eMAXIS Slim 米国株式（S&P500）", account: "TOKUTEI_AMOUNT", valuation: 17414, avgCost: 24552, currentNav: 42755, pl: 7414, plPercent: 74.14, monthlyContribution: 0, orderDay: null },
    { id: 16, name: "eMAXIS Slim バランス（8資産均等型）", account: "NISA_GROWTH", valuation: 15947, avgCost: 15634, currentNav: 20604, pl: 3847, plPercent: 31.79, monthlyContribution: 0, orderDay: null },
    { id: 17, name: "eMAXIS Slim バランス（8資産均等型）", account: "TOKUTEI_AMOUNT", valuation: 10953, avgCost: 15049, currentNav: 20604, pl: 2953, plPercent: 36.91, monthlyContribution: 0, orderDay: null },
  ];

  for (const h of sbiHoldings) {
    await prisma.holding.upsert({
      where: { id: h.id },
      update: {},
      create: {
        id: h.id,
        name: h.name,
        account: h.account,
        valuation: h.valuation,
        avgCost: h.avgCost,
        currentNav: h.currentNav,
        pl: h.pl,
        plPercent: h.plPercent,
        monthlyContribution: h.monthlyContribution,
        orderDay: h.orderDay,
        userId: master.id,
      },
    });
  }

  // Insert Toraripi grids (store traps as JSON strings)
  const toraripiData = {
    depositedMargin: 1348491,
    effectiveMargin: 1308935,
    unrealizedPL: -39556,
    positionPL: -53340,
    swapPL: 13784,
    marginMaintenanceRatio: 1031,
    totalRequiredMargin: 301713,
    positionRequiredMargin: 126850,
    orderRequiredMargin: 174863,
    availableForNewOrders: 1007222,
    withdrawableAmount: 993438,
  };

  // USD/JPY grid sample (traps JSON will be generated later)
  const usdJpyGrid = {
    orderNumber: "600000000699490",
    memo: "USD/JPY_1,000_21_2026/03/20",
    pair: "USD/JPY",
    side: "BUY",
    initialDate: new Date("2026-03-20"),
    rangeMin: 149.9,
    rangeMax: 165.9,
    trapCount: 21,
    step: 0.8,
    lotPerTrap: 1000,
    totalLot: 21000,
    profitWidth: 0.8,
    profitAmount: 800,
    stopLoss: 149.4,
    rangeShift: true,
    trail: false,
    activePositions: 8,
    heldUnits: 8000,
    avgPrice: 160.7,
    unrealizedPL: -14496,
    positionPL: -19376,
    swapPL: 4880,
    totalStrategyPL: 35942,
    trapsJson: JSON.stringify([
      { index: 1, buy: 165.9, sell: 166.7, status: "PENDING" },
      { index: 2, buy: 165.1, sell: 165.9, status: "PENDING" },
      { index: 3, buy: 164.3, sell: 165.1, status: "PENDING" },
      { index: 4, buy: 163.5, sell: 164.3, status: "HELD", pl: -4392, posPl: -5222, swap: 830 },
      { index: 5, buy: 162.7, sell: 163.5, status: "HELD", pl: -3660, posPl: -4422, swap: 762 },
      { index: 6, buy: 161.9, sell: 162.7, status: "HELD", pl: -2860, posPl: -3622, swap: 762 },
      { index: 7, buy: 161.1, sell: 161.9, status: "HELD", pl: -2060, posPl: -2822, swap: 762 },
      { index: 8, buy: 160.3, sell: 161.1, status: "HELD", pl: -1260, posPl: -2022, swap: 762 },
      { index: 9, buy: 159.5, sell: 160.3, status: "HELD", pl: -735, posPl: -1222, swap: 487 },
      { index: 10, buy: 158.7, sell: 159.5, status: "HELD", pl: 65, posPl: -422, swap: 487 },
      { index: 11, buy: 157.9, sell: 158.7, status: "HELD", pl: 406, posPl: 378, swap: 28 },
      { index: 12, buy: 157.1, sell: 157.9, status: "PENDING" },
      { index: 13, buy: 156.3, sell: 157.1, status: "PENDING" },
      { index: 14, buy: 155.5, sell: 156.3, status: "PENDING" },
      { index: 15, buy: 154.7, sell: 155.5, status: "PENDING" },
      { index: 16, buy: 153.9, sell: 154.7, status: "PENDING" },
      { index: 17, buy: 153.1, sell: 153.9, status: "PENDING" },
      { index: 18, buy: 152.3, sell: 153.1, status: "PENDING" },
      { index: 19, buy: 151.5, sell: 152.3, status: "PENDING" },
      { index: 20, buy: 150.7, sell: 151.5, status: "PENDING" },
      { index: 21, buy: 149.9, sell: 150.7, status: "PENDING" },
    ]),
  };

  await prisma.grid.upsert({
    where: { orderNumber: usdJpyGrid.orderNumber },
    update: {},
    create: {
      ...usdJpyGrid,
      userId: master.id,
    },
  });

  // You could add the GBP/JPY grid similarly if needed.

  // Snapshot for Toraripi
  await prisma.portfolioSnapshot.create({
    data: {
      userId: master.id,
      type: "TORARIPI",
      dataJson: JSON.stringify(toraripiData),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

