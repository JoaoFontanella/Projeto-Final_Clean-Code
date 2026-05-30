import React, { useState } from 'react';
import '../styles/Login.css';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import User from '../components/User';
import Swal from 'sweetalert2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';
  
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleQuery = async () => {
    const postData = await User(2, email, password);

    if (postData['error'] == null) {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Logado em sua conta com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EC747C',
      })
        .then(() => {
          AsyncStorage.setItem('id_usuario', postData['id_usuario']);
          navigate('/');
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

  const handleLogin = (e) => {
    e.preventDefault();
    handleQuery();
  };

  return (
    <div>
      <Header />
      <div className="name-input-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
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
          <button id="next" type='submit'>
            Login
          </button>
        <br></br>
        <Link to="/Createaccount" id="createaccount">
          Criar uma conta
        </Link>
      </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
