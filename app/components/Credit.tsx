'use client'

import { AppCss } from 'app/page'

interface Props {
  lastUpdated?: string
}

export const Credit = ({ lastUpdated }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className={AppCss.Card}>
        <label className={AppCss.NoteCss}>Data Source Credits: </label>
        <a
          href="https://github.com/vaastav/Fantasy-Premier-League"
          target="_blank"
        >
          https://github.com/vaastav/Fantasy-Premier-League
        </a>
      </div>
      <div className={AppCss.Card}>
        <label className={AppCss.NoteCss}>Last Updated: </label>
        <span>{lastUpdated || 'Loading'}</span>
      </div>
    </div>
  )
}
