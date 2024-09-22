import { emptySplitApi as api } from "../api/emptyApi";
export const addTagTypes = ["users"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users`,
          method: "POST",
          body: queryArg.createUserDto,
        }),
        invalidatesTags: ["users"],
      }),
      findAllUsers: build.query<FindAllUsersApiResponse, FindAllUsersApiArg>({
        query: () => ({ url: `/api/v1/users` }),
        providesTags: ["users"],
      }),
      findUserById: build.query<FindUserByIdApiResponse, FindUserByIdApiArg>({
        query: (queryArg) => ({ url: `/api/v1/users/${queryArg.id}` }),
        providesTags: ["users"],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateUserDto,
        }),
        invalidatesTags: ["users"],
      }),
      removeUser: build.mutation<RemoveUserApiResponse, RemoveUserApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/users/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["users"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as usersApi };
export type CreateUserApiResponse =
  /** status 201 User created successfully */ UserDto;
export type CreateUserApiArg = {
  createUserDto: CreateUserDto;
};
export type FindAllUsersApiResponse = /** status 200 List of users */ UserDto[];
export type FindAllUsersApiArg = void;
export type FindUserByIdApiResponse = /** status 200 User found */ UserDto;
export type FindUserByIdApiArg = {
  id: string;
};
export type UpdateUserApiResponse =
  /** status 200 User updated successfully */ UserDto;
export type UpdateUserApiArg = {
  id: string;
  updateUserDto: UpdateUserDto;
};
export type RemoveUserApiResponse = unknown;
export type RemoveUserApiArg = {
  id: string;
};
export type UserDto = {
  /** The user's id as stored in the database.
    When using MongoDB, we convert `_id`
    to a string and return that */
  id: string;
  /** The user's name */
  name: string;
  /** The user's email */
  email: string;
  /** The user's phone number */
  phone: number;
};
export type CreateUserDto = {
  /** The user's name */
  name: string;
  /** The user's phone number */
  phone: number;
  /** The user's email */
  email: string;
};
export type UpdateUserDto = {
  /** The user's name */
  name?: string;
  /** The user's phone number */
  phone?: number;
  /** The user's email */
  email?: string;
};
export const {
  useCreateUserMutation,
  useFindAllUsersQuery,
  useFindUserByIdQuery,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = injectedRtkApi;
