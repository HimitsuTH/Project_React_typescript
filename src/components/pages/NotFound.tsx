import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="grid h-screen place-items-center">
      <div className=" text-center">
        <h1 className=" text-lg font-bold">404 Not found!!!</h1>
        <p>Here are some helpful links:</p>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}
