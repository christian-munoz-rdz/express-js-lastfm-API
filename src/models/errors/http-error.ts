class HttpError extends Error {
    public code: number; 
  
    constructor(message: string, errorCode: number) {
      super(message); 
      this.code = errorCode; 
      Object.setPrototypeOf(this, HttpError.prototype); 
    }
  }
  
  export default HttpError;