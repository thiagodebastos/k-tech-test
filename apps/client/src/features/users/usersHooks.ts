import { useToast } from "@/hooks/use-toast"
import { CreateUserDto, UpdateUserDto, useCreateUserMutation, useFindAllUsersQuery, UserDto, useRemoveUserMutation, useUpdateUserMutation } from "./usersApi"
import { useState } from "react"

/**
 * NOTE: simplifies the use of generated api endpoint hooks
 * this allows gives us access to redux-toolkit-query hooks
 * from anywhere in the app
 */
export const useUsers = () => {
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null)

  const { data: users, isLoading: isLoadingUsers, error: usersError } = useFindAllUsersQuery()

  const [createUser, { isLoading: isCreatingUser, error: createUserError }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdatingUser, error: updateUserError }] = useUpdateUserMutation()
  const [removeUser, { isLoading: isRemovingUser, error: removeUserError }] = useRemoveUserMutation()

  const handleCreateUser = async (createUserDto: CreateUserDto) => {
    try {
      const user = await createUser({ createUserDto }).unwrap()
      toast({
        title: "User Created",
        description: `Successfully created user ${user.name}`
      })
      return user

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive"
      })
      throw error
    }
  }

  const handleUpdateUser = async (id: string, updateUserDto: UpdateUserDto) => {
    try {
      const user = await updateUser({ id, updateUserDto }).unwrap()
      toast({
        title: "User Updated",
        description: `Successfully updated user ${user.name}`
      })
      return user

    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create user`,
        variant: "destructive"
      })
      throw error
    }
  }

  const handleRemoveUser = async (id: string) => {
    try {
      await removeUser({ id }).unwrap()
      setCurrentUser(null)
      toast({
        title: "User Removed",
        description: `Successfully removed user`
      })

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove user",
        variant: "destructive"
      })
      throw error
    }
  }

  return {
    users,
    currentUser,
    isLoadingUsers,
    isCreatingUser,
    isRemovingUser,
    isUpdatingUser,
    createUserError,
    removeUserError,
    updateUserError,
    usersError,
    setCurrentUser,
    handleCreateUser,
    handleUpdateUser,
    handleRemoveUser
  }
}
