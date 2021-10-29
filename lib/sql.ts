export function getAllColumns() {
    const sql = `
SELECT
  m.name AS tableName,
  p.name AS columnName
FROM
  sqlite_master m
  LEFT OUTER JOIN pragma_table_info((m.name)) p ON m.name <> p.name
ORDER BY
  tableName,
  columnName;
    `
    return sql
}