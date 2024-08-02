import { Await, Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import styles from './Product.module.css'
import { IProduct } from './Product.props';
import { Suspense } from 'react';

const Product = () => {

    //Query параметр передаваемый в url строке, можно использовать для запросов на сверер при помощи fect или axios
    const params = useParams()

    //Альтернативный вариант получения данных с предварительных запросов через loader в router
    const { data } = useLoaderData() as { data: IProduct }//Обязательная типизация данных, по дефолту хук не принимает дженериков
    // console.log('useLoadingData - ', data);


    //Указание -1 в navigate позволяет вернуться на один шаг назад в истории браузера
    const navigate = useNavigate()

    return (
        <>
            <div>
                {`Product - ${params?.id}`}
            </div>

            <Suspense fallback={<h1>Загрузка...</h1>}>
                <Await resolve={data}>
                    {(data: IProduct) => (
                        <div className={styles['card']}>
                            <div className={styles['cover-wrapper']} style={{ backgroundImage: `url(${data.image})` }}>
                                <span className={styles.price}>{data.price}<span style={{ color: 'orangered' }}>₽</span></span>
                                <span className={styles.rating}>{data.rating}<span style={{ color: 'orange' }}>★</span></span>
                            </div>
                            <div className={styles['pizza-info']}>
                                <div className={styles.title}>{data.name}</div>
                                <div>{data.ingredients.join(', ')}</div>
                            </div>
                        </div>
                    )}
                </Await>
            </Suspense>

            {/* <div className={styles['card']}>
                <div className={styles['cover-wrapper']} style={{ backgroundImage: `url(${data.image})` }}>
                    <span className={styles.price}>{data.price}</span>
                    <span className={styles.rating}>{data.rating}</span>
                </div>
                <div className={styles['pizza-info']}>
                    <div className={styles.title}>{data.name}</div>
                    <div>{data.ingredients.join(', ')}</div>
                </div>
            </div> */}

            <Link to='/' >Назад - Link</Link>
            <div onClick={() => navigate(-1)}>Назад - useNavigate</div>
        </>
    );
}

export default Product;