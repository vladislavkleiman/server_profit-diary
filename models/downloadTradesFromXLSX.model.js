import db from "../config/db.js";
import moment from "moment";

const formatDate = (dateString) => {
  return moment(dateString, "MM/DD/YYYY").format("YYYY-MM-DD");
};

const formatTime = (excelTime) => {
  if (typeof excelTime === "number") {
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const millisecondsSinceStartOfDay = excelTime * millisecondsInADay;

    const startOfDay = new Date(0, 0, 0);

    startOfDay.setMilliseconds(millisecondsSinceStartOfDay);

    return moment(startOfDay).format("HH:mm:ss");
  } else {
    return moment(excelTime, "HH:mm:ss").format("HH:mm:ss");
  }
};

import ExcelJS from "exceljs";

const readExcelFile = async (filePath) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          const headerCell = worksheet.getRow(1).getCell(colNumber);
          const header = headerCell.value.toString();
          rowData[header] = cell.value;
        });
        data.push(rowData);
      }
    });

    return data;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    throw error;
  }
};

const insertDataFromExcel = async (filePath, userId) => {
  const data = await readExcelFile(filePath);

  const formattedData = data.map((raw) => ({
    user_id: parseInt(userId),
    datetrades: formatDate(raw["Date Trades"]),
    currency: raw["Currency"],
    side: raw["Side"].charAt(0),
    symbol: raw["Symbol"],
    qty: parseInt(raw["Qty"]),
    price: parseFloat(raw["Price"]).toFixed(2),
    exectime: formatTime(raw["Exec Time"]),
    grossproceeds: parseFloat(raw["Gross Proceeds"]).toFixed(2),
    netproceeds: parseFloat(raw["Net Proceeds"]).toFixed(2),
  }));

  try {
    await db("tradestransaction").insert(formattedData);
    const uniqueDates = [
      ...new Set(formattedData.map((item) => item.datetrades)),
    ];
    return uniqueDates;
  } catch (error) {
    console.error("Error inserting data into database:", error);
    throw error;
  }
};

const getTradesData = (date) => {
  if (date) {
    return db("tradestransaction")
      .select("*")
      .whereRaw("DATE(datetrades) = ?", [date]);
  } else {
    return db("tradestransaction").select("*");
  }
};

export { insertDataFromExcel, getTradesData };
