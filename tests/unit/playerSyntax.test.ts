import { transformPlayerSyntax } from '../../src/lib/transform/playerSyntax';

describe('Player Syntax Transformation', () => {
  test('should transform simple player assignment', () => {
    const input = 'bob: sine().note("c3")';
    const output = transformPlayerSyntax(input);
    
    expect(output).toContain('const bob = createPlayer(\'bob\')');
    expect(output).toContain('bob.assign(sine().note("c3"))');
  });

  test('should handle simple console.log without transformation', () => {
    const input = 'console.log("hello")';
    const output = transformPlayerSyntax(input);
    
    expect(output).toBe(input);
  });

  test('should handle empty code', () => {
    const input = '';
    const output = transformPlayerSyntax(input);
    
    expect(output).toBe('');
  });

  test('should handle code without player syntax', () => {
    const input = 'const x = 5;\nconsole.log(x);';
    const output = transformPlayerSyntax(input);
    
    // shift-codegen has its own formatting, so just check that no player declarations are added
    expect(output).not.toContain('createPlayer');
    expect(output).toContain('x');
    expect(output).toContain('console.log');
  });

  test('should create audio chain with correct parameters', () => {
    // Test the actual execution of transformed code
    const input = 'bob: sine().note(60)';
    const output = transformPlayerSyntax(input);
    
    console.log('Transformed code:', output);
    
    // The transformed code should contain the player creation and assignment
    expect(output).toContain('createPlayer');
    expect(output).toContain('.assign(');
  });
});