import { Query, Mutation, Resolver, Args, Int } from '@nestjs/graphql';

import { Roles } from '../common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';

@Resolver() 
export class MessagesResolver {
    messagesThstReallyShouldBeInADB = [
        { id: 0, description: 'the test test'},
        { id: 1, description: 'tfsdfsdfds'},
    ]

    @Query()
    @Roles('user')
    getMessages(@Args('id', { type: () => Int }) id: number) {
        return this.messagesThstReallyShouldBeInADB.filter(mes => mes.id == id);
    }

    @Query('message')
    @UseGuards(AuthGuard)
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
