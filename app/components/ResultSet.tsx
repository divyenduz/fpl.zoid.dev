import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ResuleSetProps {
  data: Record<string, string>[]
}

export const ResultSet = ({ data }: ResuleSetProps) => {
  const columns = Object.keys(data[0])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => {
            return <TableHead key={column}>{column.toUpperCase()}</TableHead>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => {
          return (
            <TableRow key={index}>
              {columns.map((column) => {
                return <TableCell key={column}>{row[column]}</TableCell>
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
