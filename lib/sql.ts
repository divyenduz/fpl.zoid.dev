import { format } from "sql-formatter"
import { QueryExecResult, SqlValue } from "sql.js"

export function formatQuery(query: string) {
	try {
		return format(query, {
			language: 'postgresql',
			uppercase: true,
		})
	} catch (e) {
		console.error(`Failed to format SQL`)
		console.error(e)
		return query
	}
}

export function getRowDataFromResultSet(columns: string[], result: QueryExecResult[]): { tableName: string; columnName: string }[] {
	const data = result?.[0]?.values.map((row: SqlValue[]) => {
		return row.reduce((acc, column: SqlValue, index) => {
			return {
				...acc,
				[`${columns?.[index]}`]: column,
			}
		}, {})
	})
	return data as { tableName: string; columnName: string }[]
}

export function getDefaultQuery() {
	return `SELECT
	printf('%s %s (%s)', first_name, second_name, element_type) AS name,
	total_points,
	minutes,
	now_cost AS price,
	influence,
	threat,
	creativity
FROM
	players
WHERE
	position = 'GK'
ORDER BY
	CAST(total_points AS INTEGER)
	DESC,
	CAST(minutes AS INTEGER)
	DESC
LIMIT 20`
}

export function getAllColumns() {
	return `
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
}