import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { UserDto } from "./usersApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUsers } from "./usersHooks";

interface UserFormProps {
  user?: UserDto,
  onClose: () => void
}

const formSchema = z.object({
  name: z.string()
    .min(2, "Name must contain at least 3 characters")
    .max(20, "Name cannot be longer than 20 characters"),
  email: z.string().email(),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number can only contain digits")
})

export function UserForm({ user, onClose }: UserFormProps) {

  const { handleUpdateUser, handleCreateUser } = useUsers()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone.toString() || ""
    },
    mode: "all",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (user) {
        await handleUpdateUser(user.id, {
          name: values.name,
          phone: Number(values.phone),
          email: values.email
        })
      } else {
        await handleCreateUser({
          name: values.name,
          phone: Number(values.phone),
          email: values.email
        })
      }
    } catch (error) {
      console.log(error)
    }
    onClose()
  }

  const formId = user ? `edit-user-form-${user.id}` : 'create-user-form'

  return (
    <div className="w-full">
      <Form {...form}>
        <form data-testid={formId} onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text"  {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} >
          </FormField>
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} >
          </FormField>
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} >
          </FormField>
          <div className="flex flex-row gap-4">
            <Button type="button" aria-label="cancel" variant="outline" className="w-full" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" aria-label="submit" disabled={!form.formState.isValid} className="w-full">
              <SaveIcon className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>

  )
}
