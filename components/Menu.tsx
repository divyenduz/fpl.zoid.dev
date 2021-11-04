import Link from 'next/link'
import { Button, Card, Note, Textarea } from '@geist-ui/react'

import { Twitter } from '@geist-ui/react-icons'

export const Menu = () => {
  return (
    <div className="flex flex-row flex-wrap m-4 gap-x-1 sm:gap-x-2 gap-y-2">
      <Link href="/" passHref>
        <Button type="secondary">FPL.cool Home</Button>
      </Link>
      <Link href="/how-it-works" passHref>
        <Button type="secondary">How it works</Button>
      </Link>
      <Link href="/top-strategies" passHref>
        <Button type="secondary">Top Strategies</Button>
      </Link>
      <Link href="https://twitter.com/divyenduz" passHref>
        <a className="block" target="_blank" style={{ color: 'inherit' }}>
          <Button icon={<Twitter />} type="secondary">
            Contact me!
          </Button>
        </a>
      </Link>
    </div>
  )
}
