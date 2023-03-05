import { Table } from '@geist-ui/react'

interface ResuleSetProps {
  data: Record<string, string>[]
}

export const ResultSet = ({ data }: ResuleSetProps) => {
  if (data.length === 0) {
    return <></>
  }

  const columns = Object.keys(data[0])

  const NewTable = () => {
    return (
      <Table data={data} hover={false}>
        {columns?.map((c: string, index: number) => {
          return (
            <Table.Column
              key={c.concat(index.toString())}
              prop={c}
              label={c}
            ></Table.Column>
          )
        })}
      </Table>
    )
  }

  return <NewTable />
}
