import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const SchemaTree = ({ data }: { data: Record<string, string>[] }) => {
  if (!data) {
    return <></>
  }

  let structureDataTree: Record<string, string[]> = {}
  if (data) {
    data.forEach((d) => {
      structureDataTree[d.tableName] = (
        structureDataTree[d.tableName] || []
      ).concat(d.columnName)
    })
  }

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {Object.keys(structureDataTree).map((key) => {
          return (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger className="w-16">{key}</AccordionTrigger>
              <div className="grid grid-cols-4 gap-2 pt-2 grid-row">
                {structureDataTree[key].map((c) => (
                  <AccordionContent key={key + c} className="col-1">
                    {c}
                  </AccordionContent>
                ))}
              </div>
            </AccordionItem>
          )
        })}
      </Accordion>
    </>
  )
}
