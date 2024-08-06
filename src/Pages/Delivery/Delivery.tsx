import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import styles from './Delivery.module.css'
import { getCart } from "../../store/cart.slice";
import DeliveryList from "../../components/DeliveryList/DeliveryList";

const Delivery = () => {

    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.cart.delivery)
    console.log('data', data);

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    return (
        <div className={styles['delivery-wrapper']}>
            <h2>Доставки</h2>
            <Suspense>
                {!data.length && <div>Доставок нет...</div>}
            </Suspense>
            {data && <ul className={styles['items-list']}>
                {data.map((order) => (
                    <DeliveryList key={order.id} order={order} />
                ))}
            </ul>}
        </div>
    );
}

export default Delivery;