import { parseScript } from 'shift-parser';
import pkg from 'shift-traverser';
const { replace } = pkg;
import { codeGen } from 'shift-codegen';
import * as AST from 'shift-ast';
import { Player } from '../patterns/Player';
import { QueryScheduler } from '../patterns/QueryScheduler';
import { sine, sawtooth, testPattern } from '../patterns/SequencePattern';

export function transformPlayerSyntax(code: string): string {
  try {
    const ast = parseScript(code);
    const playerNames = new Set<string>();
    
    // Transform labeled statements using shift-traverser
    const transformedAst = replace(ast, {
      enter(node) {
        if (node.type === 'LabeledStatement') {
          const playerName = node.label; // The label is directly a string
          playerNames.add(playerName);
          
          // Get the expression from the labeled statement body
          const expression = node.body.type === 'ExpressionStatement' 
            ? node.body.expression 
            : node.body;
          
          // Create proper AST nodes using shift-ast constructors
          return new AST.ExpressionStatement({
            expression: new AST.CallExpression({
              callee: new AST.StaticMemberExpression({
                object: new AST.IdentifierExpression({
                  name: playerName
                }),
                property: 'setPattern'
              }),
              arguments: [expression]
            })
          });
        }
        return node;
      }
    });
    
    // Generate player declarations at the top
    if (playerNames.size > 0) {
      const playerDeclarations = Array.from(playerNames).map(name => 
        `const ${name} = createPlayer('${name}');`
      ).join('\n');
      
      const transformedCode = codeGen(transformedAst);
      return playerDeclarations + '\n' + transformedCode;
    }
    
    return codeGen(transformedAst);
  } catch (error) {
    console.error('Failed to parse code with shift-ast:', error);
    return code;
  }
}

// Pattern system functions
export { sine, sawtooth, testPattern };

// Player factory function
export function createPlayer(name: string): Player {
  const player = new Player(name);
  const scheduler = QueryScheduler.getInstance();
  scheduler.addPlayer(player);
  return player;
}

// Start scheduler function for REPL
export function startScheduler(): void {
  QueryScheduler.getInstance().start();
}

// Stop scheduler function for REPL
export function stopScheduler(): void {
  QueryScheduler.getInstance().stop();
}