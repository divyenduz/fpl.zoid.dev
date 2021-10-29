import dynamic from 'next/dynamic'

import type { Editor as EditorType } from '@prisma/text-editors'

const Editor = dynamic<EditorType>(
  //@ts-expect-error
  () => import('@prisma/text-editors').then((mod) => mod.Editor),
  {
    ssr: false,
  }
)

const DynamicEditor = (props: any) => <Editor {...props} />
export default DynamicEditor
