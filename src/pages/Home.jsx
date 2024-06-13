import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../redux/user/userSlice";
export const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    try {
      dispatch(logoutSuccess());
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center flex-col justify-center h-screen w-screen">
      <div className="absolute bottom-5 right-5"><img src="https://sonarcloud.io/api/project_badges/quality_gate?project=gasteac_IS2024-BACKEND" alt="sonarcloud" /></div>
      <h1 className="text-5xl">
        Welcome{" "}
        <span className="text-emerald-600 font-semibold">
          {currentUser.username}
        </span>
      </h1>
      <span
        onClick={() => document.getElementById("my_modal_1").showModal()}
        className="text-3xl mt-12 text-red-500 font-semibold cursor-pointer hover:text-red-600 hover:scale-[1.1] transition-all ease-in duration-[60ms]"
      >
        Logout
      </span>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Logout</h3>
          <p className="py-4">
            Are you sure bro?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={handleSignOut} type='reset' className="btn btn-outline btn-error mr-5">Logout</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
