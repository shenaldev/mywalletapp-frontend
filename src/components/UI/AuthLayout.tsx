function AuthLayout(props) {
  return (
    <div className="flex flex-col items-center w-full md:min-h-screen bg-slate-100 py-8 px-4">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl text-center mb-4">Welcome To {import.meta.env.VITE_APP_NAME}</h1>
      </div>
      <div
        className={`w-full ${props.cardSize ? props.cardSize : "md:w-[30rem]"} ${
          props.className ? props.className : ""
        } bg-white border border-sky-50 shadow-sm rounded-md px-4 md:px-12 py-12`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default AuthLayout;
