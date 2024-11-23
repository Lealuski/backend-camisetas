export class CreatePrintOrderDto {
    readonly gross_price: number;
    readonly amount: number;
    readonly front_image_id: number;
    readonly back_image_id: number;
    readonly shoulders_image_id: number;
    readonly size_id: number;
    readonly color_id: number;
    readonly material_id: number;
    readonly order_id: number;
}