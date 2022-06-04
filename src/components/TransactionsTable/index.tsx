
import { Container } from "./styles";
import { useTransactions } from "../../hooks/UseTransactions";
import { AiFillDelete } from 'react-icons/ai'
import {FiEdit3} from 'react-icons/fi'



export function TransactionsTable(){
    const {transactions , controllerEditTransactionModal , getTransaction , deleteTransaction} = useTransactions()

    return(
      <Container>
          <table>
              <thead>
                  <tr>
                      <th>Título</th>
                      <th>Valor</th>
                      <th>Categoria</th>
                      <th>Data</th>
                      <th>Edit/Delete</th>
                  </tr>
              </thead>
              <tbody>
                 {transactions.map(transaction => {
                     return(
                        <tr key={transaction.id}>
                        <td>{transaction.title}</td>
                        <td className={transaction.type}>{new Intl.NumberFormat('pt-BR',{
                            style:'currency',
                            currency:'BRL'
                        }).format(transaction.amount)}</td>
                        <td>{transaction.category}</td>
                        <td>{new Intl.DateTimeFormat('pt-BR').format(
                            new Date(transaction.createdAt)
                        )}</td>
                        <td>
                            <button type="button" onClick={()=>{
                                controllerEditTransactionModal(true)
                                getTransaction(transaction.id)
                            }}><FiEdit3 color='black' size={22}/></button>
                            <button type="button" onClick={()=>{
                                 deleteTransaction(transaction.id)
                            }}><AiFillDelete size={22}/></button>
                        </td>
                    </tr>
                     )
                 })}
                 
              </tbody>
          </table>
      </Container>
    );
}