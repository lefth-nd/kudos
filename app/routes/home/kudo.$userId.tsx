import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserById } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request, params }) => {
    const { userId } = params

    if (typeof userId !== 'string') {
        return redirect('/home')
    }

    const recipient = await getUserById(userId)
    console.log("recipient", recipient)
    return json({ recipient })


}

export default function KudoModal() {
    const data = useLoaderData()
    console.log("data", data[0])
    return <h2> User: {data.recipient.profile.firstName} {data.recipient.profile.lastName} </h2>
}

