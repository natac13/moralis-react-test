import { Box, Button, Typography } from '@mui/material'
import * as React from 'react'
import { useMoralis, useMoralisSubscription } from 'react-moralis'
import { useMoralisDapp } from '../providers/moralisDappProvider'
import { getEllipsisText } from '../utils/getEllipsisText'

export interface AccountProps {}

export const Account: React.FC<AccountProps> = (props) => {
  const {} = props
  const { authenticate, isAuthenticated, logout, enableWeb3, user, Moralis } =
    useMoralis()
  const { walletAddress } = useMoralisDapp()

  const userAccounts = user?.attributes?.accounts

  console.log({ user })

  const handleAuth = () => {
    authenticate({
      signingMessage: 'Test message',
    })
    enableWeb3()
  }

  if (!isAuthenticated) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        mb={3}
      >
        <Typography>Please Authenticate</Typography>
        <Button variant="outlined" color="secondary" onClick={handleAuth}>
          Now
        </Button>
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      mb={3}
    >
      <Typography variant="h5">Welcome To the Moralis Test App</Typography>
      <Typography align="center">{getEllipsisText(walletAddress)}</Typography>
      <Button onClick={logout}>Logout</Button>
    </Box>
  )
}
