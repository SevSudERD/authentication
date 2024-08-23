import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <div className="bg-black">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
        <h1 className="font-bold text-white">YODA</h1>
        </Link>
        <ul className="flex gap-9 text-white justify-between uppercase ">
          <Link to='/sign-in'>
          <li>sign in</li>
          </Link>
          <Link to='/sign-up'>
          <li>register</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}
