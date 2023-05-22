import React from 'react'
import ProfileInfo from '../../components/ProfileInfo'
import Header from '../../components/Header/Header'
import NoUser from '../../components/NoUser';



function Profile() {
  return (
    <div>
      <Header/>
      {localStorage.getItem("accessToken") ? <ProfileInfo/> : <NoUser message={"view profile"}/>}
    </div>
  )
}

export default Profile