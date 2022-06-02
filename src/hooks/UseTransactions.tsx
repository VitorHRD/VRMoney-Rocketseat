
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
    transactions: transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}
export const TrasactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TrasactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<transaction[]>([])
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
        const allTransactions = [...transactions, newTransaction]
        setTransactions(allTransactions)
        localStorage.setItem('localTransactions', JSON.stringify(allTransactions))
    }
    return (
        <TrasactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TrasactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TrasactionsContext)
    return context;
}
