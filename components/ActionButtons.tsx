import { Button } from '@geist-ui/react'

import { formatQuery } from '../lib/sql'
import { Effect } from 'effect'

interface ActionButtonsArgs {
  queryDraft: string
  setQueryDraft: any
  setQuery: any
}

export const ActionButtons = ({
  queryDraft,
  setQueryDraft,
  setQuery,
}: ActionButtonsArgs) => {
  return (
    <div className="flex flex-row flex-wrap m-4 gap-x-1 sm:gap-x-2 gap-y-2">
      <Button
        ghost
        type="secondary"
        onClick={() => {
          setQuery(queryDraft)
        }}
      >
        Execute
      </Button>

      <Button
        ghost
        type="secondary"
        onClick={() => {
          const query = Effect.runSync(formatQuery(queryDraft))
          setQueryDraft(query)
        }}
      >
        Format SQL
      </Button>
    </div>
  )
}
