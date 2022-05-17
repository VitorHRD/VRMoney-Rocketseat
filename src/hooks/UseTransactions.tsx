
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
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
        api.get('transactions')
            .then(res => setTransactions(res.data.transactions))
    }, []);
    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transaction', {
            ...transactionInput,
            createdAt: new Date(),
        })
        const { transaction } = response.data
        setTransactions([...transactions, transaction])
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
