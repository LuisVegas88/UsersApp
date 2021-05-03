import React, {useState,useEffect,useContext} from 'react';
import { useRedirect } from '../Hooks/useRedirect';
import UserContext from '../Contexts/UserContext';
import './UserDetails.css';

import back from '../../media/back.svg';

const UserDetails = () => {
    const [userDetail, setUserDetail] = useState("");
    const redirect = useRedirect();
    const UserDetailCxt = useContext(UserContext);
    console.log("Detalles",UserDetailCxt.userId.name)
    const fetchData = async() =>{
        const url = `http://localhost:8888/userDetail?id=${UserDetailCxt.userId.id}`
            fetch (url)
                .then(response => response.json())
                .then(data => {
                    setUserDetail({
                        "avatar": data.avatar,
                        "name": data.name,
                        "email": data.email,
                        "birthdate": data.birthdate
                    })
                })
    }

    useEffect(() => {
        fetchData()
    },[])

   const handleEdit = (e) => {
        e.preventDefault();
        redirect("/userUpdate")
    }

    return (
        <>
            <div>
            <img id="back" src={back} alt="goBack" onClick={(e)=>(redirect("/"))}></img>
            </div>
            <div id="GeneralC">
                <div>
                    <img id="avatar" src={userDetail.avatar} alt="avatar"></img>
                </div>
                <div id="InfoContainer2">
                    <p>{userDetail.name}</p>
                    <p>{userDetail.email}</p>
                    <p>{userDetail.birthdate}</p>
                </div>
            </div>
            <button id="btnEdit" type="submit" className="submitlogin" onClick={handleEdit}>EDITAR</button>
        </>      
    )

}
export default UserDetails;