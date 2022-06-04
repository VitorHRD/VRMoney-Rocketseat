import { useTransactions } from "../../hooks/UseTransactions";
import logoImg from "../../assets/logo.svg"
import { Container, Content } from "./styles"


export function Header() {
    const {controllerNewTransactionModal} = useTransactions()
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={()=> {controllerNewTransactionModal(true)}}>Nova transação</button>
            </Content>
        </Container>
    )
}