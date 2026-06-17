import React from 'react'
import { doLogOut } from './actions/page'
import { LogOut } from 'lucide-react'

const Logout = () => {
  return (
    <div>
         <form action={doLogOut}>
            <button className=' cursor-pointer rounded-md capitalize font-oldstandard flex justify-center items-center gap-4' type='submit'>logout <LogOut /></button>
         </form>
    </div>
  )
}

export default Logout