import { Button, Snippet, useClipboard } from '@geist-ui/react'
import { useRouter } from 'next/router'
import { encodeHash } from '../lib/base64'
import { formatQuery } from '../lib/sql'

interface ActionButtonsArgs {
  queryDraft: string
  setQueryDraft: any
  setQuery: any
  text: string
  slugLength: number
}

function getUrl({ text, queryDraft }: any) {
  const urlStateHash = encodeHash({ text, queryDraft })
  const protocol = window.location.hostname.startsWith('local')
    ? 'http://'
    : 'https://'
  return protocol + window.location.host + '/' + urlStateHash
}

function saveAndCopyHandler({ text, queryDraft, copy, setToast, router }: any) {
  const urlStateHash = encodeHash({ text, queryDraft })

  copy(getUrl({ text, queryDraft }))

  router.replace(urlStateHash, undefined, {
    shallow: true,
  })
}

export const ActionButtons = ({
  queryDraft,
  setQueryDraft,
  setQuery,
  text,
  slugLength,
}: ActionButtonsArgs) => {
  const router = useRouter()
  const { copy } = useClipboard()

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
          setQueryDraft(formatQuery(queryDraft))
        }}
      >
        Format SQL
      </Button>

      <Snippet
        className={'m-4'}
        text={`Save and copy URL (${slugLength} chars)`}
        width="300px"
        onClick={() => {
          saveAndCopyHandler({ text, queryDraft, copy, router })
        }}
      />
    </div>
  )
}
