import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../redux/user/userSlice";

export const SignUp = () => {
  const signUpErrorMsg = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required!")
        .min(4, "Must be 4 characters or more"),
      email: Yup.string().required("Required!"),
      password: Yup.string()
        .required("Required!")
        .min(5, "Must be 5 characters or more"),
    }),
    onSubmit: async ({ username, email, password }) => {
      try {
        dispatch(signUpStart());
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
          username: username,
          email: email,
          password: password,
        });
        if (res.status !== 200) {
          dispatch(signUpFailure());
        }
        if (res.status === 201) {
          dispatch(signUpSuccess(res.data));
          navigate("/");
        }
      } catch (error) {
        dispatch(signUpFailure(error.response.data.message));
        setTimeout(() => {
          dispatch(signUpFailure(null));
        }, 2500);
      }
    },
  });

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <h1 className="text-5xl font-semibold mb-5">SIGN UP</h1>
      <form
        className="flex flex-col gap-4 max-w-80"
        onSubmit={formik.handleSubmit}
      >
        {signUpErrorMsg ? (
          <div role="alert" className="alert alert-error ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{signUpErrorMsg}</span>
          </div>
        ) : null}
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.name}
            className="grow"
            placeholder="DracoSnape"
          />
        </label>
        {formik.touched.username && formik.errors.username ? (
          <div role="alert" className="alert h-6 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 32 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{formik.errors.username}</span>
          </div>
        ) : null}

        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.email}
            className="grow"
            placeholder="harry@elpotter.com"
          />
        </label>
        {formik.touched.email && formik.errors.email ? (
          <div role="alert" className="alert h-6 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 32 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{formik.errors.email}</span>
          </div>
        ) : null}

        <label className="input input-bordered flex items-center gap-2">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="grow"
            placeholder="*****"
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div role="alert" className="alert h-6 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 32 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{formik.errors.password}</span>
          </div>
        ) : null}

        <button type="submit" className="btn">Sign Up</button>
        <h2 className="self-end">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-emerald-700 cursor-pointer hover:text-opacity-60"
          >
            Sign In...
          </span>
        </h2>
      </form>
    </div>
  );
};
