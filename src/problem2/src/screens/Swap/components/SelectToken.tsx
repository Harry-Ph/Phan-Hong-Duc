import { twMerge } from "tailwind-merge";
import { TokenImage } from "../../../components";
import { useGetListTokenAndPrice } from "../hooks";
import { useState } from "react";
import { LeftArrow } from "../../../icons";
import { Heading } from "react-aria-components";

interface SelectTokenProps {
  selectedToken?: string;
  onSelectToken?: (token: string) => void;
  onReturn?: () => void;
}

export function SelectToken({
  selectedToken,
  onSelectToken,
  onReturn,
}: SelectTokenProps) {
  const { data, isLoading, error } = useGetListTokenAndPrice();

  const [search, setSearch] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filteredList = data?.list.filter((token) => {
    return token.toUpperCase().includes(search.toUpperCase());
  });

  return (
    <div>
      <div className="flex items-center">
        <button
          aria-label="Return"
          className="bg-blue-600 text-white p-2.5 text-xl rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={onReturn}
        >
          <LeftArrow />
        </button>
        <Heading slot="title" className="ml-4 text-xl font-bold text-center">
          Select Token
        </Heading>
      </div>
      <div className="mt-4">
        <input
          type="text"
          className="border-b w-full rounded-sm bg-transparent pl-0 text- outline-none focus:ring-0 focus:border-blue-500 pb-1"
          placeholder="Filter token"
          onChange={handleChange}
        />

        {isLoading && (
          <div className="mt-4 flex flex-col gap-2">
            <div className="animate-pulse w-full h-9 bg-gray-300 rounded-lg" />
            <div className="animate-pulse w-full h-9 bg-gray-300 rounded-lg" />
            <div className="animate-pulse w-full h-9 bg-gray-300 rounded-lg" />
          </div>
        )}

        {!isLoading && !error && filteredList?.length === 0 && (
          <p className="mt-4 text-center">
            No tokens found. Please try another keyword.
          </p>
        )}

        {filteredList && filteredList.length > 0 && (
          <ul className="mt-4 space-y-2 overflow-y-auto max-h-[500px]">
            {filteredList.map((token) => (
              <li key={token}>
                <button
                  onClick={() => onSelectToken?.(token)}
                  className={twMerge(
                    "flex w-full items-center p-2 rounded-lg focus:outline-none hover:bg-gray-300",
                    selectedToken === token && "bg-gray-300"
                  )}
                >
                  <div className="w-6 h-6">
                    <TokenImage token={token} />
                  </div>
                  <span className="font-bold ml-2">{token}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
