import { Link } from "react-router-dom";

export default function Page404() {
  
  return (
    <>
      <h2 style={{color: "red"}}>Что-то пошло не так...</h2>
      <Link className="" to="/">Назад</Link>
    </>
  );
}
