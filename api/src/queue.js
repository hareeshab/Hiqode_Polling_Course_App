import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
export const voteQueue = new Queue(process.env.QUEUE_NAME || 'votes', { connection });
