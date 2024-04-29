import { PrismaClient } from '@prisma/client'
import Dashboard from 'app/sections/Dashboard'
import { SidePanel } from 'app/sections/SidePanel'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

async function Strategy({ params: { id } }: Props) {
  const prisma = new PrismaClient()
  const strategy = await prisma.strategy.findUnique({
    where: {
      id,
    },
  })
  if (!strategy) {
    return notFound()
  }

  return (
    <div className="grid w-full grid-cols-4 gap-2 grid-row">
      <div className="col-span-3">
        <Dashboard
          name={strategy.name}
          queryFromDatabase={strategy.sql}
        ></Dashboard>
      </div>
      <div className="col-span-1">
        <SidePanel></SidePanel>
      </div>
    </div>
  )
}

export default Strategy
