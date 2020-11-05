import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class PaginationModel {
    @Field()
    take?: number;
    @Field()
    skip?: number;
}