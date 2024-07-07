import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SwapScreen } from "./screens";
import { ToastProvider } from "./provider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <main className="px-4 py-10">
          <SwapScreen />
        </main>
      </ToastProvider>
    </QueryClientProvider>
  );
}
