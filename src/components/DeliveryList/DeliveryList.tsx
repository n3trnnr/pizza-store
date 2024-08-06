import { IDeliveryList } from "./DeliveryList.props";
import styles from './DeliveryList.module.css'

const DeliveryList = ({ order }: IDeliveryList) => {

    const totalPrice = () => {
        if (order) {
            return order.products.reduce((acc, item) => {
                return acc += item.price
            }, 0)
        }
        return 0
    }

    const productsCount = (productId: number) => {
        const productCount = order.productsCart.find((i) => {
            return i.id === productId
        })
        return productCount?.count
    }

    return (
        <>
            <h3>Заказ #{order.id}</h3>
            {order.products.map((item) => (
                <li key={item.id} className={styles['item']}>
                    <div className={styles['pizza-img']} style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className={styles['description-wrapper']}>
                        <div className={styles['title']}>{item.name}</div>
                        <div className={styles['description']}>{item.ingredients.join(', ')}</div>
                        <div className={styles['pizza-price']}>{item.price}₽</div>
                        <div>{productsCount(item.id)}</div>
                    </div>
                </li>
            ))}
            {<div className={styles['order-price']}>
                Итог<span>{order ? totalPrice() : 0}р</span>
            </div>}
            <hr />
        </>
    );
}

export default DeliveryList;