'use client'

import { useElectric } from 'app/Providers'
import { Card } from 'app/components/Card'
import { SchemaTree } from 'app/components/SchemaTree'
import { useSQL } from 'app/hooks/useSQL'
import { initElectric } from 'app/initElectric'
import { getAllColumns } from 'app/lib/sql'
import { useLiveQuery } from 'electric-sql/react'
import Link from 'next/link'
import { useEffect } from 'react'

import { FPL_DB_PATH, SQL_WASM_WASM_PATH } from './Dashboard'

interface Props {
  db: Awaited<ReturnType<typeof initElectric>>['electric']['db']
}

export const Strategies = ({ db }: Props) => {
  const { results: strategies } = useLiveQuery(
    db.Strategy.liveMany({
      orderBy: {
        updatedAt: 'desc',
      },
    }),
  )

  useEffect(() => {
    async function f() {
      const strategyShape = await db.Strategy.sync()
      await strategyShape.synced
    }
    f()
  }, [])

  return (
    <Card title="Strategies">
      {strategies?.map((strategy) => {
        return (
          <div key={strategy.id} className="w-full my-2">
            <Link href={`/strategy/${strategy.id}`}>{strategy.name}</Link>
          </div>
        )
      })}
    </Card>
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

  const electric = useElectric()

  return (
    <>
      {electric && <Strategies db={electric?.db}></Strategies>}

      <Card title="Database Schema">
        <SchemaTree data={structureData} />
      </Card>
    </>
  )
}
