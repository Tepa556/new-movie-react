import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./route/route";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppRoutes />
  </QueryClientProvider>
);

export default App;