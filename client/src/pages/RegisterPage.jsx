import React, { useEffect, useState } from 'react';
import "../styles/Register.scss";
import {useNavigate} from 'react-router-dom';

const RegisterPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  console.log(formData);

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const registerForm = new FormData();
  
      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }
  
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: registerForm,
      });
  
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Registration failed (frontend):", response.statusText);
      }
    } catch (error) {
      console.error("Registration failed (frontend):", error.message);
    }
  };
  

  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleInputFocus = (name) => {
    setFocusedField(name);
  };

  const handleInputBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className='register'>
      <div className='register_content'>
        <form className='register_content_form' onSubmit={handleSubmit}>
          <input
            name='firstName'
            placeholder={focusedField !== 'firstName' ? 'First Name' : ''}
            value={formData.firstName}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus('firstName')}
            onBlur={handleInputBlur}
            required
          />
          <input
            name='lastName'
            placeholder={focusedField !== 'lastName' ? 'Last Name' : ''}
            value={formData.lastName}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus('lastName')}
            onBlur={handleInputBlur}
            required
          />
          <input
            name='email'
            placeholder={focusedField !== 'email' ? 'Email' : ''}
            type='email'
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus('email')}
            onBlur={handleInputBlur}
            required
          />
          <input
            name='password'
            placeholder={focusedField !== 'password' ? 'Password' : ''}
            type='password'
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus('password')}
            onBlur={handleInputBlur}
            required
          />
          <input
            name='confirmPassword'
            placeholder={focusedField !== 'confirmPassword' ? 'Confirm Password' : ''}
            type='password'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus('confirmPassword')}
            onBlur={handleInputBlur}
            required
          />
          {!passwordMatch && (
            <p style={{color: 'red'}}>Password does not match</p>
          )}
          <input
            id='image'
            type='file'
            name='profileImage'
            accept='image/*'
            style={{ display: "none" }}
            onChange={handleInputChange}
          />
          <label htmlFor='image'>
            <img src='/assets/addImage.png' alt='add profile picture' />
            <p>Upload Profile Picture</p>
          </label>
          {formData.profileImage && (
            <div>
              <img src={URL.createObjectURL(formData.profileImage)} alt='Profile Photo' style={{ maxWidth: "80px" }} />
            </div>
          )}
          <button type='submit' disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href='/login'>Already have an Account? Click here to Login</a>
      </div>
    </div>
  );
};

export default RegisterPage;
