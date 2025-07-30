import { Router } from "express";
import { getCoins, getAllCoinHistory, getCoinHistory } from "../controllers/coinController";

const router = Router();

router.get('/coins', getCoins);
router.get('/history', getAllCoinHistory);
router.get('/history/:coinId', getCoinHistory);


export default router;
