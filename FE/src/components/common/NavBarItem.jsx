import { NavLink } from 'react-router-dom'
import chat from '@/assets/images/chat.png'

const activeClass = 'underline';

function NavBarItem({ imgSrc, link, text }) {
  return (
    <li>
        <NavLink
            className={({ isActive }) => (isActive ? `${activeClass} flex gap-1 items-center` : 'flex gap-1 items-center')}
            to={link}
          >
            <div className='flex justify-center items-center w-8 h-8'>
              <img className='w-full h-full' src={imgSrc} alt="" />
            </div>
            <span>{text}</span>
          </NavLink>
        </li>
  )
}

export default NavBarItem