import { Modal, Dialog } from "react-aria-components";

import { SelectToken } from "./SelectToken";

export interface ModalSelectTokenProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onSelectedToken: (token: string) => void;
  selectedToken: string;
}

export function ModalSelectToken({
  isOpen,
  onOpenChange,
  selectedToken,
  onSelectedToken,
}: ModalSelectTokenProps) {
  return (
    <Modal
      className="w-full max-w-md"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Dialog
        className={
          "outline-none p-4 w-full max-h-full rounded-2xl bg-background"
        }
      >
        {({ close }) => (
          <SelectToken
            onReturn={close}
            selectedToken={selectedToken}
            onSelectToken={onSelectedToken}
          />
        )}
      </Dialog>
    </Modal>
  );
}
