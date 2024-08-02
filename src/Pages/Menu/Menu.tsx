import { useEffect, useState } from "react";
import { IProductData } from "../../interfaces/interfaces";
import ProductsList from "../../components/ProductsList/ProductsList";
import { PREFIX } from "../../constants/constants";
import SearchInput from "../../components/SearchInput/SearchInput";
import styles from './Menu.module.css'

const Menu = () => {

    const [product, setProduct] = useState<IProductData[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [isError, setIsError] = useState<any | string>('')
    const [filter, setFilter] = useState<string>('')

    useEffect(() => {
        getMenu(filter)
    }, [filter])

    const getMenu = async (query = '') => {
        try {
            setIsLoaded(true)

            //Сортировка данных по подстроке 
            const res = await fetch(`${PREFIX}/menu?${query}`,)
            if (!res.ok) {
                const error = `${res.status} - ${res.statusText}`
                throw new Error(error)
            }
            const data = await res.json() as IProductData[]

            setProduct([...data])
            setIsLoaded(false)
        } catch (error) {
            if (error instanceof Error) {
                console.log('catch error - ', error?.message);
                setIsLoaded(false)
                setIsError(error?.message)
            }
        }
    }

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const substring = e.target.value
        if (substring) {
            const query = new URLSearchParams({ 'q': substring }).toString()
            setFilter(query)
        } else {
            setFilter('')
        }
    }

    return (
        <>
            <div className={styles['header']}>
                <h2>
                    Меню
                </h2>
                <SearchInput placeholder="Введите блюдо или состав" onChange={handleSearch} />
            </div>
            {!product.length && !isLoaded && <div>Товары не найдены</div>}
            {product && !isLoaded &&
                <ProductsList product={product} />
            }
            {isError && <div>{isError}</div>}
        </>
    );
}

export default Menu;