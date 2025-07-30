const { Router } = require("express");
const { getCoins, getAllCoinHistory, getCoinHistory } = require("../controllers/coinController");

const router = Router();

router.get('/coins', getCoins);
router.get('/history', getAllCoinHistory);
router.get('/history/:coinId', getCoinHistory);


module.exports = router;
