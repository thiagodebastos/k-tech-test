import { UsersList } from "./features/users/UsersList"
import { Toaster } from "./components/ui/toaster"
import { Button } from "./components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { UserForm } from "./features/users/UserForm"

function App() {
  const [userFormIsVisible, setUserFormIsVisible] = useState(false)


  return (
    <div className="p-8 items-center flex flex-col">
      <div className="mb-8">
        <h1 className="text-6xl font-bold">Users</h1>
      </div>
      {!userFormIsVisible &&
        <div className="mb-8 w-[140px]">
          <Button className="w-full" onClick={() => setUserFormIsVisible(true)}><PlusIcon /></Button>
        </div>
      }
      {userFormIsVisible &&
        <div className="mb-8 w-80 rounded-lg p-8">
          <p className="text-lg">Create a new user</p>
          <UserForm onClose={() => setUserFormIsVisible(false)} />
        </div>
      }
      <UsersList />
      <Toaster />
    </div>
  )
}

export default App
