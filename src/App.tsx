import { Dashboard } from "./components/Dashboard";
import { useState } from "react";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TrasactionsProvider} from "./hooks/UseTransactions"
import Modal from 'react-modal'


Modal.setAppElement("#root")
function App() {
  const[isNewTransactionModalOpen , setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true)
  }
  function handleCloseNewTransactionModal(){
      setIsNewTransactionModalOpen(false)
  }
  return (
    <TrasactionsProvider>
      <Header onOpenTransactionModal ={handleOpenNewTransactionModal}/>
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseNewTransactionModal}
      />
    </TrasactionsProvider>
  );
}

export default App;
