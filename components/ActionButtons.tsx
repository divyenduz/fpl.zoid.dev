import { Button, useClipboard, useToasts } from '@geist-ui/react'
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

export const ActionButtons = ({
  queryDraft,
  setQueryDraft,
  setQuery,
  text,
  slugLength,
}: ActionButtonsArgs) => {
  const router = useRouter()
  const [, setToast] = useToasts()
  const { copy } = useClipboard()

  return (
    <div className="space-x-1">
      <div className="m-2"></div>
      <Button
        shadow
        type="secondary"
        onClick={() => {
          setQueryDraft(formatQuery(queryDraft))
        }}
      >
        Format SQL
      </Button>

      <Button
        shadow
        type="secondary"
        onClick={() => {
          setQuery(queryDraft)
        }}
      >
        Execute
      </Button>

      <Button
        shadow
        type="secondary"
        onClick={() => {
          const urlStateHash = encodeHash({ text, queryDraft })

          const protocol = window.location.hostname.startsWith('local')
            ? 'http://'
            : 'https://'
          copy(protocol + window.location.host + '/' + urlStateHash)
          setToast({ text: 'URL copied to clipboard!' })

          router.replace(urlStateHash, undefined, {
            shallow: true,
          })
        }}
      >
        Save and copy URL ({slugLength} / 2048)
      </Button>
      <div className="m-2"></div>
    </div>
  )
}
