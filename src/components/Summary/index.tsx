
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import { useTransactions } from "../../hooks/UseTransactions";
import { Container } from "./styles";


export function Summary() {
    const { transactions } = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {

        if (transaction.type === 'deposit') {
            acc.deposits += transaction.amount
            acc.total +=transaction.amount
        } else {
          acc.withdraws += transaction.amount
          acc.total -= transaction.amount
        }
        return acc ;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return (
        <Container>
            <div>
                <header>
                    <h4>Entradas</h4>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR',{
                            style:'currency',
                            currency:'BRL'
                        }).format(summary.deposits)}</strong>
            </div>
            <div>
                <header>
                    <h4>Saídas</h4>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong> - {new Intl.NumberFormat('pt-BR',{
                            style:'currency',
                            currency:'BRL'
                        }).format(summary.withdraws)}</strong>
            </div>
            <div className="grennBackground">
                <header>
                    <h4>Total</h4>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR',{
                            style:'currency',
                            currency:'BRL'
                        }).format(summary.total)}</strong>
            </div>
        </Container>
    )
}