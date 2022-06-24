import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Container, ResetDivBox } from './PasswordReset.styled';
import { ErrorP } from "./Login.styled";
import { IoFastFoodSharp } from "react-icons/io5"
import { postForgotPassword } from "../../redux/actions/async";

function validate(input) {
  let errors = {};

  if (!input.email.length) {
    errors.email = "email is required";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Debe ser un e-mail";
  }
  return errors;
}

export default function PasswordReset() {
  const [input, setInput] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({email: ""});

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
        toast.promise(
          postForgotPassword(input),{
            loading: 'un momento por favor...',
            success: 'Link de verificación enviado a tu correo!',
            error: 'Este correo no está registrado.'
          }
        )
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
 
  return (
    <Container>
      <Toaster/>
        <ResetDivBox>
          <IoFastFoodSharp/>
          <h1>Password Reset</h1>
          <form onSubmit={handleSubmit}>
            <label>E-mail</label>
            <input
              onChange={handleInputChange}
              value={input.email}
              placeholder="Email..."
              type="text"
              name="email"
            />
            {errors.email && <ErrorP className="error">{errors.email}</ErrorP>}
            <input type="submit" value="SEND"/>
            <Link to="/login"><input type="button" value=' Go Back '/></Link>
          </form>
        </ResetDivBox>
    </Container>
  );
}