"use client";
import { IUser } from "@/backend/models/User";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

interface Props {
  data: {
    user: IUser;
  };
}

const UpdateUser = ({ data }: Props) => {
  const [name, setName] = useState(data?.user?.name);
  const [email, setEmail] = useState(data?.user?.email);
  const [role, setRole] = useState(data?.user?.role);

  const router = useRouter();

  const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.data?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success("User updated successfully");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      role,
    };

    updateUser({ id: data?.user?._id, body: userData });
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          action="/submit-update-user"
          method="POST"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Update User</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role_field" className="form-label">
              Role
            </label>
            <select
              id="role_field"
              className="form-select"
              name="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn form-btn w-100 mt-4 mb-3"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "UPDATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
