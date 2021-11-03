import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { AddressInput } from '../src/components/AddressInput'
import { Account } from '../src/components/Account'
import { LinkAccount } from '../src/components/LinkAccount'

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Account />
        <LinkAccount />
      </Box>
    </Container>
  )
}
