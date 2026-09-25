# FinanLite — Controle Financeiro Pessoal

App mobile em React Native (Expo) com banco de dados SQLite embarcado (`app.db`)
e Programação Orientada a Objetos aplicada em profundidade.

## Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** (Android/iOS) ou rode num emulador.

> **Importante:** `expo-sqlite` com `execSync`/`runSync`/`getAllSync` roda em
> **build nativa** (Expo Go ou dev build), não no navegador (web).

## Estrutura do projeto

```
FinanLite/
├── App.js
├── src/
│   ├── database/
│   │   └── db.js                 # Classe Database — único ponto de acesso ao SQLite
│   ├── models/
│   │   ├── User.js                # #username, #password + setters com validação
│   │   ├── Transaction.js         # #type, #description, #amount, #date + setters
│   │   ├── FinanceCardModel.js    # classe base abstrata (getIcon/getFormattedValue)
│   │   ├── IncomeCardModel.js     # subclasse polimórfica (receita)
│   │   └── ExpenseCardModel.js    # subclasse polimórfica (despesa)
│   ├── components/
│   │   └── TransactionCard.js     # componente reutilizável e defensivo (try/catch)
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js          # saldo total + lista de lançamentos
│   │   └── AddTransactionScreen.js
│   └── navigation/
│       └── AppNavigator.js        # inicializa o banco e monta as rotas
```

## Requisitos atendidos

1. **SQLite embarcado**: `Database.init()` cria as tabelas `users` e
   `transactions` via `execSync`. Inserção e consulta são métodos estáticos
   encapsulados (`insertUser`, `findUserByUsername`, `insertTransaction`,
   `getTransactionsByUser`, `getBalance`).
2. **Encapsulamento e validações**: `User` e `Transaction` usam campos
   privados (`#campo`) e setters que lançam `throw new Error(...)` quando a
   regra de negócio é violada (senha curta, valor negativo, data inválida etc.).
3. **Polimorfismo e herança em UI**: `FinanceCardModel` é uma classe base
   abstrata (lança erro se instanciada diretamente); `IncomeCardModel` e
   `ExpenseCardModel` sobrescrevem `getIcon()` e `getFormattedValue()`.
   `TransactionCard` decide em tempo de execução qual subclasse usar.
4. **Tratamento de exceções**: toda ação sensível (login, cadastro, salvar
   lançamento, carregar dados, inicializar banco) está em `try/catch`, e o
   `TransactionCard` nunca quebra a lista inteira por causa de um item ruim.

## Observação sobre dependências

Este projeto foi gerado sem `node_modules` (sem acesso à internet no ambiente
de geração). Depois de baixar, rode `npm install` normalmente — todas as
dependências (`expo`, `expo-sqlite`, `@react-navigation/*`) já estão listadas
no `package.json`.
