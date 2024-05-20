# Aplicação Mobile de Publicação de Vídeos

## Sumário

1. [Introdução](#introdução)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Pré-requisitos](#pré-requisitos)
5. [Instalação](#instalação)
6. [Configuração](#configuração)
7. [Uso](#uso)
8. [Estrutura do Projeto](#estrutura-do-projeto)
9. [Contribuição](#contribuição)
10. [Licença](#licença)

## Introdução

Esta é uma aplicação mobile desenvolvida com React Native utilizando Expo para publicação de vídeos, similar a uma rede social. Os usuários podem criar contas, fazer login, publicar vídeos, visualizar vídeos de outros usuários, curtir e comentar. O backend da aplicação é gerenciado pelo Appwrite.

## Funcionalidades

- Cadastro e autenticação de usuários.
- Publicação de vídeos.
- Feed de vídeos publicados por outros usuários.
- Perfil de usuário.
- Upload e reprodução de vídeos.

## Tecnologias Utilizadas

- **Frontend**: React Native, Expo
- **Backend**: Appwrite

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Expo CLI
- Conta no Appwrite e instância configurada

## Instalação

1. Clone o repositório para a sua máquina local:
    ```sh
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. Instale as dependências do projeto:
    ```sh
    npm install
    ```

3. Instale a CLI do Expo, se ainda não tiver:
    ```sh
    npm install -g expo-cli
    ```

## Configuração

1. Crie uma conta no appwrite free e crie o banco de dados para a aplicação

2. Certifique-se de que seu backend do Appwrite está configurado corretamente, com os seguintes serviços ativados:
    - Autenticação
    - Banco de dados
    - Armazenamento (para vídeos)
    - Funções (opcional, para tarefas específicas)

## Uso

1. Inicie o projeto Expo:
    ```sh
    expo start
    ```

2. Use o aplicativo Expo Go em seu dispositivo móvel para escanear o QR code fornecido e testar a aplicação.


