import { CompareProperties } from 'object-deep-compare';
import { object, string, number } from 'yup';

const validationSchema = object({
  nome: string().required(),
  idade: number().required().positive().integer(),
  curso: string(),
  profisao: string(),
});

const validacao = (pessoa: any, nome: string) => {
  try {
    validationSchema.validateSync(pessoa);
    console.log(`${nome} é válido.`);
  } catch (error: any) {
    console.log(`${nome} inválido:`, error.errors);
  }
};

function main() {
  const pessoa1 = {
    nome: 'Petterson',
    idade: 23,
    curso: 'Engenharia de computação',
    documento: '12323447610',
  };

  const pessoa2 = {
    nome: 'Murilo',
    idade: 21,
    curso: 'Engenharia de computação',
  };

  const pessoa3 = {
    nome: 'Lucas',
    profissao: 'Desenvolvedor',
    idade: -10,
  };

  const Lucas = {
  nome: 'Lucas Gadbem',
  idade: 21,
  curso: 'Engenharia de computação',
  documento: '01674432321',
};

  const isSamePerson1 = CompareProperties(pessoa1, pessoa2);
  const isSamePerson2 = CompareProperties(pessoa1, pessoa3);
  const isSamePerson3 = CompareProperties(pessoa1, Lucas);

  console.log(isSamePerson1);
  console.log(isSamePerson2);
  console.log(isSamePerson3);

  validacao(pessoa1, 'Pessoa 1');
  validacao(pessoa2, 'Pessoa 2');
  validacao(pessoa3, 'Pessoa 3');
}

main();
