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
        
        
    // Task: {
    //     escalators: async (parent: any, _args: any, context: Context) => {
	// 		return await context.prisma.escalator.findMany({
	// 			where: {
	// 				taskId: parent.id,
	// 			},
	// 		});
	// 	},
    // }    
	},
	
	Mutation: {
		
		createTask: async (_: any, {input}: {input: any}, context: Context) => {
			return await context.prisma.task.create({
				data: {
					name: input.name,
					priority: input.priority,
					deadline: input.deadline,
					duration: input.duration,
					status: input.status,
					assigned_to: {
						create: {
							name: input.assigned_to.name,
							email: input.assigned_to.email,
							phone: input.assigned_to.phone
						}
					},
					escalator: {
						create: {
							name: input.escalator.name,
							email: input.escalator.email,
							phone: input.escalator.phone,
							assigned_to: {
								connect: { id: input.assigned_to.id } // Assuming you have the ID of the assigned actor in the input
							}
						}
					},
					delayed: input.delayed,
					done: input.done
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
	},
};