import React, {useContext,useState} from 'react';
import { useRedirect } from '../Hooks/useRedirect';
import UserContext from '../Contexts/UserContext';

import back from '../../media/back.svg';


const ProfileEdit = () => {
    const [userInfo, setUserInfo] = useState("");
    const UserDetailCxt = useContext(UserContext);
    console.log("Edit:",UserDetailCxt.userId.name)
    const redirect = useRedirect();

      const fetchEdit = async () => {
        const url = `http://localhost:8888/userUpdate?id=${UserDetailCxt.userId.id}`
        await fetch (url, {            
            method:"PUT",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json', 

            },
            body: JSON.stringify({
                email: userInfo.email,
                name: userInfo.name,
                birthdate: userInfo.birthdate,
            })
        })  
    }
      const handleSubmit = (e) => {
        e.preventDefault();
        fetchEdit();
        console.log("infoEdit:", userInfo)
        redirect("/");
     }
    return (
        <>
            <div>
                <img id="back" src={back} alt="goBack" onClick={(e)=>(redirect("/"))}></img>
                </div>
            <div id="edit">
                <h3>Editar Perfil</h3>
                <form className = "formLogIn"/>
                    <input 
                        type="text"
                        placeholder={UserDetailCxt.userId.email}
                        name="Name"
                        className="login"
                        autoComplete="off"
                        onChange={ (e) => setUserInfo({...userInfo, email : e.target.value}) }/>
                
                    <input
                        type="tex"
                        placeholder={UserDetailCxt.userId.name}
                        name="Surname"
                        className="login"
                        onChange={ (e) => setUserInfo({...userInfo, name : e.target.value}) }/>
                    
                    <input
                        type="tex"
                        placeholder={UserDetailCxt.userId.birthdate}
                        name="Email"
                        className="login"
                        onChange={ (e) => setUserInfo({...userInfo, birthdate : e.target.value}) }/>
                    
                    
                    <button id="btnEdit" type="submit" className="submitlogin" onClick = {handleSubmit} >EDITAR</button>
            </div>
        </>
    )
        
}
export default ProfileEdit;