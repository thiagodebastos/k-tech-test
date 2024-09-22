import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
}));
