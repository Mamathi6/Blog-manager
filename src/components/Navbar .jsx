import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav>
      <h2>📚 Blog Manager</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
      </div>
    </nav>
  )
}