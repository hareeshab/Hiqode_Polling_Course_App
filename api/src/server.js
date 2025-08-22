import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import { voteQueue } from './queue.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get('/api/health', (_, res) => res.json({ ok: true }));

// Get poll & options
app.get('/api/poll', async (_, res) => {
  const pollId = '11111111-1111-1111-1111-111111111111';
  const poll = await pool.query('SELECT id, question FROM polls WHERE id=$1', [pollId]);
  const options = await pool.query('SELECT id, label FROM options WHERE poll_id=$1', [pollId]);
  res.json({ poll: poll.rows[0], options: options.rows });
});

// Submit vote → push to Redis Queue
app.post('/api/vote', async (req, res) => {
  const { optionId } = req.body;
  if (!optionId) return res.status(400).json({ error: 'optionId required' });
  await voteQueue.add('vote', { optionId, pollId: '11111111-1111-1111-1111-111111111111' });
  res.json({ queued: true });
});

// Results endpoint (aggregated counts)
app.get('/api/results', async (_, res) => {
  const sql = `
    SELECT o.label, COUNT(v.id)::int AS votes
    FROM options o
    LEFT JOIN votes v ON v.option_id = o.id
    WHERE o.poll_id = '11111111-1111-1111-1111-111111111111'
    GROUP BY o.id
    ORDER BY o.label;
  `;
  const { rows } = await pool.query(sql);
  res.json({ results: rows });
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`API listening on :${port}`));
