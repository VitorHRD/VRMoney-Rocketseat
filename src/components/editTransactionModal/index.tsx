import Modal from 'react-modal'
import { FormEvent, useEffect, useState } from 'react';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/UseTransactions';


export function EditTransactionModal() {
    const { 
        controllerEditTransactionModal, 
        editTransactionModalOpen,
         transactionEdit ,
         editTransaction
    } = useTransactions()
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');
    useEffect(() => {
        setTitle(transactionEdit.title);
        setAmount(transactionEdit.amount);
        setCategory(transactionEdit.category);
        setType(transactionEdit.type)

    }, [transactionEdit])

    async function handleEditTransaction(event: FormEvent) {
        event.preventDefault();

        editTransaction({
            title,
            amount: amount,
            category,
            type,
        })
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        controllerEditTransactionModal(false)
    }
    return (
        <Modal isOpen={editTransactionModalOpen}
            onRequestClose={() => { controllerEditTransactionModal(false) }}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type='button' onClick={() => { controllerEditTransactionModal(false) }} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleEditTransaction}>
                <h2>Editar Transação</h2>
                <input
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)} />
                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
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
                <button type="submit" >Editar</button>
            </Container>
        </Modal>
    );
}