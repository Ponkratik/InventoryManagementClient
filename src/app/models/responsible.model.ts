import { Region } from "./region.model";
import { Role } from "./role.model";

export class Responsible {
    responsibleId!: number;
    username!: string;
    fio!: string;
    roleByRoleId!: Role;
    regionByRegionId!: Region;
}
