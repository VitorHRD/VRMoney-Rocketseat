import Modal from 'react-modal'
import { FormEvent, useState } from 'react';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/UseTransactions';


export function NewTransactionModal() {
    const { createTransaction , controllerNewTransactionModal , isNewTransactionModalOpen } = useTransactions()
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        if(amount){
        await createTransaction({
            title,
            amount: amount,
            category,
            type,
        })
    }
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        controllerNewTransactionModal(false);
    }
    return (
        <Modal isOpen={isNewTransactionModalOpen}
            onRequestClose={()=>{controllerNewTransactionModal(false)}}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type='button' onClick={()=>{controllerNewTransactionModal(false)}} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <input
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)} />
                <input
                    type="number"
                    placeholder="Valor"
                    onChange={event => setAmount(Number(event.target.value))} />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor="green">
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw') }}
                        isActive={type === 'withdraw'}
                        activeColor="red">
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    placeholder="categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)} />
                <button type="submit" >Cadastrar</button>
            </Container>
        </Modal>
    );
}