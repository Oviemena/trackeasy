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
				include: { assigned_to: true, escalators: true },
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
                include: { task: true, },
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
				data: input,
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