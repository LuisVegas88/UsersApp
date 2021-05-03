import React, {useState} from 'react';
import {useRedirect} from '../Hooks/useRedirect';

import back from '../../media/back.svg';

const Register = () => {
    const redirect = useRedirect();
    
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const userForm = {
        avatar : avatar,
        email : email,
        name : name, 
        birthdate : birthdate
    }

    const fecthData = async () => {
        const url = 'http://localhost:8888/createUser';
        fetch ( url, {
            method:"POST",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })
        .then(response => response.json())
        .then(data => {
                    if (data==="User email already exists" || data.msg==="Please, Complete Credentials" || data.msg==="Email not valid")
                    {
                        console.log(data.msg);
                    }
                    else{
                        console.log(data.msg); 
                        redirect("/");
                    }
        })
    }

    const handleRegister =(e) => {
        e.preventDefault()
        alert(`New user has been created, welcome: ${name}¡`)
        fecthData()
    }

    return (
        <>
            <div>
                <img id="back" src={back} alt="goBack" onClick={(e)=>(redirect("/"))}></img>
                </div>
            <div id="create">
                <h3>Create New User</h3>
                <form>
                    <input 
                        type="text"
                        name="Avatar"
                        placeholder="link to your Linkedin photo profile"
                        value={avatar}
                        onChange={ (e) => setAvatar(e.target.value) }/>
                    <input 
                        type="text"
                        name="Email"
                        placeholder="Email"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }/>  
                    <input 
                        type="text"
                        name="Name"
                        placeholder="Name"
                        value={name}
                        onChange={ (e) => setName(e.target.value) }/>  
                    <input 
                        type="date"
                        name="Birthdate"
                        placeholder="Birthdate"
                        value={birthdate}
                        onChange={ (e) => setBirthdate(e.target.value) }/>  
                </form>
                <button id="btnRegister" type="submit" onClick ={handleRegister}>Add User</button>
            </div>
        </>
    )
}
export default Register;