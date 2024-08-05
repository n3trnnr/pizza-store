import { Await, Link, useLoaderData, useParams } from 'react-router-dom';
import styles from './Product.module.css'
import { IProduct } from './Product.props';
import { Suspense } from 'react';
import Button from '../Button/Button';
import { useAppDispatch } from '../../hooks/storeHooks';
import { add } from '../../store/cart.slice';

const Product = () => {

    const dispatch = useAppDispatch()

    //Query параметр передаваемый в url строке, можно использовать для запросов на сверер при помощи fect или axios
    const params = useParams()

    //Альтернативный вариант получения данных с предварительных запросов через loader в router
    const { data } = useLoaderData() as { data: IProduct }//Обязательная типизация данных, по дефолту хук не принимает дженериков

    return (
        <div className={styles['product-wrapper']}>
            <Link to='/' ><h2>{'< Назад'}</h2></Link>

            <Suspense fallback={<h1>Загрузка...</h1>}>
                <Await resolve={data}>
                    {(data: IProduct) => (
                        <>
                            <div className={styles['card']}>
                                <div className={styles['cover-wrapper']} style={{ backgroundImage: `url(${data.image})` }}>
                                    <span className={styles.price}>{data.price}<span style={{ color: 'orangered' }}>₽</span></span>
                                    <span className={styles.rating}>{data.rating}<span style={{ color: 'orange' }}>★</span></span>
                                </div>
                                <div className={styles['pizza-info']}>
                                    <div className={styles.title}>{data.name}</div>
                                    <div className={styles.description}>{data.ingredients.join(', ')}</div>
                                </div>
                            </div>
                            <Button onClick={() => dispatch(add(data.id))} appearance='small'>Добавить в корзину</Button>
                        </>
                    )}
                </Await>
            </Suspense>

        </div>
    );
}

export default Product;