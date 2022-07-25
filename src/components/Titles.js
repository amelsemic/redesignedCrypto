import classes from "./Titles.module.css";
import sortingImg from "../sort.svg";

const Titles = (props) => {
  return (
    <div className={classes.tableTop}>
      <div className={classes.title}>
        <p className={classes.text}>NAME </p>
        <img src={sortingImg} onClick={props.onSortByName} alt="sorting img" />
      </div>
      <div className={classes.title}>
        <p className={classes.text}>VALUE </p>
        <img src={sortingImg} onClick={props.onSortByValue} alt="sorting img" />
      </div>
      <div className={classes.title}>
        <p className={classes.text}>24h CHANGE </p>
        <img
          src={sortingImg}
          onClick={props.onSortByChange}
          alt="sorting img"
        />
      </div>
      <div className={classes.title}>
        <p className={classes.text}>SYMBOL </p>
      </div>
      <div className={classes.title}>
        <p className={classes.text}>MARKET CAP </p>
        <img
          src={sortingImg}
          onClick={props.onSortByMarketCap}
          alt="sorting img"
        />
      </div>
    </div>
  );
};

export default Titles;
