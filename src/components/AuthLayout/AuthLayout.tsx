import React from "react";
import { Outlet } from "react-router-dom";
import styles from './AuthLayout.module.css'
import img from '../../assets/success-pizza.png'

const AuthLayout: React.FC = () => {

    return (
        <div className={styles['auth-wrapper']}>
            <div className={styles['logo-wrapper']}>
                <h1>Pizza Store</h1>
                <img className={styles['logo']} src={img} alt="logo" />
            </div>

            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;