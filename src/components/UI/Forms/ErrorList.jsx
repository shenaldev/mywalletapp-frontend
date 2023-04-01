function ErrorList(props) {
  return (
    <>
      <div className="bg-red-500 text-white font-medium px-4 py-4 rounded mb-4 text-sm">
        <ul>
          {Object.values(props.errors).map((error) => {
            return <li key={Math.random()}>{error}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default ErrorList;
