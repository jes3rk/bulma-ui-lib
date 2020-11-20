import * as React from 'react';
import { BaseHTMLProps } from './BaseElements';

export interface InputProps extends BaseHTMLProps {
    type?: 'number'|'password'|'text';
    value?: number|string;
}

export const Input = (props: InputProps): JSX.Element => {
    return <input {...props}/>
}