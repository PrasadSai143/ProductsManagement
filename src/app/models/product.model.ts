export class Product {
    constructor(
       public id: string,
       public name: string,
       public photo: string,
       public price: number,
       public isBidClosed: boolean
    ){}
}
