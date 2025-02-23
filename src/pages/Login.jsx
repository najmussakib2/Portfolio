import { Link } from "react-router-dom";
const Login = () => {


  const onSubmit = async (data) => {
    console.log(data);
  };


  return (
    <>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="items-center max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="w-full px-4 py-4">
              <form onSubmit={onSubmit}>
                <div className="mb-12">
                  <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                </div>

                <input type="text" name="id" label="ID" />
                <input type="password" name="password" label="Password" />

                <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link to={"/forget-password"} className="text-cyan-600 font-semibold text-sm hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button type="submit" className="w-full mt-5 shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-cyan-300 hover:bg-cyan-700 focus:outline-none">Sign in</button>
                </div>
              </form >
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
