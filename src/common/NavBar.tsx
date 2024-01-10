'use client'
import React, { useState } from 'react'
import { Typography } from '@/common/Typography'
import Image from 'next/image'
import { SlArrowDown } from 'react-icons/sl'
import Link from 'next/link'
import NewBoard from '@/features/board/components/board/NewBoard'
import { Button } from './Button'
import BoardItems from '@/features/board/components/board/BoardMenuItems'

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'http://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 40,
}

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-50 shadow-xl px-4 py-3">
      <div className=" w-full flex justify-between items-center">
        <Link href="/">
          <Image
            src="/trello-official.svg"
            width={100}
            height={40}
            alt={'trello'}
          />
        </Link>

        <ul className="ml-10 flex w-full items-center space-x-6 mx-6 mt-1">
          <li>
            <Link
              href="/"
              className="flex items-center space-x-2 focus:outline-none"
            >
              <Typography variant={'p'} className="font-normal text-gray-700">
                Workspace
              </Typography>
            </Link>
          </li>

          <li>
            <NewBoard align="start">
              <Button>Create board</Button>
            </NewBoard>
          </li>
        </ul>

        <div className="cursor-pointer">
          <Image
            className="inline-block rounded-full ring-2 ring-white"
            src={user.imageUrl}
            width={user.imageSize}
            height={user.imageSize}
            alt={'Photo of ' + user.name}
          />
        </div>
      </div>
    </nav>
  )
}
