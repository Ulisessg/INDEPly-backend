import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ error: false });
});

export default router;
