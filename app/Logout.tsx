import React from 'react'
import { LogOut } from 'lucide-react'
import { doLogOut } from './lib/action'

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