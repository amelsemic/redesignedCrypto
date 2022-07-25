import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <p>
        <span style={{ fontWeight: "bold" }}>CRYPTOCURRENCY // </span>
        <span>value tracker</span>
      </p>
      <input
        type="text"
        placeholder="search over 200 coins"
        onChange={props.onInputChange}
        
      />
    </div>
  );
};

export default Header;
