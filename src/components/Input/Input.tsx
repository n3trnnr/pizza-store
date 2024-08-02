import React from "react";
import { IInput } from "./Input.props";
import cn from 'classnames'
import styles from './Input.module.css'

const Input: React.FC<IInput> = ({ labelName, appearance, ...props }) => {

    return (
        <label className={cn(styles.label, {
            [styles['label-big']]: appearance === 'big'
        })}>
            {labelName && <span className={styles['label-title']}>{labelName}</span>}
            <input {...props} className={cn(styles.input,
                {
                    [styles['input-big']]: appearance === 'big',
                    [styles['input-small']]: appearance === 'small',
                })} />
        </label>
    );
}

export default Input;