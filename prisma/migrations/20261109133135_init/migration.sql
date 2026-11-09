-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holding" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "valuation" INTEGER NOT NULL,
    "avgCost" INTEGER NOT NULL,
    "currentNav" INTEGER NOT NULL,
    "pl" INTEGER NOT NULL,
    "plPercent" DOUBLE PRECISION NOT NULL,
    "monthlyContribution" INTEGER,
    "orderDay" INTEGER,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grid" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "memo" TEXT,
    "pair" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "rangeMin" DOUBLE PRECISION NOT NULL,
    "rangeMax" DOUBLE PRECISION NOT NULL,
    "trapCount" INTEGER NOT NULL,
    "step" DOUBLE PRECISION NOT NULL,
    "lotPerTrap" INTEGER NOT NULL,
    "totalLot" INTEGER NOT NULL,
    "profitWidth" DOUBLE PRECISION NOT NULL,
    "profitAmount" INTEGER NOT NULL,
    "stopLoss" DOUBLE PRECISION NOT NULL,
    "rangeShift" BOOLEAN NOT NULL,
    "trail" BOOLEAN NOT NULL,
    "activePositions" INTEGER NOT NULL,
    "heldUnits" INTEGER NOT NULL,
    "avgPrice" DOUBLE PRECISION NOT NULL,
    "unrealizedPL" INTEGER NOT NULL,
    "positionPL" INTEGER NOT NULL,
    "swapPL" INTEGER NOT NULL,
    "totalStrategyPL" INTEGER NOT NULL,
    "trapsJson" TEXT NOT NULL,

    CONSTRAINT "Grid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioSnapshot" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "dataJson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Grid_orderNumber_key" ON "Grid"("orderNumber");

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grid" ADD CONSTRAINT "Grid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioSnapshot" ADD CONSTRAINT "PortfolioSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
