-- CreateEnum
CREATE TYPE "ClickType" AS ENUM ('contact_reveal', 'website', 'phone', 'email');

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "contact_name" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "website" TEXT,
    "address_line1" TEXT,
    "address_line2" TEXT,
    "city" TEXT,
    "county" TEXT,
    "postcode" TEXT,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coverage_postcodes" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "postcode_area" TEXT NOT NULL,

    CONSTRAINT "coverage_postcodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_clicks" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "click_type" "ClickType" NOT NULL DEFAULT 'website',
    "clicked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_ip" TEXT,
    "user_postcode" TEXT,

    CONSTRAINT "website_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coverage_postcodes_postcode_area_idx" ON "coverage_postcodes"("postcode_area");

-- AddForeignKey
ALTER TABLE "coverage_postcodes" ADD CONSTRAINT "coverage_postcodes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website_clicks" ADD CONSTRAINT "website_clicks_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
