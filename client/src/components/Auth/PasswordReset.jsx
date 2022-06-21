import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Container, ResetDivBox } from './PasswordReset.styled';
import { ErrorP } from "./Login.styled";
import { IoFastFoodSharp } from "react-icons/io5"
/* import { postPasswordReset } from "../../redux/actions/actions"; */

function validate(input) {
  let errors = {};

  if (!input.username) {
    errors.username = "Username is required";
  } else if (!/\S+@\S+\.\S+/.test(input.username)) {
    errors.username = "Debe ser un e-mail";
  }
  return errors;
}

export default function PasswordReset() {
  const [input, setInput] = useState({
    username: "",
  });
  const [errors, setErrors] = useState({});

  /* const dispatch = useDispatch(); */
  const navigate = useNavigate();

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (Object.keys(errors).length > 0) {
        toast.error("Debes completar correctamente el usuario.");
      }else{
        /* dispatch(postPasswordReset(input)); */
        toast.success("Link de verificación enviado!");
        navigate('/newPassword');
      }
    } catch (e) {
      toast.error("Usuario incorrecto.");
    }
  };
 
  return (
    <Container>
      <Toaster/>
        <ResetDivBox>
          <IoFastFoodSharp/>
          <h1>Password Reset</h1>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              onChange={handleInputChange}
              value={input.username}
              placeholder="Email..."
              type="text"
              name="username"
            />
            {errors.username && <ErrorP className="error">{errors.username}</ErrorP>}
            <input type="submit" value="SEND"/>
          </form>
        </ResetDivBox>
{/*         <Link to="/">
          <button className="back_signUp"> Go back </button> 
        </Link> */}
    </Container>
  );
}