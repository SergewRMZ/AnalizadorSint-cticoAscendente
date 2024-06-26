import Token from "./interface.Token";
import TipoToken from './TipoToken';


class Scanner {
  private tokens: Token[];
  private state: number;
  private lexema: string;
  private index: number;
  private source: string;

  constructor (source: string) {
    this.source = source;
    this.tokens = [];
    this.state = 0;
    this.lexema = '';
    this.index = 0;
  }

  private resetToken () {
    this.state = 0;
    this.lexema = '';
  }

  private isDigit(c: string): boolean {
    const code = c.charCodeAt(0);
    return code >= 48 && code <= 57; // Códigos ASCII para '0' a '9'
  }

  private addToken (tipo: TipoToken, lexema: string) {
    this.tokens.push({ tipo, lexema });
  }
  
  public scan(): Token[] {
    for (this.index = 0; this.index < this.source.length; this.index++) {
      const c = this.source.charAt(this.index);
      // console.log(`Analizando ${c} en estado ${this.state}`);
      switch (this.state) {
        case 0:
          if (c === 'i') {
            this.state = 1;
            this.lexema += c;
          }

          else if (c === '+') {
            this.addToken(TipoToken.PLUS, c);
          }

          else if (c === '*') {
            this.addToken(TipoToken.STAR, c);
          }

          else if (c === '(') {
            this.addToken(TipoToken.LEFT_PAREN, c);
          }

          else if (c === ')') {
            this.addToken(TipoToken.RIGHT_PAREN, c);
          }

          else if (c === ' ') {
            continue;
          }

          else {
            throw new Error (`Caracter '${c}' no reconocido.`);
          }

          break;

        case 1:
          if (c === 'd') {
            this.lexema += c;
            this.addToken(TipoToken.IDENTIFIER, this.lexema);
            this.resetToken();
          }

          else {
            throw new Error(`Caracter '${c}' no reconocido`);
          }

          break;

        default:
          break;
      }
    }

    this.addToken(TipoToken.EOF, '$');
    return this.tokens;
  }
  
}

export default Scanner;