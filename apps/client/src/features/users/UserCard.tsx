import React from "react"
import { useState } from "react"
import { MailIcon, PhoneIcon, PencilIcon, TrashIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserForm } from "./UserForm"
import { UserDto } from "./usersApi"
import { useUsers } from "./usersHooks"

interface UserCardProps {
  user: UserDto
}

export const UserCard = React.memo(function UserCard({ user }: UserCardProps) {

  const [isEditing, setIsEditing] = useState(false)
  const { handleRemoveUser, removeUserError } = useUsers()


  async function handleRemove() {
    try {
      await handleRemoveUser(user.id)
    } catch (error) {
      console.error("Failed to delete user:", error)
      console.error(removeUserError)
    }
  }

  const handleEdit = () => setIsEditing(true)
  const handleCancel = () => setIsEditing(false)

  return (
    <Card data-testid={`user-card-${user.id}`} className="mb-4 w-80">
      <CardHeader>
        <CardTitle>
          {!isEditing && user.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UserForm
            user={user}
            onClose={handleCancel}
          />
        )
          : (
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <MailIcon />
                <span aria-label="User email">{user.email}</span>
              </div>
              <div className="flex gap-4">
                <PhoneIcon />
                <span aria-label="User phone">{user.phone}</span>
              </div>
            </div>
          )
        }
      </CardContent>
      <CardFooter>
        <div className="flex  w-full justify-end gap-2">
          {!isEditing &&
            <>
              <Button aria-label="edit user" role="button" variant="outline" onClick={handleEdit}>
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Button aria-label="remove user" role="button" variant="destructive" size="icon" onClick={handleRemove}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            </>
          }
        </div>
      </CardFooter>
    </Card >
  )
})
