import './App.css'
import { ContaBancaria } from './models/ContaBancaria';
import { useState } from 'react';

 const conta = new ContaBancaria();

function App() {
  const [valor, setValor] = useState(0);
  const [saldo, setSaldo] = useState(0);

 const handleDepositar = () => {
   conta.depositar(Number(valor));
   setSaldo(conta.verSaldo());
   setValor(0);
 };

 const handleSacar = () => {
   conta.sacar(Number(valor));
   setSaldo(conta.verSaldo());
   setValor(0);
 };

 return (
   <div className="App">
     <h1>Conta Bancária</h1>
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Valor"
      />
      <button onClick={handleDepositar}>Depositar</button>
      <button onClick={handleSacar}>Sacar</button>
      <p>Saldo disponível: {saldo}</p>
    </div>
  );
}

export default App;