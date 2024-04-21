import React, { useState } from 'react';
import styles from './styles.module.scss';
import { MdOutlineSecurity, MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from 'next/link';
import UserMenu from './UserMenu';

export default function Top() {
  const [loggedIn, setLoggedIn] = useState(true);
  const[visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
        <div className={styles.top__container}>
             <div></div>
                <ul className= {styles.top__list}>
                    <li className={styles.li}>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Round_Flag_of_Bangladesh_-_centered.svg/240px-Round_Flag_of_Bangladesh_-_centered.svg.png' alt=''></img>
                        <span>Bangladesh / BDT</span>
                    </li>                    
                    <li className={styles.li}>
                      <MdSecurity />
                      <span>Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                      <span>Customer Service</span>
                    </li>
                    <li className={styles.li}>
                      <span>Help</span>
                    </li>
                    <li className={styles.li}>
                      <BsSuitHeart />
                      <Link href="/profile/wishlist">
                        <span>Wishlist</span>
                      </Link>
                    </li>
                    <li className={styles.li}
                    onMouseOver={()=>setVisible(true)}
                    onMouseLeave={()=>setVisible(false)}
                    >
                      {
                      loggedIn ? (<li className={styles.li}>
                      <div className={styles.flex}>
                        <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt=""/>
                        <span>Asif</span>
                        <RiArrowDropDownFill /> 
                      </div>
                      </li>)  : (<li className={styles.li}>
                      <div className={styles.flex}>
                        <RiAccountPinCircleLine />
                        <span>Account</span>
                        <RiArrowDropDownFill /> 
                      </div>
                    </li>)}
                    {visible && <UserMenu loggedIn={loggedIn}/>}
                    </li>
                </ul>
             
        </div>
    </div>
  )
}
