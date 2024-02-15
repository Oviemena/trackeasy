export const typeDefs = `#graphql 
    type Task {
        id: ID!
        name: String!
        priority: PriorityEnum!
        createdAt: String
        deadline: String
        duration: String
        status: StatusEnum!
        assignedId: String
        escalators: [Escalator]
        done: Boolean
        delayed: Boolean
    }

    type Actor {
        id: ID!
        name: String!
        task: Task!
        email: String!
        phone: String!
    } 

    type Escalator {
        id: ID!
        name: String!
        email: String
        phone: String!
        taskId: String
    }



    type Query {
        task(id: ID!): Task 
        tasks( amount: Int): [Task]
        actor(id: ID!): Actor
        actors(amount: Int): [Actor]
        escalator(id: ID!): Escalator
        escalators(amount: Int): [Escalator]

    }

    type Mutation {
        createTask (input: CreateTaskQuery) : Task
        updateTask(id: ID!, input: UpdateTaskQuery) : Task
        deleteTask(id: ID!, input: DeleteTaskQuery) : Task
    }

    input CreateTaskQuery {
        name: String!
        priority: PriorityEnum!
        deadline: String
        status: StatusEnum!
        assigned_to: Actor!
        assignedId: String
        escalator: Escalator!
        escalatorId: String
    }

    input UpdateTaskQuery {
        name: String!
        priority: PriorityEnum!
        deadline: String
        status: StatusEnum!
        assigned_to: Actor!
        assignedId: String
        escalator: Escalator!
        escalatorId: String
    }

    input DeleteTaskQuery {
        id: ID!
    }




enum PriorityEnum {
    low,
    normal,
    high,
}

enum StatusEnum {
    Not_Started,
    In_Progress,
    Completed,
}

`;

