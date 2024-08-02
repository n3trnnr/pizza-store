import { FC, MouseEvent } from "react";
import { ICard } from "./Card.props";
import Button from "../Button/Button";
import styles from './Card.module.css'
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/storeHooks";
// import { getProductById } from "../../store/cart.slice";
import { add } from "../../store/cart.slice";

const Card: FC<ICard> = ({ id, title, description, rating, price, img }) => {

    const dispatch = useAppDispatch()
    const addItem = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(add(id))
        // dispatch(getProductById(id))
    }

    return (
        <Link to={`/product/${id}`}>
            <div className={styles['card']}>
                <div className={styles['cover-wrapper']} style={{ backgroundImage: `url(${img})` }}>
                    <span className={styles.price}>{price} <span style={{ color: 'orangered' }}>₽</span></span>
                    <span className={styles.rating}>{rating} <span style={{ color: 'orange' }}>★</span></span>
                    <Button
                        onClick={addItem}
                        appearance="none"
                        styleName={styles['buy-button']}
                    >
                        +
                    </Button>
                </div>
                <div className={styles['pizza-info']}>
                    <div className={styles.title}>{title}</div>
                    <div>{description.join(', ')}</div>
                </div>
            </div>
        </Link>
    );
}

export default Card;