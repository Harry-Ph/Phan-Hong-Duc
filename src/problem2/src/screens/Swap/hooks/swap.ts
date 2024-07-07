import { useMemo } from "react";
import { SwapDirection } from "../type";
import { useGetListTokenAndPrice } from "./token";
import Decimal from "decimal.js";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks";

function formatDisplayPrice(price: string) {
  const part = price.split(".");
  const number = part[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return part[1] ? `${number}.${part[1]}` : number;
}

export function useCalculatePrice({
  fromToken,
  toToken,
  fromInput,
  toInput,
  direction,
}: {
  fromInput: string;
  toInput: string;
  fromToken: string;
  toToken: string;
  direction: SwapDirection;
}) {
  const { data: tokenAndPrice } = useGetListTokenAndPrice();

  const { fromTokenPrice, toTokenPrice } = useMemo(() => {
    const fromTokenPrice = tokenAndPrice?.price[fromToken]?.price;
    const toTokenPrice = tokenAndPrice?.price[toToken]?.price;

    return {
      fromTokenPrice: new Decimal(fromTokenPrice || 0),
      toTokenPrice: new Decimal(toTokenPrice || 0),
    };
  }, [fromToken, toToken, tokenAndPrice?.price]);

  return useMemo(() => {
    if (!fromTokenPrice || !toTokenPrice) {
      return;
    }
    if (direction === SwapDirection.FROM) {
      const fromAmount = new Decimal(fromInput || 0);
      const from = new Decimal(fromInput || "0");
      const result = from.eq(0)
        ? new Decimal(0)
        : from.div(toTokenPrice).mul(fromTokenPrice);

      const amountPrice = new Decimal(fromTokenPrice).mul(
        new Decimal(fromInput || "0")
      );

      return {
        fromAmount: fromAmount.toString(),
        price: formatDisplayPrice(
          amountPrice.toSignificantDigits(16).toString()
        ),
        toAmount: result.toString(),
      };
    } else {
      const toAmount = new Decimal(toInput || 0);
      const to = new Decimal(toInput || "0");
      const result = to.eq(0)
        ? new Decimal(0)
        : to.div(fromTokenPrice).mul(toTokenPrice);
      const amountPrice = new Decimal(toTokenPrice).mul(
        new Decimal(toInput || "0")
      );
      return {
        toAmount: toAmount.toString(),
        price: formatDisplayPrice(
          amountPrice.toSignificantDigits(16).toString()
        ),
        fromAmount: result.toString(),
      };
    }
  }, [fromInput, toInput, fromTokenPrice, toTokenPrice, direction]);
}

export function useFakeSwap() {
  const toast = useToast();
  return useMutation({
    mutationFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Success");
        }, 3500);
      });
    },
    onSuccess: () => {
      toast?.add("Swap success!", {
        timeout: 5000,
      });
    },
  });
}
