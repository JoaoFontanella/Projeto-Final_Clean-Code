import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="compras">
          <h3>Compras</h3>
          <ul>
            <Link to="/Favoritos" className="no-underline" id="Favoritos">
              <li>Favoritos</li>
            </Link>
            <Link to="/Cart" className="no-underline" id="Cart">
              <li>Carrinho</li>
            </Link>
          </ul>
        </div>

        <div className="conta">
          <h3>Conta</h3>
          <ul>
            <li>Minha conta</li>
            <Link to="/Createaccount" className="no-underline" id="Criarconta">
              <li>Cadastrar-se</li>
            </Link>
            <Link to="/Login" className="no-underline" id="Login">
              <li>Entrar</li>
            </Link>
          </ul>
        </div>

        <div className="suporte">
          <h3>Suporte</h3>
          <ul>

            <li>
              <a
                href="https://wa.me/5548996663692"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +55 (48) 99666-3692
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5548999817842"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +55 (48) 99981-7842
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/deolivacosmeticos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram: @deolivacosmeticos
              </a>
            </li>
          </ul>
        </div>

        <div className="pagamentos">
          <h3>Pagamento</h3>
          <img
            src="../src/assets/Pagamentos.png"
            alt="Formas de Pagamento"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
