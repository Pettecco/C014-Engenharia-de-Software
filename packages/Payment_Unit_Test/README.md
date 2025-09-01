## Payment Unit Test

Este projeto é uma aplicação de exemplo para testes unitários de um sistema de pagamentos em uma loja online, utilizando TypeScript e Jest.

### Funcionalidades

- Simulação de compras em uma loja online (`OnlineStore.ts`)
- Processamento de pagamentos via gateway (`PaymentGateway.ts`)
- Validação de cartões de crédito (`utils/ValidateCard.ts`)
- Testes automatizados para garantir o funcionamento correto dos módulos (`tests/OnlineStore.test.ts`)

### Estrutura do Projeto

```
src/
	OnlineStore.ts         # Lógica da loja online
	PaymentGateway.ts      # "Integração" com gateway de pagamento
	utils/
		ValidateCard.ts      # Função utilitária para validação de cartão
tests/
	OnlineStore.test.ts    # Testes unitários da loja online
jest.config.js           # Configuração do Jest
tsconfig.json            # Configuração do TypeScript
package.json             # Dependências e scripts
```

### Como executar os testes

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute os testes:
   ```bash
   npm test
   ```
