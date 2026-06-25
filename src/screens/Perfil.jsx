import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Perfil.css";

const formatarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
};

const formatarCelular = (celular) => {
  celular = celular.replace(/\D/g, "");
  celular = celular.replace(/(\d{2})(\d)/, "($1) $2");
  celular = celular.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  return celular;
};

const Perfil = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [celular, setCelular] = useState("");
  const [rua, setRua] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dados = {
      nome,
      email,
      cpf,
      nascimento,
      celular,
      rua,
      cep,
      bairro,
      cidade,
    };
    console.log("Dados salvos:", dados);

  };

  const inputStyle = (value) => ({
    borderColor: value ? "#ccc" : "red"
  });

  return (
    <div>
        <Header />
        <h1 className="perfil-title">Minha Conta</h1>
        <div className="perfil-container">
            <div className="perfil">
                <div className="info-conta">
                    <form onSubmit={handleSubmit}>
                        <h3>Informações da Conta</h3>

                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            placeholder="Nome"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            style={inputStyle(nome)}
                            required
                        />

                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            placeholder="nome@email.com"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle(email)}
                            required
                        />

                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            placeholder="000.000.000-00"
                            name="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(formatarCPF(e.target.value))}
                            style={inputStyle(cpf)}
                            required
                        />

                        <label htmlFor="nascimento">Nascimento</label>
                        <input
                            type="date"
                            name="nascimento"
                            value={nascimento}
                            onChange={(e) => setNascimento(e.target.value)}
                            style={inputStyle(nascimento)}
                            required
                        />

                        <label htmlFor="phone">Número de telefone</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="(00) 00000-0000"
                            value={celular}
                            onChange={(e) => setCelular(formatarCelular(e.target.value))}
                            style={inputStyle(celular)}
                            required
                        />

                        <div className="button-container">
                            <button type="submit">Salvar</button>
                        </div>
                    </form>
                </div>
                <div className="meus-enderecos">
                    <form onSubmit={handleSubmit}>
                    <h3>Meu Endereço</h3>

                    <label htmlFor="rua">Nome da rua</label>
                    <input
                        type="text"
                        placeholder="Nome da Rua"
                        name="rua"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        style={inputStyle(rua)}
                        required
                    />

                    <label htmlFor="cep">CEP</label>
                    <input
                        type="text"
                        placeholder="CEP"
                        name="cep"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        style={inputStyle(cep)}
                        required
                    />

                    <label htmlFor="bairro">Bairro</label>
                    <input
                        type="text"
                        placeholder="Bairro"
                        name="bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        style={inputStyle(bairro)}
                        required
                    />

                    <label htmlFor="cidade">Cidade</label>
                    <input
                        type="text"
                        placeholder="Cidade"
                        name="cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        style={inputStyle(cidade)}
                        required
                    />

                    <div className="button-container">
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <Footer />
    </div>
  );
};

export default Perfil;
