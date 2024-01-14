export class DatabaseCreationError extends Error {
  readonly _tag = 'DatabaseCreationError'
}

export class QueryExecutionError extends Error {
  readonly _tag = 'QueryExecutionError'
}
