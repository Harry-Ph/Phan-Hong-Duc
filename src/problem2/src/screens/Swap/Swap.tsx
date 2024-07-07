import { useState } from "react";
import { ModalSelectToken, Swap } from "./components";
import { SwapDirection } from "./type";

export function SwapScreen() {
  const [view, setView] = useState<
    "swap" | "selectTokenFrom" | "selectTokenTo"
  >("swap");

  const [selectedToken, setSelectedToken] = useState<{
    [SwapDirection.FROM]: string;
    [SwapDirection.TO]: string;
  }>({
    [SwapDirection.FROM]: "WBTC",
    [SwapDirection.TO]: "BUSD",
  });

  function handleRequestChangeToken(direction: SwapDirection) {
    if (direction === SwapDirection.FROM) {
      setView("selectTokenFrom");
    } else {
      setView("selectTokenTo");
    }
  }

  return (
    <main className="px-4 py-10">
      <div className="shadow-md max-w-[500px] rounded-md px-6 py-6 mx-auto bg-background relative">
        <Swap
          onRequestChangeToken={handleRequestChangeToken}
          selectedToken={selectedToken}
          onSwitchToken={() => {
            setSelectedToken((prev) => ({
              [SwapDirection.FROM]: prev[SwapDirection.TO],
              [SwapDirection.TO]: prev[SwapDirection.FROM],
            }));
          }}
        />

        <ModalSelectToken
          isOpen={view === "selectTokenFrom" || view === "selectTokenTo"}
          onOpenChange={() => {
            setView("swap");
          }}
          selectedToken={
            selectedToken[
              view === "selectTokenFrom" ? SwapDirection.FROM : SwapDirection.TO
            ]
          }
          onSelectedToken={(token) => {
            setSelectedToken((prev) => ({
              ...prev,
              [view === "selectTokenFrom"
                ? SwapDirection.FROM
                : SwapDirection.TO]: token,
            }));
            setView("swap");
          }}
        />
      </div>
    </main>
  );
}
