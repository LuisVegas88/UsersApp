import React, {useState, useEffect,useContext} from 'react';
import {Pagination} from "@material-ui/lab";
import {useRedirect} from "../Hooks/useRedirect";
import usePagination from "../Hooks/Pagination";
import UserContext from "../Contexts/UserContext";
import './UserList.css'
import close from '../../media/closeAdd.png'

const UserList = () => {
    const UserDetailCxt = useContext(UserContext);
    const redirect = useRedirect();

    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let [page, setPage] = useState(1);
    const Per_Page = 3;

    const count = Math.ceil(userList.length / Per_Page);
    const _DATA = usePagination(userList, Per_Page);
    const handleChange = (e,p) => {
        setPage(p);
        _DATA.jump(p);
    };

    //Get data of our database

    const fetchData = async(setLoading, setUserList, setError) => {
        const url = `http://localhost:8888/getAllUsers`
        setLoading(true);
        setError(null);
            fetch(url,{
                credentials:"include"
            })
                .then(response => response.json())
                .then(data => {
                    console.log("datos:",data)
                    if (data.error!==undefined){
                        setError(data.error)
                    }
                    else{
                        setUserList(data);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
    }
    //Delete User
    const DeleteUser = async (id)=>{
        return new Promise ((resolve) => {
            const url = `http://localhost:8888/removeUser?id=${id}`
                fetch(url) 
                    .then(response=>response.json())
                    .then(data => {
                        resolve()
                    })
        })
                
    }  
          
    
    const HandleDelete = (id) => {
        DeleteUser(id)
         .then(() => {
            fetchData(setLoading,setUserList,setError)
            console.log("usuarios depsues de borrado",userList)
         })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        redirect("/register");
    }

    //Paint data on the front

    const PaintData = ({id,avatar,name,email,birthdate, onClick}) => {

        return (
                
                <div id="ContainerU" >
                    <div>
                        <img id="avatar" src={avatar} alt="avatar" onClick={onClick}></img>
                    </div>
                    <div id="InfoContainer">
                        <p>{name}</p>
                        <p>{email}</p>
                        <p>{birthdate}</p>
                    </div> 
                    <img id="Delete" src={close} alt="closeicon" onClick={()=>HandleDelete(id)}></img>  
               
                </div>
        )
    }

    const parseData = (userList) => {
        if(loading)
            return <p>Loading...</p>
            else if (error)
            return <p>{error}</p>
            else
            return _DATA.currentData().map(user => {
                const {id,avatar,name,email,birthdate} = user;
                return (
                    <div key={id} id={id}>
                        <PaintData
                            onClick={(e) => {
                                console.log("entra")
                                redirect("/userDetail",e)
                                UserDetailCxt.setUserId({
                                    ...UserDetailCxt,id,name,email,birthdate
                                });
                            }}
                            id= {id} avatar={avatar} name={name} email={email} birthdate={birthdate}
                        />
                    </div>
                )
            })
    }

    useEffect(() => {
        setTimeout(()=>{fetchData(setLoading,setUserList,setError)},500)
        
    },[])

    return (
        <>
            {parseData(userList)}
            <button id="btnNew" onClick={handleRegister}>New User</button>
            <Pagination
                id="Pagination"
                count={count}
                page={page}
                onChange={handleChange}
                color="primary"
            />
        </>
    )

}

export default UserList;