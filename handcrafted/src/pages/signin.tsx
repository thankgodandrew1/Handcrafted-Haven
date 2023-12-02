import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, RefObject } from 'react';
import { useForm } from "react-hook-form";
import { server } from '../../utils/server'; 
import { postData } from '../../utils/services'; 

type LoginMail = {
  email: string;
  password: string;
}

const LoginPage = () => {
    //@ts-ignore
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: LoginMail) => {
    const res = await postData(`${server}/api/login`, {
      email: data.email,
      password: data.password
    });

    console.log(res);
  };

  const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
    <Header />
      <section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          {/* <div className="back-button-section">
            <Link href="/products">
              <i className="icon-left"></i> Back to store
            </Link>
          </div> */}

          <div className="form-block mt-10">
            <h2 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Log in</h2>

        
            <form 
            className="text-center text-lg font-small" 
            //@ts-ignore
            onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mt-3">
              <input
  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
  placeholder="Email"
  type="text"
  name="email"
  ref={emailRef as RefObject<HTMLInputElement>}
/>

{errors && errors.email && errors.email.type === 'required' && (
  <span className="error-message">Email is required</span>
)}

                {errors && errors.email && errors.email.type === 'pattern' && 
                  <p className="message message--error">Please write a valid email</p>
                }
              </div>
              
              <div className="relative mt-3">
                <input 
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  //@ts-ignore
                //   ref={register({ required: true })}
                />
                {errors && errors.password && errors.password.type === 'required' && 
                  <p className="message message--error">This field is required</p>
                }
              </div>

              <div className="form__info">
                {/* <div className="checkbox-wrapper">
                  <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>
                  <input
  type="checkbox"
  id="check-signed-in"
//   ref={passwordRef as RefObject<HTMLInputElement>}
//   {...register('keepSigned', { required: false })}
/>
                    <span className="checkbox__check"></span>
                    <p>Keep me signed in</p>
                  </label>
                </div> */}
                <a href="/forgot-password" className="form__info__forgot-password">Forgot password?</a>
              </div>

              <div className="form__btns">
                <button type="button" className="btn-social fb-btn"><i className="icon-facebook"></i>Facebook</button>
                <button type="button" className="btn-social google-btn">
                  <Image src="/images/facebook.png" alt="gmail" 
                  width={50}
                  height={50}/> Gmail</button>
              </div>

              <button type="submit" className="text-black py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Sign in</button>

              <p className="form__signup-link">Not a member yet? <Link href="/register">Sign up</Link></p>
            </form>
          </div>

        </div>
      </section>
    </>
  )
}
  
export default LoginPage
  