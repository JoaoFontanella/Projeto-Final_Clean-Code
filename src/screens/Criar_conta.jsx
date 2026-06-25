import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import User from '../components/User';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Criar_conta() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleQuery = async () => {
    const postData = await User(1, email, password);

    if (postData['error'] == null) {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Conta cadastrada com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EC747C',
      })
        .then(() => {
          navigate('/Login');
      });
    } else {
      Swal.fire({
        title: 'Atenção!',
        text: postData['error'],
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EC747C',
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleQuery();
  };

  return (
    <div>
      <Header />
      <div className="name-input-container">
      <form onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <input
          id="email"
          type="email"
          placeholder="Digite seu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button id="create" type="submit">
          Criar
        </button>
        <Link to="/Login" id="login">
          Já tenho uma conta
        </Link>
      </form>
      </div>
      <Footer />
    </div>
  );
}

export default Criar_conta;
