import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useElectric } from 'app/Providers'
import { createStrategy } from 'app/actions/createStrategy'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import slugify from 'slugify'
import { v4 as uuid } from 'uuid'

interface Props {
  query: string
}

export const PublishDialog = ({ query }: Props) => {
  const electric = useElectric()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState(uuid())
  const [name, setName] = useState(id)
  const [description, setDescription] = useState('')

  useEffect(() => {
    setId(slugify(name, { lower: true }))
  }, [name])

  if (!electric) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          Publish
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish your FPL strategy?</DialogTitle>
          <DialogDescription>
            You strategy will be available at: <br />
            <a href={`https://fpl.com/strategy/${id}`}>
              https://fpl.com/strategy/{id}
            </a>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              className="col-span-3"
            />
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input
              placeholder="Best strategy ever!!"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              await createStrategy(id, name, description, query)
              setIsOpen(false)
              router.push(`/strategy/${id}`)
            }}
          >
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
