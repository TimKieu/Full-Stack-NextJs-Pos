import {
  fetchTransaction,
  order,
  orderTransactionByBranch,
} from "@/types/fetchData";
import { prisma } from "@/pages/lib/prismaDB";
import { dataVerifyTransaction, promiseDataVerify } from "@/types/verify";
import { addMinutesToCurrentTime } from "./timeZone";
import { generateRunningNumber, getMonthNow, getYearNow } from "./utils";

const pushData = (message: string) => {
  return { message };
};

export const verifyTransactionBody = (
  data: dataVerifyTransaction
): promiseDataVerify[] => {
  const verifyStatus: promiseDataVerify[] = [];

  if (!data.tableId) verifyStatus.push(pushData("ไม่พบข้อมูล : tableId"));
  if (!data.peoples) verifyStatus.push(pushData("ไม่พบข้อมูล : peoples"));
  if (!data.expiration) verifyStatus.push(pushData("ไม่พบข้อมูล : expiration"));
  if (!data.branchId) verifyStatus.push(pushData("ไม่พบข้อมูล : branchId"));
  if (!data.employeeId) verifyStatus.push(pushData("ไม่พบข้อมูล : employeeId"));
  if (verifyStatus.length > 0) return verifyStatus;

  // ตรวจสอบว่าเป็นจำนวนเต็มเท่านั้น
  if (!Number.isInteger(data.peoples) || data.peoples <= 0)
    verifyStatus.push(
      pushData("กรุณาระบุ : peoples เป็นตัวเลขจำนวนเต็มเท่านั้น")
    );
  if (!Number.isInteger(data.branchId) || data.branchId <= 0)
    verifyStatus.push(
      pushData("กรุณาระบุ : branchId เป็นตัวเลขจำนวนเต็มเท่านั้น")
    );
  if (!Number.isInteger(data.employeeId) || data.employeeId <= 0)
    verifyStatus.push(
      pushData("กรุณาระบุ : employeeId เป็นตัวเลขจำนวนเต็มเท่านั้น")
    );
  if (!Number.isInteger(data.expiration) || data.expiration <= 0)
    verifyStatus.push(
      pushData("กรุณาระบุ : expiration เป็นตัวเลขจำนวนเต็มเท่านั้น")
    );

  // Return
  return verifyStatus;
};

