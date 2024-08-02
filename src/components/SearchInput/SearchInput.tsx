import { FC } from 'react';
import styles from './SearchInput.module.css'
import { ISearchInput } from './SearchInput.props';
import search from '../../assets/search.svg'

const SearchInput: FC<ISearchInput> = ({ ...props }) => {
    return (
        <div className={styles['search-wrapper']}>
            <img className={styles['search-img']} src={search} alt="search" />
            <input {...props} className={styles['search-input']} />
        </div>
    );
}

export default SearchInput;