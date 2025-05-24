"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './button'

const navItems = [
    { name: "Home", path: "/" },
    { name: "Companions", path: "/companions" },
    { name: "My Journey", path: "/my-journey" },
   
]

const Navitems = () => {
    const pathName = usePathname()
  return (
    <nav className='flex items-center gap-4'>
        {navItems.map ((({name, path}) => (
            <Link
                key={name}
                href={path}
                className={cn(pathName === path && 'font-semibold')}>
                {name}
                </Link>
        )))}
        <Button>sign in</Button>
    </nav>
  )
}

export default Navitems
