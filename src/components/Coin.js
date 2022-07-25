import classes from "./Coin.module.css";
import downArrow from "../Icon ionic-md-arrow-down-red.svg";
import upArrow from "../Icon ionic-md-arrow-up-green.svg";
const Coin = (props) => {
  return (
    <div className={props.blurry ? classes.blurryWrapper : classes.wrapper}>
      <div className={classes.divs}>
        <p>{props.name} </p>
      </div>
      <div className={classes.divs}>
        <p>{props.price}</p>
      </div>
      <div className={classes.divs}>
        <img src={props.change < 0 ? downArrow : upArrow} alt="arrow" />
        <p className={props.change < 0 ? classes.decrease : classes.increase}>
          {Math.abs(props.change.toFixed(2))}%
        </p>
      </div>
      <div className={classes.divs}>
        <img className={classes.coin} src={props.img} alt="coin-logo" />
      </div>
      <div className={classes.divs} style={{ borderRight: "none" }}>
        <p>{props.marketCap} </p>
      </div>
    </div>
  );
};

export default Coin;
