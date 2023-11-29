import { calculateProfit } from "../models/tradeStatic.model.js";

async function getProfit(req, res) {
  try {
    const profits = await calculateProfit();
    res.json(profits);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { getProfit };
