import { Button } from '@/components/ui/button'
import { Effect } from 'effect'

import { formatQuery } from '../lib/sql'

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
        onClick={() => {
          setQuery(queryDraft)
        }}
      >
        Execute
      </Button>

      <Button
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
