import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const submit=async(e)=>{
    e.preventDefault();

    const res = await API.post("/auth/login",form);

    if(res.data){
      localStorage.setItem("email",res.data.email);
      localStorage.setItem("id",res.data.id);

      toast.success("Login Successful");

      navigate("/");
    }
    else{
      toast.error("Invalid Credentials");
    }
  }

  return(

  <div className="container">

  <h2>Login</h2>

  <form onSubmit={submit}>

  <input name="email" placeholder="Email" onChange={handleChange}/>
  <input name="password" type="password" placeholder="Password" onChange={handleChange}/>

  <button>Login</button>

  </form>

  </div>

  )

}

export default Login;