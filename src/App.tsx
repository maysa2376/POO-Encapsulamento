import React, { useState } from 'react';
import { ContaBancaria } from './models/ContaBancaria';

const conta = new ContaBancaria();

function App() {
  const [valor, setValor] = useState('');
  const [saldo, setSaldo] = useState(conta.verSaldo());
  const [mensagem, setMensagem] = useState('');

  // Função para formatar em R$ (Real)
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const handleDeposito = () => {
    const num = parseFloat(valor);

    if (isNaN(num) || num <= 0) {
      setMensagem('Digite um valor válido para depósito.');
      return;
    }

    conta.depositar(num);
    setSaldo(conta.verSaldo());
    setValor('');
    setMensagem('Depósito realizado com sucesso!');
  };

  const handleSaque = () => {
    const num = parseFloat(valor);

    if (isNaN(num) || num <= 0) {
      setMensagem('Digite um valor válido para saque.');
      return;
    }

    if (num > conta.verSaldo()) {
      setMensagem('Saldo insuficiente para saque.');
      return;
    }

    conta.sacar(num);
    setSaldo(conta.verSaldo());
    setValor('');
    setMensagem('Saque realizado com sucesso!');
  };

  return (
    <div className="App">
      <h1>Conta Bancária</h1>
      <p>Saldo disponível: {formatarValor(saldo)}</p>

      <input
        type="number"
        placeholder="Digite um valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
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
