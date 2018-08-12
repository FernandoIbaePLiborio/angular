export class User {
    constructor(public email: string, public name: string, private password){}

    matches(another: User): boolean{
        return another !== undefined &&
        another.email && this.email &&
        another.password == this.password
    }

}
//*importante* tipar variaveis e constantes tipo da chave e tipo do valor 
export const users: {[key:string]: User} = { 
    "juliana@gmail.com": new User('Juliana@gmail.com', 'juliana', 'juliana23'),
    "amanda@gmail.com": new User('Amanda@gmail.com', 'Amanda', 'amanda21')
}
