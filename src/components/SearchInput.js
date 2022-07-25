import classes from './SearchInput.module.css'

const SearchInput = () => {

    return <form className={classes.form}>
        <input placeholder="Looking for a specific coin?" />
        <button type="submit" >Search</button>
    </form>
}

export default SearchInput;