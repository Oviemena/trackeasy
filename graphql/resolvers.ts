import { Context } from "@/pages/api/graphql";
import { PriorityType, StatusType } from "@prisma/client/edge";

export const resolvers = {
	Query: {
		task: async (_: any, args: { id : any}, context: Context) => {
			try {
			  const task = await context.prisma.task.findUnique({
				where: {
				  id: parseInt(args.id),
				},
				include: {
				  assigned_to: true,
				  escalator: true,
				},
			  });
			  if (!task) {
				throw new Error('Task not found');
			  }
			 
			  return task;
			} catch (error) {
				console.error('Error fetching task:', error);
				throw new Error("Task doesn't exists!");
			}
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
		
		createTask: async (_: any, _args: { input: any}, context: Context) => {
			// Destructure input data
			const { assigned_to, escalator, ...taskData } = _args.input;
		

			let existingTask = await context.prisma.task.findFirst({
				where: {
					AND: [
						{ id: taskData.id},
						{ name: taskData.name},
						// Add other conditions to uniquely identify a task if necessary
					]
				}
			});

			if (existingTask) {
				throw new Error("Task with same name already exists");
			}

			const newTask = await context.prisma.task.create({
				data: {
					...taskData,
					assigned_to: {
						create: assigned_to
					},
					escalator: {
						create: escalator
					}
				},
				include: {
					assigned_to: true,
					escalator: true
				}
			})
			return newTask
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