export const fetchTransactionByBranchId = async (
  branchId: number
): Promise<orderTransactionByBranch[] | null> => {
  try {
    const tables = await prisma.tables.findMany({
      select: {
        id: true,
        name: true,
        stoves: true,
        people: true,
        expiration: true,
      },
      where: {
        branchId: branchId,
      },
    });

    if (tables.length === 0) return null;

    // Fetch transactions for each table in parallel
    const tablesWithTransactions: orderTransactionByBranch[] =
      await Promise.all(
        tables.map(async (item, index) => {
          const transactionOrder = await prisma.transaction.findFirst({
            select: {
              id: true,
              receipt: true,
              startOrder: true,
              endOrder: true,
              peoples: true,
            },
            where: {
              tableId: item.id,
              startOrder: {
                gte: new Date(getYearNow(), getMonthNow() - 1, 1), // Start of current month
              },
              status: "Active",
            },
          });

          return {
            ...item,
            index: index + 1,
            transactionOrder: transactionOrder || null,
          };
        })
      );

    return tablesWithTransactions;
  } catch (error) {
    // Handle any errors here or log them
    console.error("Error fetching tables:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const fetchTransactionById = async (
  id: string
): Promise<orderTransactionByBranch | null> => {
  try {
    const table = await prisma.tables.findUnique({
      select: {
        id: true,
        name: true,
        stoves: true,
        people: true,
        expiration: true,
      },
      where: {
        id: id,
      },
    });

    if (!table) {
      // Handle the case where the table with the given ID is not found
      return null;
    }

    const transactionOrder = await prisma.transaction.findFirst({
      select: {
        id: true,
        receipt: true,
        startOrder: true,
        endOrder: true,
        peoples: true,
      },
      where: {
        tableId: table.id,
        startOrder: {
          gte: new Date(getYearNow(), getMonthNow() - 1, 1), // Start of current month
        },
        status: "Active",
      },
    });

    const tableWithTransaction: orderTransactionByBranch = {
      ...table,
      transactionOrder: transactionOrder || null,
    };

    return tableWithTransaction;
  } catch (error) {
    // Handle any errors here or log them
    console.error("Error fetching table and transaction:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const fetchTransactionByCompanyId = async (
  companyId: number
): Promise<orderTransactionByBranch[] | null> => {
  try {
    const tables = await prisma.tables.findMany({
      select: {
        id: true,
        name: true,
        stoves: true,
        people: true,
        expiration: true,
      },
      where: {
        companyId: companyId,
      },
    });

    if (tables.length === 0) return null;

    // Fetch transactions for each table in parallel
    const tablesWithTransactions: orderTransactionByBranch[] =
      await Promise.all(
        tables.map(async (item, index) => {
          const transactionOrder = await prisma.transaction.findFirst({
            select: {
              id: true,
              receipt: true,
              startOrder: true,
              endOrder: true,
              peoples: true,
            },
            where: {
              tableId: item.id,
              startOrder: {
                gte: new Date(getYearNow(), getMonthNow() - 1, 1), // Start of current month
              },
              status: "Active",
            },
          });

          return {
            ...item,
            index: index + 1,
            transactionOrder: transactionOrder || null,
          };
        })
      );

    return tablesWithTransactions;
  } catch (error) {
    // Handle any errors here or log them
    console.error("Error fetching tables:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const fetchTransactionAll = async (): Promise<
  orderTransactionByBranch[] | null
> => {
  try {
    const tables = await prisma.tables.findMany({
      select: {
        id: true,
        name: true,
        stoves: true,
        people: true,
        expiration: true,
      },
    });

    if (tables.length === 0) return null;

    // Fetch transactions for each table in parallel
    const tablesWithTransactions: orderTransactionByBranch[] =
      await Promise.all(
        tables.map(async (item, index) => {
          const transactionOrder = await prisma.transaction.findFirst({
            select: {
              id: true,
              receipt: true,
              startOrder: true,
              endOrder: true,
              peoples: true,
            },
            where: {
              tableId: item.id,
              status: "Active",
            },
          });

          return {
            ...item,
            index: index + 1,
            transactionOrder: transactionOrder || null,
          };
        })
      );

    return tablesWithTransactions;
  } catch (error) {
    // Handle any errors here or log them
    console.error("Error fetching tables:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const getReceiptOrder = async (branchId: number): Promise<string> => {
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        branchId: branchId,
        startOrder: {
          gte: new Date(getYearNow(), getMonthNow() - 1, 1), // Start of current month
        },
      },
    });
    const receiptCode = await prisma.branch.findUnique({
      select: {
        codeReceipt: true,
      },
      where: {
        id: branchId,
      },
    });

    if (receiptCode && transaction) {
      const newReceiptCode = generateRunningNumber(
        receiptCode.codeReceipt,
        transaction.length
      );

      return newReceiptCode;
    }

    return "";
  } catch (error) {
    // Handle any errors here or log them
    console.error("Error fetching tables:", error);
    return "";
  } finally {
    await prisma.$disconnect();
  }
};

export const insertTransaction = async (
  body: dataVerifyTransaction
): Promise<fetchTransaction | null> => {
  try {
    const receipt = await getReceiptOrder(body.branchId);

    const addTransaction = await prisma.transaction.create({
      data: {
        tableId: body.tableId,
        receipt: receipt,
        startOrder: new Date(),
        endOrder: addMinutesToCurrentTime(body.expiration),
        peoples: body.peoples,
        totalPrice: 0.0,
        branchId: body.branchId,
        employeeId: body.employeeId,
        status: "Active",
      },
    });

    return addTransaction;
    //   return addTransaction as order;
  } catch (error: unknown) {
    // Handle any errors here or log them
    console.error("Error add employee:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const closeDataTransaction = async (id: string): Promise<fetchTransaction | null> => {
  try {

    const transaction = await prisma.transaction.update({
        where: { id },
        data: {
            status: "InActive"
        },
    });

    if (!transaction) return null;
    return transaction as fetchTransaction;
} catch (error) {
    console.error('Error updating transaction:', error);
    return null;
} finally {
    await prisma.$disconnect();
}
}