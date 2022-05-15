import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import { Container } from "./styles";


export function Summary(){
    return(
        <Container>
            <div>
                <header>
                    <h4>Entradas</h4>
                    <img src={incomeImg} alt="Entradas"/>
                </header>
                <strong>R$1000,00</strong>
            </div>
            <div>
                <header>
                <h4>Saídas</h4>
                    <img src={outcomeImg} alt="Saídas"/>
                </header>
                <strong>- R$500,00</strong>
            </div>
            <div className="grennBackground">
                <header>
                    <h4>Total</h4>
                    <img src={totalImg} alt="Total"/>
                </header>
                <strong>R$500,00</strong>
            </div>
        </Container>
    )
}