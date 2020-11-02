import { Query, Mutation, Resolver, Args, Int, GraphQLExecutionContext, Context } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

import { Roles } from '../common';

@Resolver() 
export class MessagesResolver {
    messagesThstReallyShouldBeInADB = [
        { id: 0, description: 'the test test'},
        { id: 1, description: 'tfsdfsdfds'},
    ]

    @Query()
    // @Roles('user')
    getMessages(@Args('id', { type: () => Int }) id: number) {
        return this.messagesThstReallyShouldBeInADB.filter(mes => mes.id == id);
    }

    @Query('message')
    // @UseGuards(AuthGuard('jwt'))
    message() {
        return this.messagesThstReallyShouldBeInADB
    }

    @Mutation()
    createMessage(@Args('description', { type: () => String } ) description: string) {
        const id = this.messagesThstReallyShouldBeInADB.length;
        const newMessage = { id, description };
        this.messagesThstReallyShouldBeInADB.push(newMessage);
        return newMessage;
    }
}
