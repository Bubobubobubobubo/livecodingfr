import { parseScript } from 'shift-parser';
import pkg from 'shift-traverser';
const { replace } = pkg;
import { codeGen } from 'shift-codegen';
import * as AST from 'shift-ast';

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
                property: 'assign'
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

// Chainable audio parameter builder
class AudioChain {
  private params: any = {};
  
  constructor(initialParams: any = {}) {
    this.params = { ...initialParams };
  }
  
  
  // Common superdough parameters
  note(value: string | number) { return new AudioChain({ ...this.params, note: value }); }
  s(value: string) { return new AudioChain({ ...this.params, s: value }); }
  gain(value: number) { return new AudioChain({ ...this.params, gain: value }); }
  cutoff(value: number) { return new AudioChain({ ...this.params, cutoff: value }); }
  resonance(value: number) { return new AudioChain({ ...this.params, resonance: value }); }
  delay(value: number) { return new AudioChain({ ...this.params, delay: value }); }
  room(value: number) { return new AudioChain({ ...this.params, room: value }); }
  pan(value: number) { return new AudioChain({ ...this.params, pan: value }); }
  attack(value: number) { return new AudioChain({ ...this.params, attack: value }); }
  decay(value: number) { return new AudioChain({ ...this.params, decay: value }); }
  sustain(value: number) { return new AudioChain({ ...this.params, sustain: value }); }
  release(value: number) { return new AudioChain({ ...this.params, release: value }); }
  
  // Play the sound
  async play(deadline = 0, duration = 0.125) {
    try {
      // Import superdough and its initialization functions
      const superdoughModule = await import('superdough');
      const { 
        superdough, 
        initAudioOnFirstClick, 
        registerSynthSounds 
      } = superdoughModule;
      
      // Initialize superdough if not already done
      if (!(window as any).__superdoughInitialized) {
        console.log('Initializing superdough...');
        await Promise.all([
          initAudioOnFirstClick(),
          registerSynthSounds()
        ]);
        (window as any).__superdoughInitialized = true;
        console.log('Superdough initialized');
      }
      
      console.log('Playing sound with params:', this.params);
      console.log('Deadline:', deadline, 'Duration:', duration);
      
      // Call superdough with the parameters
      superdough(this.params, deadline, duration);
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
    return this;
  }
  
  getParams() {
    return this.params;
  }
}

// Common synth/instrument generators
export function sine() { return new AudioChain({ s: 'sine' }); }
export function sawtooth() { return new AudioChain({ s: 'sawtooth' }); }
export function square() { return new AudioChain({ s: 'square' }); }
export function triangle() { return new AudioChain({ s: 'triangle' }); }

// Player factory function
export function createPlayer(name: string) {
  return {
    name,
    currentChain: null as AudioChain | null,
    
    assign(chain: AudioChain) {
      this.currentChain = chain;
      // Auto-play when assigned
      if (chain && typeof chain.play === 'function') {
        chain.play().catch(error => {
          console.error(`Failed to play sound for player ${name}:`, error);
        });
      }
      return this;
    },
    
    stop() {
      // TODO: Implement stop functionality
      console.log(`Player ${name} stopped`);
      return this;
    }
  };
}