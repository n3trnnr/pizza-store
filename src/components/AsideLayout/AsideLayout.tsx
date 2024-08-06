import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import avatar from '../../assets/avatar.jpg'
import Button from "../Button/Button";
import styles from './AsideLayout.module.css'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { logout as exit, getUserProfile } from "../../store/user.slice";
import { useEffect } from "react";

// cn('Дефолтный стиль', {
//     'Стиль при выполнении условия' : 'условие',
//     'Стиль при выполнении условия' : 'условие',
//     'Стиль при выполнении условия' : 'условие',
// })

const AsideLayout = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { email, id, name } = useAppSelector((state) => state.user.user)
    const productsCart = useAppSelector((state) => state.cart.productsCart)

    useEffect(() => {
        if (id) dispatch(getUserProfile(id))
    }, [])

    const logout = () => {
        dispatch(exit())
        navigate('/')
    }

    return (
        <aside className={styles['aside']}>
            <div className={styles.user}>
                <div className={styles['img-mask']}>
                    <img className={styles.avatar} src={avatar} alt="avatar" />
                </div>
                <div>{name}</div>
                <div>{email}</div>
            </div>

            <div className={styles['menu-wrapper']}>
                <Link to='/' className={location.pathname === '/' ? styles['active'] : ''}>Меню</Link>
                <NavLink to='/cart' style={{ display: 'flex', alignItems: 'center' }} className={({ isActive }) => isActive ? styles['active'] : ''}>
                    Корзина
                    <div className={styles['cart-count']}>
                        {productsCart.reduce((acc, i) => {
                            return acc += i.count
                        }, 0)}
                    </div>
                </NavLink>
                <NavLink to='/delivery' className={({ isActive }) => cn('', { [styles.active]: isActive })}>Доставка</NavLink>
            </div>
            <Button onClick={logout} appearance={"small"} styleName={styles['log-out-button']}>
                Выйти
            </Button>
        </aside>
    );
}

export default AsideLayout;