-- CreateTable
CREATE TABLE "public"."Province" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "provinceId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."District" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."City" ADD CONSTRAINT "City_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "public"."Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."District" ADD CONSTRAINT "District_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "public"."City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
