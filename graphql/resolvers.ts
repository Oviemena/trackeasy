// import { createDateObject, formatDateTime } from "@/lib/utils";
import { Context } from "@/pages/api/graphql";
// import { PriorityType, StatusType } from "@prisma/client/edge";

export const resolvers = {
	Query: {
		task: async (_: any, _args: { id : any}, context: Context) => {
			try {
			  const task = await context.prisma.task.findUnique({
				where: {
				  id: parseInt(_args.id),
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

        escalator: async (_: any, _args: {id: any}, context: Context) => {
            return await context.prisma.escalator.findUnique({
                where: {
					id: parseInt(_args.id),
				},
				include: { tasks: true}
            });
        },

        escalators: async (_: any, _args:  { amount: any}, context: Context) => {
            return await context.prisma.escalator.findMany({
                include: { tasks: true, },
                take: _args.amount
            });
        },
        
		actor: async (_: any, _args: { id: any }, context: Context) => {
			try {
			  // Find the actor by ID
			  const actor = await context.prisma.actor.findUnique({
				where: {
				  id: parseInt(_args.id),
				},
				include: {
					tasks: true
				}
			  });
			  if (!actor) {
				throw new Error("Actor not found");
			  }

			  console.log(actor)
	  
			  return actor;
			} catch (error) {
			  console.error("Error fetching actor:", error);
			  throw new Error("An unexpected error occurred while fetching actor");
			}
		  },

        actors: async (_: any, _args:  { amount: any}, context: Context) => {
            return await context.prisma.actor.findMany({
                include: { tasks: true, },
                take: _args.amount
            });
        },
        
	},
	
	Mutation: {
		
		createTask: async (_: any, _args: { input: any}, context: Context) => {
			// Destructure input data
			const { assigned_to, escalator, ...taskData } = _args.input;
		

			let existingTask = await context.prisma.task.findUnique({
				where: {
						id: taskData.id,
						name: taskData.name,
				}
			});

			if (existingTask) {
				throw new Error("Task with same name already exists");
			}
			

			const newTask = await context.prisma.task.create({
				data: {
					...taskData,
					assigned_to: {
						createMany: {
							data: assigned_to
						}
					},
					escalator: {
						createMany: {
							data: escalator
						}
					}
				},
				include: {
					assigned_to: true,
					escalator: true
				}
			})
			return newTask
		  },

		updateTask: async (_parent: any, _args:{ input: any, id: any }, context: Context) => {
			try {
				const { ...taskData } = _args.input
				let existingTask = await context.prisma.task.findUnique({
					where: {
							id: parseInt(_args.id),
							name: taskData.name,
					}
				});
	
				if (existingTask) {
					throw new Error("Task with same name already exists");
				}

				// Update the task using Prisma's update method
				const updatedTask = await context.prisma.task.update({
					where: {
						id: parseInt(_args.id),
					},
					data: taskData,
					include: {
						assigned_to: true,
						escalator: true,
					},
				});

				return updatedTask;
			} catch (error) {
				console.error('Error updating task:', error);
				throw new Error("An unexpected error occurred while updating task");
			}
		},
		deleteTask: async (_: any, { input }: { input: any }, context: Context) => {
			const taskId = parseInt(input.id);
	
			const task = await context.prisma.task.findUnique({
				where: {
					id: taskId,
				},
				include: {
					assigned_to: true,
					escalator: true,
				},
			});
	
			if (!task) {
				throw new Error("Task doesn't exist");
			}
			for (const actor of task.assigned_to) {
				await context.prisma.actor.delete({
					where: {
						id: actor.id,
					},
				});
			}
	
			for (const escalator of task.escalator) {
				await context.prisma.escalator.delete({
					where: {
						id: escalator.id,
					},
				});
			}
			const deletedTask = await context.prisma.task.delete({
				where: {
					id: taskId,
				},
			});
	
			return deletedTask;
		},
		}
	}