import { Button } from '@/components/ui/button'
import { Effect } from 'effect'
import { Dispatch, SetStateAction } from 'react'

import { formatQuery } from '../lib/sql'
import { PublishDialog } from './PublishDialog'

interface ActionButtonsArgs {
  queryDraft: string
  setQueryDraft: Dispatch<SetStateAction<string>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const ActionButtons = ({
  queryDraft,
  setQueryDraft,
  query,
  setQuery,
}: ActionButtonsArgs) => {
  return (
    <div className="flex flex-row flex-wrap m-4 gap-x-1 sm:gap-x-2 gap-y-2">
      <Button
        onClick={() => {
          setQuery(queryDraft)
        }}
      >
        Execute SQL
      </Button>

      <Button
        onClick={() => {
          const query = Effect.runSync(formatQuery(queryDraft))
          setQueryDraft(query)
        }}
      >
        Format SQL
      </Button>

      <PublishDialog query={query}></PublishDialog>
    </div>
  )
}
