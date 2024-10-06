class HttpError extends Error {
    public code: number; // Define la propiedad 'code' con tipo explícito
  
    constructor(message: string, errorCode: number) {
      super(message); // Usa el constructor de 'Error'
      this.code = errorCode; // Asigna el código de error
      Object.setPrototypeOf(this, HttpError.prototype); // Asegura el correcto prototipo para compatibilidad con ES6+
    }
  }
  
  export default HttpError;