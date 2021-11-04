import { Tree } from '@geist-ui/react'

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
      {Object.keys(structureDataTree).map((key) => {
        return (
          <Tree key={key}>
            <Tree.Folder name={key}>
              {structureDataTree[key].map((c) => (
                <Tree.File key={key + c} name={c}></Tree.File>
              ))}
            </Tree.Folder>
          </Tree>
        )
      })}
    </>
  )
}
