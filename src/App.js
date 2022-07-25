import Coin from "./components/Coin";
import classes from "./App.module.css";
import { useState, useEffect } from "react";
import Titles from "./components/Titles";
import PaginationComponent from "./components/PaginationComponent";
import Header from "./components/Header";
let sortingAsc = false;
let blurryBackground = true;
const Coins = () => {
  const [fetchedCoins, setFetchedCoins] = useState([]);
  const [cryptoChunks, setCryptoChunks] = useState([]);
  const [curPage, setCurPage] = useState(1);

  const makeChunks = (coins) => {
    if (coins.length > 0) {
      const chunkSize = 10;
      const auxCryptoChunks = [];
      for (let i = 0; i < coins.length; i += chunkSize) {
        const chunk = coins.slice(i, i + chunkSize);
        auxCryptoChunks.push(chunk);
      }
      setCryptoChunks(auxCryptoChunks);
    }
  };

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setFetchedCoins(data);
      makeChunks(data);
    };
    fetching();
  }, []);

  const sortByValueHandler = () => {
    let sortedCoins = fetchedCoins.sort((a, b) => {
      return sortingAsc
        ? a.current_price - b.current_price
        : b.current_price - a.current_price;
    });

    makeChunks(sortedCoins);
    sortingAsc = !sortingAsc;
  };

  const sortByNameHandler = () => {
    let sortedCoins = fetchedCoins.sort((a, b) => {
      if (a.id < b.id) {
        return sortingAsc ? -1 : 1;
      }
      if (a.id > b.id) {
        return sortingAsc ? 1 : -1;
      }
      return 0;
    });

    makeChunks(sortedCoins);
    sortingAsc = !sortingAsc;
  };

  const sortByMarketCapHandler = () => {
    let sortedCoins = fetchedCoins.sort((a, b) => {
      return sortingAsc
        ? a.market_cap - b.market_cap
        : b.market_cap - a.market_cap;
    });

    makeChunks(sortedCoins);
    sortingAsc = !sortingAsc;
  };
  const sortByChangeHandler = () => {
    let sortedCoins = fetchedCoins.sort((a, b) => {
      return sortingAsc
        ? a.price_change_percentage_24h - b.price_change_percentage_24h
        : b.price_change_percentage_24h - a.price_change_percentage_24h;
    });

    makeChunks(sortedCoins);
    sortingAsc = !sortingAsc;
  };

  const inputChangeHandler = (e) => {
    let searched = e.target.value;
    let searchedCoins = fetchedCoins.filter((coin) => {
      return coin.id.includes(searched.toLowerCase());
    });
    makeChunks(searchedCoins);
  };

  const selectPageHandler = (newPage) => {
    setCurPage(newPage);
  };
  return (
    <div className={classes.wrapper}>
      <Header onInputChange={inputChangeHandler} />
      <hr />
      <Titles
        onSortByName={sortByNameHandler}
        onSortByValue={sortByValueHandler}
        onSortByChange={sortByChangeHandler}
        onSortByMarketCap={sortByMarketCapHandler}
      />
      {cryptoChunks.length > 0 &&
        cryptoChunks[curPage - 1].map((coin) => {
          blurryBackground = !blurryBackground;
          return (
            <Coin
              key={coin.id}
              name={coin.id}
              price={coin.current_price.toLocaleString("en-US")}
              marketCap={coin.market_cap.toLocaleString("en-US")}
              img={coin.image}
              change={coin.price_change_percentage_24h}
              blurry={blurryBackground}
            />
          );
        })}
      <PaginationComponent
        curPage={curPage}
        onSelectPage={selectPageHandler}
        chunksLength={cryptoChunks.length}
      />
    </div>
  );
};

export default Coins;
