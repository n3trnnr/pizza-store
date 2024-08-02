import Button from "../../components/Button/Button";
import styles from './Success.module.css'
import img from '../../assets/success-pizza.png'
import { Link } from "react-router-dom";

const Success = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['img']} style={{ backgroundImage: `url(${img})` }}></div>
            <div>Ваш заказ успешно оформлен!</div>
            <Link to='/'>
                <Button appearance='big'>Новый заказ</Button>
            </Link>
        </div>
    );
}

export default Success;