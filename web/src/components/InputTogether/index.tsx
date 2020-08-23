import React, { InputHTMLAttributes } from 'react';

import './styles.css'

interface InputTogetherProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    name: string;
    firstElement?: boolean;
    lastElement?: boolean;
    type?: string;
}

const InputTogether: React.FC<InputTogetherProps> = ({ placeholder, name, firstElement, lastElement, type, ...rest }) => {
    return (
        <div className="inputTogether-block">
            <input
                className={firstElement ? 'inputTogether-first-input' : lastElement ? 'inputTogether-last-input' : ''}
                type={type}
                placeholder={placeholder}
                id={name} {...rest}
            />
        </div>
    )
}

export default InputTogether;