'use client'

import { Card } from './Card'

interface Props {
  lastUpdated?: string
}

export const Credit = ({ lastUpdated }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2 grid-row">
      <Card title="Data Source Credits">
        <a
          href="https://github.com/vaastav/Fantasy-Premier-League"
          target="_blank"
        >
          https://github.com/vaastav/Fantasy-Premier-League
        </a>
      </Card>

      <Card title="Last Updated">
        <span>{lastUpdated || 'Loading'}</span>
      </Card>
    </div>
  )
}
