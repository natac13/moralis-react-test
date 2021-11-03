import { Close, Link as LinkIcon, LinkOff } from '@mui/icons-material'
import {
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useMoralis } from 'react-moralis'
import { AddressInput } from './AddressInput'
import { ethers } from 'ethers'
import { getEllipsisText } from '../utils/getEllipsisText'
import { useMoralisDapp } from '../providers/moralisDappProvider'

export interface LinkAccountProps {}

export const LinkAccount: React.FC<LinkAccountProps> = (props) => {
  const {} = props
  const { Moralis, user, isAuthenticated } = useMoralis()
  const { walletAddress } = useMoralisDapp()

  const userAccounts = user?.attributes?.accounts

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const { control, setValue } = form

  React.useEffect(() => {
    const unsub = Moralis.onAccountsChanged(async (accounts) => {
      console.log(isAuthenticated, walletAddress, accounts)
      if (isAuthenticated && accounts[0] !== walletAddress) {
        const confirmed = confirm('Link this address to your account?')
        if (confirmed) {
          await Moralis.link(accounts[0])
        }
      }
    })

    return () => {
      unsub()
    }
  }, [isAuthenticated])

  return (
    <Box>
      {/* <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Link Accounts
        </Typography>
        <Controller
          name="address"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <TextField
              inputRef={ref}
              {...rest}
              placeholder="Public Address 0x..."
              color="primary"
              label="Address"
              fullWidth
              inputProps={{
                maxlength: 42,
              }}
              InputProps={{
                endAdornment: !!rest?.value && (
                  <InputAdornment
                    position="end"
                    onClick={() => rest?.onChange('')}
                  >
                    <Close />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<LinkIcon />}
          fullWidth
          sx={{ mt: 2 }}
        >
          Link
        </Button>
      </Box> */}
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          UnLink Accounts
        </Typography>
        <List>
          {userAccounts?.map((acc, idx) => (
            <ListItem
              button
              key={acc}
              // disabled={idx === 0}
              onClick={async () => {
                await Moralis.unlink(acc)
              }}
            >
              <ListItemText>{getEllipsisText(acc)}</ListItemText>
              <ListItemIcon>
                <LinkOff />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
