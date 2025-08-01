import React, { useState } from 'react';
import { ContaBancaria } from './models/ContaBancaria';

const conta = new ContaBancaria();

function App() {
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [saldo, setSaldo] = useState(conta.verSaldo());

  const formatarValor = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const atualizarSaldo = () => setSaldo(conta.verSaldo());

  const handleDeposito = () => {
    const num = Number(valor);
    if (num <= 0) return setMensagem('Digite um valor válido para depósito.');
    conta.depositar(num);
    atualizarSaldo();
    setValor('');
    setMensagem('Depósito realizado com sucesso!');
  };

  const handleSaque = () => {
    const num = Number(valor);
    if (num <= 0) return setMensagem('Digite um valor válido para saque.');
    if (num > conta.verSaldo()) return setMensagem('Saldo insuficiente para saque.');
    conta.sacar(num);
    atualizarSaldo();
    setValor('');
    setMensagem('Saque realizado com sucesso!');
  };

  return (
    <div>
      <h1>Conta Bancária</h1>
      <p>Saldo disponível: {formatarValor(saldo)}</p>
      <input
        type="number"
        placeholder="Digite um valor"
        value={valor}
        onChange={e => setValor(e.target.value)}
      />
      <button onClick={handleDeposito}>Depositar</button>
      <button onClick={handleSaque}>Sacar</button>
      {mensagem && (
        <p style={{ color: mensagem.includes('sucesso') ? 'green' : 'red' }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default App;