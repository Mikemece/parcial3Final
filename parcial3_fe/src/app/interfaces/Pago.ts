export interface Pago {
    id: string;
    timestamp : Date;
    email : string;
    concepto : string;
    token : string;
    importe : number;
    imagen : string;
    localizacion: string;
    long: number;
    lat: number;
}
