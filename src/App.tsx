import { QueryClient, QueryClientProvider } from "react-query";
import "./reset.css";

import Main from "./page/Main";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Main />
    </QueryClientProvider>
  );
}

export default App;
