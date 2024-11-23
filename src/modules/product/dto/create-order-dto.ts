export class CreateOrderDto {
    readonly state: string;
    readonly rating: number;
    readonly total_net_price: number;
    readonly customer_id: number;
}