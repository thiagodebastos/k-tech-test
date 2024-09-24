import { Skeleton } from "@/components/ui/skeleton"
import { useUsers } from "./usersHooks"
import { UserCard } from "./UserCard"


export function UsersList() {
  const { users, isLoadingUsers, usersError } = useUsers()

  if (isLoadingUsers) return <Skeleton className="h-12 w-12 rounded-s" />
  if (usersError) return <div>Error loading users: ${JSON.stringify(usersError)}</div>
  if (!users || users.length === 0) return (
    <div>No users found</div>
  )

  return users.map((user) =>
    <UserCard key={user.id} user={user} />
  )
}
