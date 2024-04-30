import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "../components/header";
import Footer from "@/components/footer";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home({country}) {
  console.log(country);
  return (
    <div>
      <Header country={country}/>
      <Footer country={country}/>
    </div>
  );
}

export async function getServerSideProps(){
  let data = await axios.get("https://api.ipregistry.co/?key=4id8ocfpf020hobd").then((res)=>{
   return res.data.location.country;
  }).catch((err)=>{
    console.log(err);
  });
  return{
    props:{
      //country: {name: data.name, flag: data.flag.emojitwo},
      country: {name: "Bangladesh", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Round_Flag_of_Bangladesh_-_centered.svg/240px-Round_Flag_of_Bangladesh_-_centered.svg.png"},
    },
  }
}
