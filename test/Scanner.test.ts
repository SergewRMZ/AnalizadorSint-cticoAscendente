import Scanner from '../src/modules/parser/helpers/Lexer';

describe('Scanner', () => {
  it('should scan and generate tokens', () => {
    const source = 'id + 2 * 5 + (5)';

    const scanner = new Scanner(source);
    const tokens = scanner.scan();

    console.log(tokens);
  });
});

describe('Scanner', () => {
  it('Debería de rechazar la cadena', () => {
    const source = 'id = 5 * id';

    const scanner = new Scanner(source);
    const tokens = scanner.scan();

    console.log(tokens);
  });
});