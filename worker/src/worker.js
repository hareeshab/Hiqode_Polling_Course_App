import 'dotenv/config';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { pool } from './db.js';

const connection = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
const queueName = process.env.QUEUE_NAME || 'votes';

// Ensure schema exists at start (idempotent on every boot)
await pool.query(`
  CREATE TABLE IF NOT EXISTS votes (
    id BIGSERIAL PRIMARY KEY,
    poll_id UUID NOT NULL,
    option_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  );
`);

const w = new Worker(queueName, async job => {
  const { pollId, optionId } = job.data;
  await pool.query(
    'INSERT INTO votes (poll_id, option_id) VALUES ($1, $2)',
    [pollId, optionId]
  );
}, { connection });

w.on('ready', () => console.log('Worker ready'));
w.on('failed', (job, err) => console.error('Job failed', job?.id, err));
