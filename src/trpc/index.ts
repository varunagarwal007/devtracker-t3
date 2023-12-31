import { issueRouters } from "./routers/issues"
import db from "@/db"
import { getUserAvatar } from "@/lib/functions/functions"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { TRPCError } from "@trpc/server"
import { projectRouters } from "./routers/project"
import { userRouters } from "./routers/user"
import { publicProcedure, router } from "./trpc"

export const appRouter = router({
	authCallback: publicProcedure.query(async () => {
		const { getUser } = getKindeServerSession()
		const user = getUser()
		if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" })
		//check if the user is in database
		const dbUser = await db.user.findFirst({
			where: {
				id: user.id,
			},
		})

		if (!dbUser) {
			//create user
			await db.user.create({
				data: {
					id: user.id,
					email: user.email,
					avatar: getUserAvatar(),
					name: user?.given_name || user.email,
				},
			})
		}

		return { success: true }
	}),
	user: userRouters,
	project: projectRouters,
	issue: issueRouters,
})

export type AppRouter = typeof appRouter
