import express from "express";
import {
  getTemperatureReadings,
  createTemperatureReading,
  updateTemperatureReading,
  deleteTemperatureReading,
} from "../controllers/temperature";

const router = express.Router();

router.get("/temperature", getTemperatureReadings);
router.post("/temperature", createTemperatureReading);
router.put("/temperature/:id", updateTemperatureReading);
router.delete("/temperature/:id", deleteTemperatureReading);

export default router;
