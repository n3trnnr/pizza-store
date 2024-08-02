import AsideLayout from "../AsideLayout/AsideLayout";
import { Outlet } from "react-router-dom";
import styles from './Layout.module.css'

const Layout = () => {

    return (
        <div style={{ display: 'flex' }}>
            <AsideLayout />
            <div className={styles['content']}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;