export default [
  {
    "statements": [
      "CREATE TABLE \"Strategy\" (\n  \"id\" TEXT NOT NULL,\n  \"updatedAt\" TEXT(3) NOT NULL,\n  \"name\" TEXT NOT NULL,\n  \"text\" TEXT NOT NULL,\n  \"sql\" TEXT NOT NULL,\n  CONSTRAINT \"Strategy_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.Strategy', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_Strategy_primarykey;",
      "CREATE TRIGGER update_ensure_main_Strategy_primarykey\n  BEFORE UPDATE ON \"main\".\"Strategy\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_Strategy_into_oplog;",
      "CREATE TRIGGER insert_main_Strategy_into_oplog\n   AFTER INSERT ON \"main\".\"Strategy\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.Strategy')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'Strategy', 'INSERT', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'name', new.\"name\", 'sql', new.\"sql\", 'text', new.\"text\", 'updatedAt', new.\"updatedAt\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_Strategy_into_oplog;",
      "CREATE TRIGGER update_main_Strategy_into_oplog\n   AFTER UPDATE ON \"main\".\"Strategy\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.Strategy')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'Strategy', 'UPDATE', json_object('id', new.\"id\"), json_object('id', new.\"id\", 'name', new.\"name\", 'sql', new.\"sql\", 'text', new.\"text\", 'updatedAt', new.\"updatedAt\"), json_object('id', old.\"id\", 'name', old.\"name\", 'sql', old.\"sql\", 'text', old.\"text\", 'updatedAt', old.\"updatedAt\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_Strategy_into_oplog;",
      "CREATE TRIGGER delete_main_Strategy_into_oplog\n   AFTER DELETE ON \"main\".\"Strategy\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.Strategy')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'Strategy', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('id', old.\"id\", 'name', old.\"name\", 'sql', old.\"sql\", 'text', old.\"text\", 'updatedAt', old.\"updatedAt\"), NULL);\nEND;"
    ],
    "version": "20240426141745_466"
  }
]