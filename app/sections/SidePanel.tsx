'use client'

import { Strategy } from '@prisma/client'
import { useElectric } from 'app/Providers'
import { Card } from 'app/components/Card'
import { SchemaTree } from 'app/components/SchemaTree'
import { useSQL } from 'app/hooks/useSQL'
import { getAllColumns } from 'app/lib/sql'
import { useLiveQuery } from 'electric-sql/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { FPL_DB_PATH, SQL_WASM_WASM_PATH } from './Dashboard'

export const Strategies = () => {
  const electric = useElectric()
  const [strategies, setStrategies] = useState<Strategy[]>([])

  useEffect(() => {
    if (!electric) {
      return
    }
    const { db } = electric

    const { results } = useLiveQuery(
      db.Strategy.liveMany({
        orderBy: {
          updatedAt: 'desc',
        },
      }),
    )
    setStrategies(results)

    async function f() {
      const strategyShape = await db.Strategy.sync()
      await strategyShape.synced
    }
    f()
  }, [electric])

  return (
    <>
      {strategies.length > 0 && (
        <Card title="Strategies">
          {strategies?.map((strategy) => {
            return (
              <div key={strategy.id} className="w-full my-2">
                <Link href={`/strategy/${strategy.id}`}>{strategy.name}</Link>
              </div>
            )
          })}
        </Card>
      )}
    </>
  )
}

export const SidePanel = () => {
  const { data: structureData } = useSQL<{
    tableName: string
    columnName: string
  }>({
    query: getAllColumns(),
    databasePath: FPL_DB_PATH,
    sqlWASMPath: SQL_WASM_WASM_PATH,
  })

  return (
    <>
      <Strategies></Strategies>

      <Card title="Database Schema">
        <SchemaTree data={structureData} />
      </Card>
    </>
  )
}
