import { json, LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { UserPanel } from '~/components/user-panel'
import { Layout } from '~/components/layout'
import { getOtherUsers } from '~/utils/user.server'
import { useLoaderData, Outlet } from '@remix-run/react'
import { getFilteredKudos } from '~/utils/kudo.server'
import { Kudo as IKudo, Profile } from '@prisma/client'
import { Kudo } from '~/components/kudo'

interface KudoWithProfile extends IKudo {
    author: {
        profile: Profile
    }
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const users = await getOtherUsers(userId)
    const kudos = await getFilteredKudos(userId, {}, {})
    return json({ users, kudos })
}

export default function Home() {
    const { users, kudos } = useLoaderData()
    return (
            <Layout>
                <Outlet />
                <div className="h-full flex">
                    <UserPanel users={users} />
                    <div className="flex-1 flex-col">

                    <div className="flex-1 flex">
                        <div className="w-full p-10 flex flex-col gap-y-4">
                            {kudos.map((kudo: KudoWithProfile) => (
                            <Kudo key={kudo.id} kudo={kudo} profile={kudo.author.profile} />
                            ))}
                        </div>
                        {/*recent*/}
                    </div>
                    </div>
                    </div>
                </Layout>
            )
}


