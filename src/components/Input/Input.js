import React from 'react'

import { InputContainer } from './styles';

function Input({value, onChange, ...rest}) {
  return (
    <InputContainer>
        <input placeholder='Digite o nome do repositório' value={value} onChange={onChange} {...rest}/>
    </InputContainer>
  )
}

export default Input
