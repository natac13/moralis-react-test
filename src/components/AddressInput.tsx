import { Close } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'

export interface AddressInputProps {
  input: string
  setInput: React.Dispatch<React.SetStateAction<strting>>
}

export const AddressInput: React.FC<AddressInputProps> = (props) => {
  const { input, setInput } = props

  return (
    <Box>
      <TextField
        placeholder="Public Address 0x..."
        value={input}
        onChange={(e) => {
          setInput(e?.currentTarget?.value)
        }}
        color="primary"
        label="Address"
        fullWidth
        inputProps={{
          maxlength: 42,
        }}
        InputProps={{
          endAdornment: !!input && (
            <InputAdornment position="end" onClick={() => setInput('')}>
              <Close />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}
