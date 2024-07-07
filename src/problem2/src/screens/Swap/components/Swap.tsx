import { useState } from "react";
import { Button, TokenInput } from "../../../components";
import { DoubleArrow } from "../../../icons";
import { SwapDirection } from "../type";
import { useCalculatePrice, useFakeSwap } from "../hooks";

export interface SwapProps {
  onRequestChangeToken?: (direction: SwapDirection) => void;
  selectedToken: {
    [SwapDirection.FROM]: string;
    [SwapDirection.TO]: string;
  };
  onSwitchToken?: () => void;
}

export function Swap({
  onRequestChangeToken,
  selectedToken,
  onSwitchToken,
}: SwapProps) {
  const [userInputDirection, setUserInputDirection] = useState<SwapDirection>(
    SwapDirection.FROM
  );

  const [value, setValue] = useState<{
    [SwapDirection.FROM]: string;
    [SwapDirection.TO]: string;
  }>({
    [SwapDirection.FROM]: "",
    [SwapDirection.TO]: "",
  });

  const result = useCalculatePrice({
    fromToken: selectedToken[SwapDirection.FROM],
    toToken: selectedToken[SwapDirection.TO],
    fromInput: value[SwapDirection.FROM],
    toInput: value[SwapDirection.TO],
    direction: userInputDirection,
  });

  const swap = useFakeSwap();

  function handleSwitchToken() {
    onSwitchToken?.();
    if (userInputDirection === SwapDirection.FROM) {
      setUserInputDirection(SwapDirection.TO);
      setValue((prev) => ({
        ...prev,
        [SwapDirection.FROM]: result?.toAmount || "",
        [SwapDirection.TO]: value[SwapDirection.FROM],
      }));
    } else {
      setUserInputDirection(SwapDirection.FROM);
      setValue((prev) => ({
        ...prev,
        [SwapDirection.FROM]: value[SwapDirection.TO],
        [SwapDirection.TO]: result?.fromAmount || "",
      }));
    }
  }

  function handleChangeValue(direction: SwapDirection) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      // Make sure the input is a number
      if (!/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
        return;
      }
      setUserInputDirection(direction);
      setValue((prev) => ({
        ...prev,
        [direction]: e.target.value,
      }));
    };
  }

  const isPending = swap.isPending;
  const noAmount =
    !value[SwapDirection.FROM] || value[SwapDirection.FROM] === "0";
  return (
    <>
      <h1 className="text-xl font-bold text-center">Easy Swap</h1>
      <div className="mt-4">
        <TokenInput
          label="From"
          price={result?.price || "0"}
          token={selectedToken[SwapDirection.FROM]}
          onChangeToken={() => onRequestChangeToken?.(SwapDirection.FROM)}
          disabled={isPending}
          inputProps={{
            onChange: handleChangeValue(SwapDirection.FROM),
            value:
              userInputDirection === SwapDirection.TO
                ? result?.fromAmount
                : value[SwapDirection.FROM],
          }}
        />
        <div className="flex justify-center my-2">
          <button
            disabled={isPending}
            onClick={handleSwitchToken}
            className="bg-blue-600 text-white p-2.5 text-xl rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <DoubleArrow />
          </button>
        </div>
        <TokenInput
          label="To"
          price={result?.price || "0"}
          token={selectedToken[SwapDirection.TO]}
          onChangeToken={() => onRequestChangeToken?.(SwapDirection.TO)}
          disabled={isPending}
          inputProps={{
            onChange: handleChangeValue(SwapDirection.TO),
            value:
              userInputDirection === SwapDirection.FROM
                ? result?.toAmount
                : value[SwapDirection.TO],
          }}
        />
      </div>
      <Button
        className="w-full mt-6"
        loading={isPending}
        disabled={
          isPending ||
          !value[SwapDirection.FROM] ||
          value[SwapDirection.FROM] === "0"
        }
        onClick={() => {
          swap.mutate();
        }}
      >
        {noAmount ? "Enter an amount" : "Swap now"}
      </Button>
    </>
  );
}
