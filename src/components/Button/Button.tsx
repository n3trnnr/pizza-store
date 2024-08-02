import React from "react";
import { IButton } from "./Button.props";
import styles from './Button.module.css'
import cn from 'classnames'


const Button: React.FC<IButton> = ({ children, appearance, styleName, ...props }) => {

    return (
        <button
            {...props}
            className={cn(styles.button, {
                [styles['big']]: appearance === 'big',
                [styles['small']]: appearance === 'small',
                [styleName!]: styleName
            })}
        >
            {children}
        </button>
    )
}

export default Button