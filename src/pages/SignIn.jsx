import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
export const SignIn = () => {
  const signInErrorMsg = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required!"),
      password: Yup.string()
        .required("Required!")
        .min(6, "Must be 6 characters or more"),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        dispatch(signInStart());
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
          email: email.toLowerCase(),
          password,
        });
        if (res.status !== 200) {
          dispatch(signInFailure());
        }
        if (res.status === 200) {
          dispatch(signInSuccess(res.data));
        }
      } catch (error) {
        dispatch(signInFailure(error.response.data.message));
        setTimeout(() => {
          dispatch(signInFailure(null));
        }, 2500);
      }
    },
  });
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <h1 className="text-5xl font-semibold mb-5">SIGN IN</h1>
      <form
        className="flex flex-col w-auto gap-4 max-w-80"
        onSubmit={formik.handleSubmit}
      >
        {signInErrorMsg ? (
          <div role="alert" className="alert alert-error">
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
            <span>{signInErrorMsg}</span>
          </div>
        ) : null}
        <label className="input input-bordered flex items-center gap-2">
          Email:
          <input
            className="grow"
            type="email"
            id="email"
            name="email"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.email}
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
        <button type="submit" className="btn">Login</button>
        <h2 className="self-end">
          New here?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-emerald-700 cursor-pointer hover:text-opacity-60"
          >
            Sign Up...
          </span>
        </h2>
      </form>
    </div>
  );
};
