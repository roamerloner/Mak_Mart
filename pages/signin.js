import Header from '../components/header';
import Footer from '../components/footer';
import {BiLeftArrowAlt} from 'react-icons/bi';
import styles from '../styles/signin.module.scss';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { useState } from 'react';
import LoginInput from '@/components/inputs/loginInput';
import AnimatedBtn from '@/components/button/AnimatedBtn';
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  country,
} from "next-auth/react";
const initialvalues={
  login_email:"",
  login_password:"",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
};
export default function signin({providers}) {
   const [loading, setLoading] = useState(false);
  const [user, setuser] = useState(initialvalues);
  const {login_email, login_password, name, email, password,
              conf_password, success, error}= user;
  const handleChange=(e)=>{
    const {name, value} = e.target;
    setuser({...user,[name]:value});
  };
  console.log(user);
  const loginValidation=Yup.object({
    login_email: Yup.string().required("Email Address is required").email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter password."),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };
  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt/>
            </div>
              <span>
                We'd be happy to join us ! <Link href="/">Go Store</Link>
              </span>
          </div>
           <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services.
            </p>
            <Formik
            enableReinitialize
            initialValues={{
              login_email,
              login_password,
            }}
            validationSchema={loginValidation}
            >
              {
                (form)=>(
                  <Form>
                    <LoginInput type="text" name="login_email" icon="email" placeholder="Email Address" onChange={handleChange}/>
                    <LoginInput type="password" name="login_password" icon="password" placeholder="Password" onChange={handleChange}/>
                    <AnimatedBtn type="submit" text="Sign in"/>
                    <div className={styles.forgot}>
                      <Link href="/forgot"> Forget Password </Link>
                    </div>
                  </Form>
                )
              }
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}> Or continue with </span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider)=>(
                <div key={provider.name}>
                  <button className={styles.social__btn} onClick={()=>signIn(provider.id)}>
                    <img src={`../../icons/${provider.name}.png`} alt=''/>
                    Sign in with {provider.name}</button>
                </div>
              ))}
              </div>
            </div>
           </div>
        </div>
        <div className={styles.login__container}>
          
           <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>
              Get access to one of the best Eshopping services.
            </p>
            <Formik
            enableReinitialize
            initialValues={{
              name, email, password,
              conf_password,
            }}
            validationSchema={registerValidation}
             onSubmit={() => {
                signUpHandler();
              }}
            >
              {
                (form)=>(
                  <Form>
                    <LoginInput type="text" name="name" icon="user" placeholder="Full Name" onChange={handleChange}/>
                    <LoginInput type="text" name="email" icon="email" placeholder="Email Address" onChange={handleChange}/>
                    <LoginInput type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}/>
                    <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                    <AnimatedBtn type="submit" text="Sign up"/>
                  </Form>
                )
              }
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
           </div>
        </div>
      </div>
      <Footer country='Bangladesh'/>
    </>
  );
}


export async function getServerSideProps(context){
  const providers = Object.values(await getProviders());
  return{
    props: {providers},
  };
}