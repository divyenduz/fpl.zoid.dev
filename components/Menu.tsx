import { Button, ButtonGroup } from '@geist-ui/react'
import { Github, HeartFill, Twitter } from '@geist-ui/react-icons'
import React from 'react'

export const Menu = () => {
  return (
    <ButtonGroup>
      <a href="/">
        <Button type="secondary">FPL.lol Home</Button>
      </a>
      <a href="https://twitter.com/divyenduz" target="_blank">
        <Button icon={<Twitter />} type="secondary">
          Contact me!
        </Button>
      </a>
      <a href="https://github.com/divyenduz/fpl.zoid.dev" target="_blank">
        <Button icon={<Github />} type="secondary">
          Source Code
        </Button>
      </a>
      <a href="https://trackfootball.app" target="_blank">
        <Button icon={<HeartFill />} type="secondary">
          TrackFootball.app
        </Button>
      </a>
    </ButtonGroup>
  )
}
