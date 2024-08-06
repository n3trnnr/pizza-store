import styles from './Cart.module.css'
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useEffect, useState } from 'react';
import { dec, getProductById, inc, postOrder, remove } from '../../store/cart.slice';
import { IProductData } from '../../interfaces/interfaces';
import { DELIVERY_FEE } from '../../constants/constants';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { products, productsCart, error } = useAppSelector((state) => state.cart)
    const user = useAppSelector((state) => state.user.user)
    const [isOrder, setIsOrder] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getProductById(productsCart))
    }, [productsCart])

    useEffect(() => {
        if (!productsCart.length) {
            setIsOrder(false)
        } else {
            setIsOrder(true)
        }
    }, [productsCart])

    const productsCount = (id: number) => {
        const filtered = productsCart.filter((item) => item.id === id)
        const pizzasCount = filtered.reduce((acc, i) => {
            return acc += i.count
        }, 0)
        return pizzasCount
    }

    const currentPizzaPrice = (item: IProductData) => {
        const product = productsCart.find((i) => {
            if (i.id === item.id) {
                return i
            }
        })

        if (product) {
            const sum = item.price * product.count
            return sum
        }
        return;
    }

    const totalPrice = productsCart.map((i) => {
        const product = products.find((j) => j.id === i.id)
        if (product) {
            return product.price * i.count
        } else {
            return 0
        }
    }).reduce((acc, item) => {
        return acc += item
    }, 0)

    const submit = () => {
        if (user.id) {
            const order = {
                userId: user.id,
                products: products,
                productsCart: productsCart
            }
            dispatch(postOrder(order))
            navigate('/success')
        }
    }

    return (
        <div className={styles['cart-wrapper']}>
            <h2>Корзина</h2>
            <div className={styles['items-list-wrapper']}>
                <ul className={styles['items-list']}>
                    {!products.length && <div>Корзина пустая</div>}
                    {error && <div>Ошибка загрузки</div>}
                    {products.map((item) => (
                        <li key={item.id} className={styles['item']}>
                            <div className={styles['pizza-img']} style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className={styles['description-wrapper']}>
                                <div className={styles['description']}>{item.name}</div>
                                <div className={styles['pizza-price']}>{currentPizzaPrice(item)}₽</div>
                            </div>
                            <div className={styles['dec-inc-wrapper']}>
                                <button onClick={() => dispatch(dec(item.id))} className={styles['dec']}>-</button>
                                <span>
                                    {productsCount(item.id) > 0 ? productsCount(item.id) : 1}
                                </span>
                                <button onClick={() => dispatch(inc(item.id))} className={styles['inc']}>+</button>
                            </div>
                            <button onClick={() => dispatch(remove(item.id))} className={styles['delete']}>&times;</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles['promocode']}>
                <Input appearance={'big'} type="text" placeholder="Промокод" />
                <Button styleName={styles['button-promocode']} appearance={'small'}>Промокод</Button>
            </div>

            <div className={styles['final-count-wrapper']}>
                <div className={styles['sum-wrapper']}>
                    <span className={styles['sum']}>Итог</span>
                    <span className={styles['sum-price']}>{totalPrice}р</span>
                </div>
                <div className={styles['delivery-wrapper']}>
                    <span className={styles['delivery']}>Доставка</span>
                    <span className={styles['delivery-price']}>{DELIVERY_FEE}р</span>
                </div>
                <div className={styles['sum-delivery-wrapper']}>
                    <span >
                        Итог
                        <span>
                            ({productsCart.reduce((acc, i) => {
                                return acc += i.count
                            }, 0)})
                        </span>
                    </span>
                    <span>{!totalPrice ? 0 : totalPrice + DELIVERY_FEE}р</span>
                </div>
                <Button disabled={!isOrder ? true : false} onClick={submit} styleName={cn({
                    [styles['disabled']]: !isOrder
                })} appearance={'big'}>Оформить</Button>
            </div>
        </div>
    );
}

export default Cart;