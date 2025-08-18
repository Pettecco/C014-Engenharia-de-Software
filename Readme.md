Para essa atividade, foi gerado um código em **Typescript** que utiliza das bibliotecas:

- [Yup](https://www.npmjs.com/package/yup)
- [Object-deep-compare](https://www.npmjs.com/package/object-deep-compare)

Foi criado um código com objetos que representam diferentes pessoas. E a biblioteca _object-deep-compare_ foi usada para comparar se os atributos dos objetos são os mesmo, quais são iguais e quais são diferentes entre eles.
Já o pacote _Yup_ foi usado para gerar um schema de validação de um objeto (simulando um formulário) e foi usado para saber se os campos de um objeto, ao ser passado para uma função de validão, condizem com os padrões exigidos pelo schema.

Também foi alterado o nome da função que faz essa validação para gerar um conflito intencional e haver a resolução.
