import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import styles from "../ModuledStyles/Search.module.css"


const Search = ({ query, setQuery }) => {
    let inputval = query;
    return (
        <form className={styles.SearchForm} onSubmit={(e) => {
            e.preventDefault();
            if (inputval !== query) {
                setQuery(inputval);
            }
        }}>
            <InputGroup className={`${styles.SearchInputGroup} mb-5`}>
                <FormControl
                    className={styles.SearchInput}
                    placeholder="Search..."
                    onChange={(e) => inputval = e.target.value}
                />
                <Button className={styles.SearchBtn} type='submit' variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>
        </form>
    )
}

export default Search