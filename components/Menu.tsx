import { Button, ButtonGroup } from '@geist-ui/react'
import { Github, HeartFill, Twitter } from '@geist-ui/react-icons'
import Link from 'next/link'

export const Menu = () => {
  return (
    <ButtonGroup>
      <Link href="/" passHref>
        <Button type="secondary">FPL.lol Home</Button>
      </Link>
      <Link href="/how-it-works" passHref>
        <Button type="secondary">How it works</Button>
      </Link>
      <Link href="/top-strategies" passHref>
        <Button type="secondary">Top Strategies</Button>
      </Link>
      <Link href="https://twitter.com/divyenduz" passHref target="_blank">
        <Button icon={<Twitter />} type="secondary">
          Contact me!
        </Button>
      </Link>
      <Link
        href="https://github.com/divyenduz/fpl.lol"
        passHref
        target="_blank"
      >
        <Button icon={<Github />} type="secondary">
          Source Code
        </Button>
      </Link>
      <Link href="https://trackfootball.app" target="_blank">
        <Button icon={<HeartFill />} type="secondary">
          TrackFootball.app
        </Button>
      </Link>
    </ButtonGroup>
  )
}
