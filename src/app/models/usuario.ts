export class Usuario{
    constructor(
        public id:number,
        public user:string,
        public pass:string,
        public name:string, 
        public token:string,
        public token_expire:Date){
    }
}