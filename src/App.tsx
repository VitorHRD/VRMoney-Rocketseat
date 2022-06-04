import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import {EditTransactionModal} from "./components/editTransactionModal"
import { TrasactionsProvider} from "./hooks/UseTransactions"
import Modal from 'react-modal'


Modal.setAppElement("#root")
function App() {
 
  return (
    <TrasactionsProvider>
      <Header/>
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal/>
      <EditTransactionModal/>
    </TrasactionsProvider>
  );
}

export default App;
