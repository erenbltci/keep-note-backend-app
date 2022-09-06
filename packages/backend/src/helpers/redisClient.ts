import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT as unknown as number,
});

export default redis;
