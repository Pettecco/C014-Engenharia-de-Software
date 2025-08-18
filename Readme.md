Atividade: Gerência de Dependência + GIT

integrantes: Petterson e Lucas Gadbem

Descrição da atividade: a proposta desta atividade foi praticar o uso de gerência de dependências junto ao Git, explorando situações de merge e resolução de conflitos.

Código do Petterson foi reutilizado da aula passada para realização da atividade

Petterson: criou o código na aula passada, inseriu em um repositório do GitHub, arrumou o conflito de merge gerado propositalmente e escreveu parte do Readme

Lucas Gadbem: clonou o repositório, fez a criação da const Lucas, uma comparação e alterou o nome de validatePerson para  validacao propositalmente para acontecer um merge e poder resolver como propunha a atividade

Para essa atividade, foi gerado um código em **Typescript** que utiliza das bibliotecas:

- [Yup](https://www.npmjs.com/package/yup)
- [Object-deep-compare](https://www.npmjs.com/package/object-deep-compare)

Foi criado um código com objetos que representam diferentes pessoas. E a biblioteca _object-deep-compare_ foi usada para comparar se os atributos dos objetos são os mesmo, quais são iguais e quais são diferentes entre eles.
Já o pacote _Yup_ foi usado para gerar um schema de validação de um objeto (simulando um formulário) e foi usado para saber se os campos de um objeto, ao ser passado para uma função de validão, condizem com os padrões exigidos pelo schema.

Também foi alterado o nome da função que faz essa validação para gerar um conflito intencional e haver a resolução.
