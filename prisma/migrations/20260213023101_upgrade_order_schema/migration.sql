-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "paymentInfo" JSONB,
ADD COLUMN     "pricingSummary" JSONB,
ADD COLUMN     "rpgAnalytics" JSONB,
ADD COLUMN     "shippingInfo" JSONB,
ADD COLUMN     "statusHistory" JSONB;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productSnapshot" JSONB;
