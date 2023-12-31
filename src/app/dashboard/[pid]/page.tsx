import Overview from "@/components/Overview"
interface PageParams {
	params: {
		pid: string
	}
}
const Page = async ({ params }: PageParams) => {
	return <Overview projectId={params.pid} />
}

export default Page
