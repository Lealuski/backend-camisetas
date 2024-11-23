import { Module } from "@nestjs/common";
import { PathController } from "./path.controller";

@Module({
    controllers: [PathController],
})
export class PathModule { }
