import { Responsible } from "./responsible.model";

export class Item {
    itemId!: number;
    itemName!: string;
    inventoryNumber!: string;
    serialNumber!: string;
    description!: string;
    responsibleByResponsibleId?: Responsible;
    arrived!: Date;
}
