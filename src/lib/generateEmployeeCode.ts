import { prisma } from "@/db";

export const generateEmployeeCode = async (
  firstName: string,
  lastName: string,
  joinDate: Date
) => {
  const COMPANY_CODE = "OI";

  const initilals = firstName[0].toUpperCase() + lastName[0].toUpperCase();

  const year = joinDate.getFullYear();

  const count = await prisma.employee.count({
    where: {
      joinDate: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
    },
  });

  const serial = String(count + 1).padStart(3, "0");

  return `${COMPANY_CODE}${initilals}${year}${serial}`;
};
