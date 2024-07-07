import { DownArrow } from "../../icons";
import { TokenImage } from "../TokenImage";

export interface TokenInputProps {
  label?: string;
  price?: string;
  token: string;
  onChangeToken?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  disabled?: boolean;
}

export function TokenInput(props: TokenInputProps) {
  const { label, price, token, onChangeToken, inputProps, disabled } = props;

  return (
    <div className="rounded-md flex flex-col border-2 px-3 py-2">
      <div className="flex w-full items-center">
        <label className="font-bold">{label}</label>
      </div>
      <div className="relative mt-1 flex w-full flex-row items-center gap-2">
        <input
          type="string"
          placeholder="0"
          className="border-b w-full rounded-sm bg-transparent pl-0 text- outline-none focus:ring-0 focus:border-blue-500 pb-1"
          disabled={disabled}
          {...inputProps}
        />
        <button
          type="button"
          disabled={disabled}
          className="ml-auto border rounded-md py-1 px-2 outline-none flex-shrink-0"
          onClick={onChangeToken}
        >
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <span className="flex max-w-[80%] flex-row items-center gap-2">
              <div className="h-6 w-6">
                <TokenImage token={token} />
              </div>
              <span className="truncate text-lg font-medium text-base-content">
                {token}
              </span>
            </span>
            <span className="text-lg">
              <DownArrow />
            </span>
          </div>
        </button>
      </div>
      <div className="mt-2 flex flex-row items-center justify-end">
        <span className="text-gray-500">
          <span>$</span>
          <span>{price || 0}</span>
        </span>
      </div>
    </div>
  );
}
