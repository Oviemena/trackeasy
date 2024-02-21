

export const typeDefs = `#graphql 
    scalar Date

    type Task {
    id: ID!
    name: String!
    priority: PriorityType!
    createdAt: Date
    updatedAt: Date
    deadline: Date
    duration: String!
    status: StatusType!
    assigned_to: [Actor!]!
    escalator: [Escalator!]!
    done: Boolean!
    delayed: Boolean
}

type Actor {
  id: ID!
  name: String!
  email: String!
  phone: String!
  tasks: [Task!]
} 

type Escalator {
  id: ID!
  name: String!
  email: String
  phone: String!
  tasks: [Task!]
}

type Query {
  task(id: ID!): Task! 
  tasks(amount: Int): [Task!]!
  actor(id: ID!): Actor!
  actors(amount: Int): [Actor!]!
  escalator(id: ID!): Escalator!
  escalators(amount: Int): [Escalator!]!
}

type Mutation {
  createTask(input: CreateTaskQuery): Task
  updateTask(id: ID!, input: UpdateTaskQuery): Task
  deleteTask(id: ID!, input: DeleteTaskQuery): Task
}

input ActorInput {
  name: String!
  email: String!
  phone: String!
}

input EscalatorInput {
  name: String!
  email: String
  phone: String!
}

input CreateTaskQuery {
  name: String!
  priority: PriorityType!
  deadline: String
  duration: String
  status: StatusType!
  assigned_to: ActorInput!
  escalator: EscalatorInput!
  delayed: Boolean
  done: Boolean
}

input UpdateTaskQuery {
  name: String
  priority: PriorityType
  deadline: String
  status: StatusType!
  assigned_to: ActorInput
  escalator: EscalatorInput
  done: Boolean!
  delayed: Boolean!
}

input DeleteTaskQuery {
  id: ID!
}

enum PriorityType {
  LOW
  NORMAL
  HIGH
}

enum StatusType {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
}


`;

