import { Context } from "@/pages/api/graphql";


export const resolvers = {
	Query: {
		task: async (_: any, _args: any, context: Context) => {
			return await context.prisma.task.findUnique({
				where: {
					id: _args.id,
				},
			});
		},
		
		tasks: async (_: any, _args: any, context: Context) => {
			return await context.prisma.task.findMany({
				include: { assigned_to: true, escalator: true },
                take: _args.amount
			});
		},

        escalator: async (_: any, _args: any, context: Context) => {
            return await context.prisma.escalator.findMany({
                where: {
					id: _args.id,
				},
            });
        },

        escalators: async (_: any, _args: any, context: Context) => {
            return await context.prisma.escalator.findMany({
                include: { tasks: true, },
                take: _args.amount
            });
        },
        
	},
	
	Mutation: {
		
		createTask: async (_: any, _args: { input: any }, context: Context) => {
			// Destructure input data
			const { assigned_to, escalator, ...taskData } = _args.input;
		
			// Check if the Actor already exists
			let assignedActor = null;
			if (assigned_to.id) {
			  assignedActor = await context.prisma.actor.findUnique({
				where: { id: assigned_to.id }
			  });
			}
		
			// If Actor doesn't exist or id is not provided, create a new one
			if (!assignedActor) {
			  assignedActor = await context.prisma.actor.create({
				data: {
				  name: assigned_to.name,
				  email: assigned_to.email,
				  phone: assigned_to.phone
				}
			  });
			}
		
			// Check if the Escalator already exists
			let escalatorInstance = null;
			if (escalator.id) {
			  escalatorInstance = await context.prisma.escalator.findUnique({
				where: { id: escalator.id }
			  });
			}
		
			// If Escalator doesn't exist or id is not provided, create a new one
			if (!escalatorInstance) {
			  escalatorInstance = await context.prisma.escalator.create({
				data: {
				  name: escalator.name,
				  email: escalator.email,
				  phone: escalator.phone
				}
			  });
			}
		
			// Create the Task with the provided data and associated Actor and Escalator
			return await context.prisma.task.create({
			  data: {
				...taskData,
				assigned_to: { connect: { id: assignedActor.id } },
				escalator: { connect: { id: escalatorInstance.id } }
			  }
			});
		  },

		  updateTask: async (_: any, {input}: {input: any}, context: Context) => {
			return await context.prisma.task.update({
				where: {
					id: input.id,
				},
				data: input,
			});
		},

		
		deleteTask: async (_: any, {input}: {input: any}, context: Context) => {
			return await context.prisma.task.delete({
                where: {
					id: input.id,
				}
			});
		},
		}
	}