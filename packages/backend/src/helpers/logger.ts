import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time": "${new Date()}"`,
});

export default logger;
