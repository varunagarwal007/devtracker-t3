import {
	LoginLink,
	RegisterLink,
	getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import UserAccountNav from "./UserAccountNav"

const NavBar = () => {
	const { getUser } = getKindeServerSession()
	const user = getUser()
	return (
		<nav className="sticky h-20 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all">
			<MaxWidthWrapper>
				<div className="flex h-20 items-center justify-between border-b border-zinc-200">
					<Link href="/" className="flex z-40 font-bold relative text-2xl">
						{" "}
						<span className="sr-only">DevTracker</span>
						<span>Dev</span>
						<span className="text-primary">Tracker</span>
						<sup className="absolute left-[calc(100%+.1rem)] top-0 text-xs font-bold ">
							[Beta]
						</sup>
					</Link>

					<div className="hidden items-center space-x-4 sm:flex">
						{!user ? (
							<>
								<Link
									href="/"
									className={buttonVariants({
										variant: "ghost",
										size: "sm",
									})}
								>
									Pricings
								</Link>
								<LoginLink
									className={buttonVariants({
										variant: "ghost",
										size: "sm",
									})}
								>
									Sign In
								</LoginLink>
								<RegisterLink
									className={buttonVariants({
										size: "sm",
									})}
								>
									Get started <ArrowRight className="ml-1.5 h-5 w-5" />{" "}
								</RegisterLink>
							</>
						) : (
							<>
								<Link
									href="/dashboard"
									className={buttonVariants({
										variant: "ghost",
										size: "sm",
									})}
								>
									Dashboard
								</Link>
								<UserAccountNav
									name={
										!user.given_name || !user.family_name
											? "Your Account"
											: `${user.given_name} ${user.family_name}`
									}
									email={user.email ?? ""}
									userId={user.id}
								/>
							</>
						)}
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	)
}

export default NavBar
