import postgres from "postgres";

const sql = postgres("postgresql://localhost:5432/evarue");

// eslint-disable-next-line no-undef
export { sql };

class DB {
  sql;

  constructor(pg) {
    this.sql = pg;
  }
}

// const db = new DB(sql);
// export default db;
