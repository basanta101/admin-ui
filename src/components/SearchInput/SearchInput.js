import classNames from "classnames";
import "./SearchInput.css";

const SearchInput = (props) => (
    <input
        type="text"
        className={classNames("searchInput", { 'disabled': props.disabled })}
        {...props}
    />
);

export default SearchInput;
