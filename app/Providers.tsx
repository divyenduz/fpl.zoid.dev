'use client'

import { makeElectricContext } from 'electric-sql/react'
import { useEffect, useState } from 'react'

import { Electric } from '../src/generated/client'
import { initElectric } from './initElectric'

const { ElectricProvider, useElectric } = makeElectricContext<Electric>()

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  const [electric, setElectric] = useState<Electric | null>(null)
  useEffect(() => {
    async function f() {
      const { electric } = await initElectric()
      setElectric(electric)
    }
    f()
  }, [])

  if (!electric) {
    return <>{children}</>
  }

  return <ElectricProvider db={electric}>{children}</ElectricProvider>
}

export { useElectric }
