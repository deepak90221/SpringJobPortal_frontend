import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register(){

const navigate = useNavigate();

const [form,setForm]=useState({
name:"",
email:"",
password:""
})

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const submit=async(e)=>{
e.preventDefault()

await API.post("/auth/register",form)

toast.success("Registration Successful")

navigate("/login")

}

return(

<div className="container">

<h2>Register</h2>

<form onSubmit={submit}>

<input name="name" placeholder="Name" onChange={handleChange}/>
<input name="email" placeholder="Email" onChange={handleChange}/>
<input name="password" type="password" placeholder="Password" onChange={handleChange}/>

<button>Register</button>

</form>

</div>

)

}

export default Register;