import Coin from "./Coin.js";

export default class CoinsManager {
  constructor() {
    this.coins = new Map();
  }

  add(coin) {
    const weight = coin.weight;

    if (this.coins.has(weight)) {
      this.coins.get(weight).push(coin);
    } else {
      this.coins.set(weight, [coin]);
    }
  }

  getCoin(weight) {
    if (this.coins.has(weight)) {
      return this.coins.get(weight).pop();
    }
  }

  hasCoin(weight) {
    return this.coins.has(weight);
  }

  addAmountOfMoney(amount) {
    const coinsSet = this.setUpCoinsSet();

    while (amount > 0) {
      let value = this.getRandomKey(coinsSet);
      if (value <= amount) {
        amount = Number((amount - value).toFixed(1));
        this.add(new Coin(coinsSet.get(value)));
      } else {
        coinsSet.delete(value);
      }
    }
  }

  setUpCoinsSet() {
    const coinsSet = new Map();
    coinsSet.set(0.1, "2,51");
    coinsSet.set(0.2, "3,22");
    coinsSet.set(0.5, "3,94");
    coinsSet.set(1, "5,00");
    coinsSet.set(2, "5,21");
    coinsSet.set(5, "6,54");
    return coinsSet;
  }

  getRandomKey(collection) {
    let keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
  }

  coinsAmount(weight) {
    if (this.coins.has(weight)) {
      return this.coins.get(weight).length;
    }
    return 0;
  }

  totalAmountOfMoney() {
    let result = 0;
    this.coins.forEach(coinsList => {
      coinsList.forEach(coin => {
        let value = Coin.getCoinValue(coin.weight);
        result = Number((result + value).toFixed(1));
      });
    });
    return result;
  }

  coinIsAvailable(weight) {
    if (this.coins.has(weight)) {
      return this.coins.get(weight).length > 0;
    }
    return false;
  }

  addCoins(coins) {
    coins.forEach(coin => this.add(coin));
  }

  removeCoins(weight) {
    if (this.coins.has(weight)) {
      const coinsList = this.coins.get(weight);
      while (coinsList.length > 0) {
        coinsList.pop();
      }
    }
  }

  static addCoinToCollection(coin, map) {
    const weight = coin.weight;

    if (map.has(weight)) {
      map.get(weight).push(coin);
    } else {
      map.set(weight, [coin]);
    }
  }

  static moveCoins(map1, map2) {
    for (let coins of map1.values()) {
      for (let coin of coins) {
        CoinsManager.addCoinToCollection(coin, map2);
      }
    }
    map1.clear();
  }

  static isCoinAvailable(weight, coins) {
    return coins.has(weight) && coins.get(weight).length > 0;
  }
}
