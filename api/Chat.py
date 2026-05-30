from flask import Flask, request, jsonify
import os
import psycopg2
import requests
from dotenv import load_dotenv
from flask_cors import CORS
from psycopg2.extras import RealDictCursor

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "*"}})

API_KEY = os.getenv("GEMINI_API_KEY")
DB_CONFIG = {
    'dbname': os.getenv("DB_NAME"),
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'host': os.getenv("DB_HOST"),
    'port': os.getenv("DB_PORT")
}

def call_gemini(prompt):
    try:
        endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
        payload = {"contents": [{"parts": [{"text": prompt}]}]}
        headers = {"Content-Type": "application/json"}
        response = requests.post(endpoint, json=payload, headers=headers, timeout=10)

        response.raise_for_status()
        json_data = response.json()
        return json_data['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        print(f"Erro ao chamar Gemini: {e}")
        return "erro"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"response": "Mensagem vazia."}), 400

    # Classificação da intenção do usuário
    classification_prompt = f"""
Sua tarefa é classificar a mensagem de um cliente da loja de cosméticos.

Classifique como:
- "ingredientes" se o cliente estiver perguntando sobre ingredientes dos produtos
- "recomendacao" se o cliente estiver pedindo sugestões de produtos
- "outro" para outras intenções

Mensagem: "{user_message}"

Responda apenas com uma destas palavras: ingredientes, recomendacao ou outro.
"""
    classify_answer = call_gemini(classification_prompt).strip().lower()
    if classify_answer == "erro":
        return jsonify({"response": "Erro ao chamar IA para classificação."}), 500

    # Intenção: perguntar ingredientes
    if classify_answer == "ingredientes":
        extract_prompt = f"""
A seguinte frase foi escrita por um cliente de cosméticos:
"{user_message}"

Extraia até 3 palavras-chave relacionadas a ingredientes. Separe por vírgulas.
"""
        keywords = call_gemini(extract_prompt).strip()
        keywords_list = [kw.strip().lower() for kw in keywords.split(",") if kw.strip()]

        if not keywords_list:
            return jsonify({"response": "Nenhum ingrediente encontrado na sua pergunta."})

        try:
            with psycopg2.connect(**DB_CONFIG) as conn:
                with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                    conditions = []
                    params = []
                    for kw in keywords_list:
                        kw_like = f"%{kw}%"
                        conditions.append("LOWER(p.ingredientes) LIKE %s")
                        params.append(kw_like)

                    sql = f"""
                    SELECT p.nome, p.ingredientes
                    FROM produtos p
                    WHERE {" OR ".join(conditions)}
                    LIMIT 5
                    """
                    cursor.execute(sql, params)
                    produtos = cursor.fetchall()

        except Exception as e:
            print(f"Erro no banco de dados: {e}")
            return jsonify({"response": "Erro ao consultar ingredientes no banco."}), 500

        if not produtos:
            return jsonify({"response": "Não encontrei produtos com esses ingredientes."})

        lista = "\n".join([f"• **{p['nome']}**: {p['ingredientes']}" for p in produtos])
        return jsonify({"response": f"Aqui estão os ingredientes dos produtos encontrados:\n\n{lista}"})

    # Intenção: resposta informal
    if classify_answer == "outro":
        no_product_prompt = f"""
Você é um atendente simpático da loja Doliva Cosméticos.

O cliente escreveu: "{user_message}"

Responda de forma amigável e cordial, sem recomendar produtos.
"""
        reply = call_gemini(no_product_prompt)
        return jsonify({"response": reply.strip()})

    # Intenção: recomendação de produtos
    extract_prompt = f"""
A seguinte frase foi escrita por um cliente de cosméticos:
"{user_message}"

Extraia até 3 palavras-chave para buscar produtos no banco de dados. Separe por vírgulas.
"""
    keywords = call_gemini(extract_prompt).strip()
    keywords_list = [kw.strip().lower() for kw in keywords.split(",") if kw.strip()]

    if not keywords_list:
        return jsonify({"response": "Não foram encontradas palavras-chave para busca."}), 400

    # Consulta no banco de dados para recomendação
    try:
        with psycopg2.connect(**DB_CONFIG) as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                conditions = []
                params = []
                for kw in keywords_list:
                    kw_like = f"%{kw}%"
                    conditions.append("(LOWER(p.nome) LIKE %s OR LOWER(p.descricao) LIKE %s OR LOWER(c.nome) LIKE %s)")
                    params.extend([kw_like, kw_like, kw_like])

                sql = f"""
                SELECT
                    p.id_produto,
                    p.nome, 
                    p.descricao, 
                    p.preco_venda, 
                    p.gramas, 
                    p.recomendacao,
                    p.ingredientes,
                    c.nome AS categoria_nome
                FROM produtos p
                LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
                WHERE {" OR ".join(conditions)}
                LIMIT 5
                """
                cursor.execute(sql, params)
                produtos = cursor.fetchall()

    except Exception as e:
        print(f"Erro no banco de dados: {e}")
        return jsonify({"response": "Erro ao consultar o banco de dados."}), 500

    if not produtos:
        return jsonify({"response": "Nenhum produto encontrado para sua busca."})

    lista_produtos = "\n".join([
        f"• **{p['nome']}** ({p['gramas']}g | R$ {p['preco_venda']} | Categoria: {p['categoria_nome']}): {p['descricao']}\n"
        f"Recomendado: {p['recomendacao']}\n"
        f"🔗 <a href='http://localhost:5173/product/{p['id_produto']}' target='_blank'>Ver produto</a>"
        for p in produtos
    ])

    final_prompt = f"""
Você é um atendente simpático da loja Doliva Cosméticos.

O cliente escreveu: "{user_message}"

Aqui estão os produtos encontrados:

{lista_produtos}

Monte uma resposta útil e amigável, destacando os produtos de forma clara e objetiva.
"""
    final_response = call_gemini(final_prompt).strip()
    return jsonify({"response": final_response})

if __name__ == "__main__":
    app.run(debug=True, port=5000)