# Problem 3: Messy React

Hi team, here a list of all problems I found.

- The interface `WalletBalance` is missing `blockchain` property.
- `FormattedWalletBalance` can be extend from `WalletBalance`
- Useless `Props` interface. We should remove it.
- `getPriority` function don't have side effect, so better we move it outside the component.
- The code does not take into account the situation when blockchain priority is equal, leading to incorrect results when sorting balance.
- The code `formattedBalances` is not used.
- `lhsPriority` is not defined.
- I think we are trying to filter the balance with an amount greater than zero. So the code `balance.amount <= 0` should be `balance.amount > 0`.
- Trying to use index as the React key for the component `WalletRow`.

Refactored version

```tsx
interface WalletBalance {
  // Added
  blockchain: string;
  currency: string;
  amount: number;
}

// extend the `WalletBalance`
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  // Added
  usdValue: number;
}

// Move getPriority outside
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<BoxProps> = (props) => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices: {
    [key: string]: number;
  }[] = usePrices();

  const sortedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .reduce((final: FormattedWalletBalance[], balance: WalletBalance) => {
        const currentPriority = getPriority(balance.blockchain);
        if (currentPriority > -99 && balance.amount > 0) {
          final.push({
            ...balance,
            // We can move calc usdValue here
            usdValue: prices[balance.currency] * balance.amount,
            formatted: balance.amount.toFixed(),
          });
        }
        return final;
      }, [])
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // This is better sort
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      });
    // prices is the new dep. I assumed prices were memorized.
  }, [balances, prices]);

  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    return (
      <WalletRow
        className={classes.row}
        // New key
        key={`${balance.blockchain}-${balance.currency}`}
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  // I think the team is using Material UI Box or something similar.
  return <Box {...props}>{rows}</Box>;
};
```
