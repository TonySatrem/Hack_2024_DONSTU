import knex from "knex"

export default knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DB_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
    },
})