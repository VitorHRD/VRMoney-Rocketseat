
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: Date;
}
interface TransactionsProviderProps {
    children: ReactNode
}
type TransactionInput = Omit<transaction, 'id' | 'createdAt'>

interface TransactionsContextData {
    transactions: transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    isNewTransactionModalOpen: boolean;
    editTransactionModalOpen: boolean;
    transactionEdit: transaction;
    controllerNewTransactionModal: (boolean: boolean) => void;
    controllerEditTransactionModal: (boolean: boolean) => void;
    getTransaction: (id: number) => void;
    deleteTransaction: (id: number) => void;
    editTransaction: (transaction: TransactionInput) => void;
}
export const TrasactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TrasactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<transaction[]>([])
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [editTransactionModalOpen, setEditTransactionModalOpen] = useState(false);
    const [transactionEdit, setTransactionEdit] = useState<transaction>({
        id: 0,
        title: '',
        amount: 0,
        type: '',
        category: 'deposit',
        createdAt: new Date()
    })
    useEffect(() => {
        const localTransactions = localStorage.getItem('localTransactions');

        if (localTransactions) {
            setTransactions(JSON.parse(localTransactions))
        }
        else {
            setTransactions([])
        }
    }, []);
    async function createTransaction(transactionInput: TransactionInput) {
        const newTransaction = { id: Math.random(), ...transactionInput, createdAt: new Date() }
        const allTransactions = [newTransaction, ...transactions]
        setTransactions(allTransactions)
        localStorage.setItem('localTransactions', JSON.stringify(allTransactions))
    }
    function controllerNewTransactionModal(setModal: boolean) {
        setIsNewTransactionModalOpen(setModal)
    }
    function controllerEditTransactionModal(setModal: boolean) {
        setEditTransactionModalOpen(setModal)
    }
    function getTransaction(id: number) {
        const newTransactions = [...transactions]
        const newTransaction = newTransactions.find((transaction) => transaction.id === id)
        if (newTransaction) {
            setTransactionEdit(newTransaction)
        }
    }
    function deleteTransaction(id: number) {
        const copyTransactions = [...transactions]
        const newTransactions = copyTransactions.filter((transaction => transaction.id !== id))
        setTransactions(newTransactions)
        localStorage.setItem('localTransactions', JSON.stringify(newTransactions))

    }
    async function editTransaction(transaction: TransactionInput) {
        const localTransactions = localStorage.getItem('localTransactions');

        if (localTransactions) {
            const localJson: transaction[] = JSON.parse(localTransactions);

            const newTransactions = localJson.map((item) => {
                if (item.id === transactionEdit.id) {
                    item = {
                        id: item.id,
                        ...transaction,
                        createdAt: item.createdAt
                    }
                }
                return item
            })
            
            setTransactions(newTransactions)
            localStorage.setItem('localTransactions', JSON.stringify(newTransactions))
        }

    }
    return (
        <TrasactionsContext.Provider value={{
            transactions,
            createTransaction,
            isNewTransactionModalOpen,
            editTransactionModalOpen,
            transactionEdit,
            controllerNewTransactionModal,
            controllerEditTransactionModal,
            getTransaction,
            deleteTransaction,
            editTransaction,
        }}>
            {children}
        </TrasactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TrasactionsContext)
    return context;
}
