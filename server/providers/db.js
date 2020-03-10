const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const adapterConfig = new FileSync("config.json");
const db = low(adapter);
const config = low(adapterConfig);

// With lowdb/FileAsync
db.read();
console.log("database has loaded");
config.read();

// Set some defaults (required if your JSON file is empty)
db.defaults({
  count: 0
}).write();

export { config };

export default db;
