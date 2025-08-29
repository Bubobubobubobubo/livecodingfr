declare module 'superdough' {
  interface SuperdoughParams {
    s?: string;
    note?: string | number;
    gain?: number;
    cutoff?: number;
    resonance?: number;
    delay?: number;
    room?: number;
    pan?: number;
    [key: string]: any;
  }

  function superdough(params: SuperdoughParams, deadline?: number, duration?: number): void;
  
  export default superdough;
}