-- CreateTable
CREATE TABLE "LowPrivilegedUserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "acceptedTermsOfService" BOOLEAN NOT NULL,
    "acceptedTermsOfServiceAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LowPrivilegedUserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LowPrivilegedUserProfile_userId_key" ON "LowPrivilegedUserProfile"("userId");

-- AddForeignKey
ALTER TABLE "LowPrivilegedUserProfile" ADD CONSTRAINT "LowPrivilegedUserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
