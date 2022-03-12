import { Table } from '@geist-ui/react'

export const ResultSet = ({
  columns,
  data,
}: {
  columns: string[]
  data: Record<string, string>[]
}) => {
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
