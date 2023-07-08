import React from 'react';
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const EditAccountForm = ({UpdateProfileAvatar, user}) => {

    const { updateName, updatePass} = useContext(AuthContext)

    const [updateFullname, setUpdateFullname] = useState(user.fullname)

    const [updatePassword, setUpdatePassword] = useState({
        password: '',
        newpassword: '',
        confirmpassword: ''
    })

    const {password, newpassword, confirmpassword} = updatePassword

    useEffect(() => {setUpdateFullname(user.fullname);}, [user])

    const onChangeFullname = event =>
        setUpdateFullname(event.target.value)

    const onChangePassword = (event) => 
        setUpdatePassword({ ...updatePassword, [event.target.name]: event.target.value })

    const UpdateProfile = async (event) => {
        event.preventDefault()
        if(password != '' && newpassword != '' && confirmpassword != ''){
            const name = { fullname: updateFullname }
            try {
                await updateName(name)  
            } catch (error) {
                console.log(error)
            }

             if(newpassword == confirmpassword) {
                try {
                    const response = await updatePass( {password, newpassword} ) 
                    if(response.success) {
                        UpdateProfileAvatar()
                    } else{
                        alert(response.message)
                    }
                } catch (error) {
                    console.log(error)
                }
             }
        } else{
            const name = { fullname: updateFullname }
            try {
                await updateName(name)  
            } catch (error) {
                console.log(error)
            }
            UpdateProfileAvatar()
        }
    }
    
    return (
        <div id='myprofile-right'>
            <form onSubmit={UpdateProfile}>
            <div className='inp-profile'>
                <label>Full Name</label>
                <input type='text' name='fullname' value={updateFullname} required onChange={onChangeFullname}></input>
            </div>
            <div className='inp-profile'>
                <label>Old PassWord</label>
                <input type='password' name='password' value={password} onChange={onChangePassword}></input>
            </div>
            <div className='inp-profile'>
                <label>New PassWord</label>
                <input type='password' name='newpassword' value={newpassword} onChange={onChangePassword}></input>
            </div>
            <div className='inp-profile'>
                <label>Confirm New PassWord</label>
                <input type='password' name='confirmpassword' value={confirmpassword} onChange={onChangePassword}></input>
            </div>
            <button className='btn-updateProfile'>UPDATE</button>
            </form>
            <label className='back-updateProfile' onClick={UpdateProfileAvatar}><FontAwesomeIcon icon={faAngleLeft} size='2xl' /></label>
        </div>
    );
    
};

export default EditAccountForm;