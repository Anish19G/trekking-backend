// src/config/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
});

// Migrations
// npx typeorm-ts-node-commonjs migration:generate -d src/config/data-source.ts src/migrations/AddTitleToItinerary


// npx typeorm-ts-node-commonjs migration:run -d src/config/data-source.ts