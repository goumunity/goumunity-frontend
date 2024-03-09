import { NavLink } from 'react-router-dom';

const activeClass = 'underline';

function NavBarItem({ imgSrc, link, text }) {
  return (
    <li className='hover:text-gray-500'>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${activeClass} flex gap-1 items-center`
            : 'flex gap-1 items-center'
        }
        to={link}
      >
        <div className='flex justify-center items-center w-8 h-8'>
          <i className={`fa-solid fa-${imgSrc}`}></i>
          {/* <img className='w-full h-full hover:' src={imgSrc} alt='' /> */}
        </div>
        <span>{text}</span>
      </NavLink>
    </li>
  );
}

export default NavBarItem;
