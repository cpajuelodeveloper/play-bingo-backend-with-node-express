var express = require('express');
var router = express.Router();
const { MIN, MAX, INTERVAL_BETWWEEN_COLUMNS, ROW_LENGTH } = require('../constants');
const { caller } = require('../controllers/caller');
const Card = require('../models/Card');

const calls = []
const cards = []

/* GET users listing. */
router.get('/call', function(_, res) {

  if(calls.length >= MAX) return res.json({ call: null, calls })

  const call = caller(MIN, MAX, calls)
  calls.push(call)

  return res.json({ call, calls })
});

router.get('/cards/take', function(_, res) {
  const card = new Card({ intervalBetweenColumns: INTERVAL_BETWWEEN_COLUMNS, rowLength: ROW_LENGTH});
  cards.push(card)

  return res.json({ cardNumber: cards.length, card: card.getGrid() })
});

router.get('/cards/check/:id', function(req, res) {
  const card = cards[req.params.id - 1];
  if(!card) return res.status(400).json({ error: "card not set" });
  const winner = card.isWinner(calls)
  return res.json({ cardNumber: +req.params.id, winner, options: card.getGrid() });
});

router.get('/cards/check-all', function(_, res) {
  if(!cards.length) return res.status(400).json({ error: "cards not set" });
  const checkings = []
  cards.map((card, index) => {
    const winner = card.isWinner(calls)
    checkings.push({ cardNumber: (index + 1), winner, options: card.getGrid() })
  })
  return res.json(checkings);
});

module.exports = router;
