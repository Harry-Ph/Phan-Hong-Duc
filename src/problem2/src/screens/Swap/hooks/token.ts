import { useQuery } from "@tanstack/react-query";
import { TokenPrice } from "../type";

export function useGetListTokenAndPrice() {
  return useQuery({
    queryKey: ["tokens-price"],
    queryFn: async () => {
      const list = await fetch(
        "https://interview.switcheo.com/prices.json"
      ).then<TokenPrice[]>((res) => res.json());

      const savedLastUpdate: {
        [currency: string]: TokenPrice;
      } = {};

      list.forEach((token) => {
        const saved = savedLastUpdate[token.currency];
        // We should keep the latest update
        if (!saved || saved.date <= token.date) {
          savedLastUpdate[token.currency] = token;
        }
      });
      return {
        list: Object.keys(savedLastUpdate),
        price: savedLastUpdate,
      };
    },
  });
}
