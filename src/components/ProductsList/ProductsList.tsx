import { FC } from "react";
import { IProductsList } from "./ProductsList.props";
import Card from "../Card/Card";
import styles from './ProductsList.module.css'

const ProductsList: FC<IProductsList> = ({ product }) => {

    return (
        <div className={styles.wrapper}>
            {product.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    description={item.ingredients}
                    price={item.price}
                    rating={item.rating}
                    img={item.image}
                />
            ))}
        </div>
    );
}

export default ProductsList;