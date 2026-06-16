import { useState, useEffect } from "react"

export default function App() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts")
    return savedPosts ? JSON.parse(savedPosts) : []
  })

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("Draft")
  const [search, setSearch] = useState("")
  const [editId, setEditId] = useState(null)
  const [viewPost, setViewPost] = useState(null)

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts))
  }, [posts])

  const addOrUpdatePost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields")
      return
    }

    if (editId) {
      setPosts(
        posts.map((post) =>
          post.id === editId
            ? { ...post, title, content, status }
            : post
        )
      )
      setEditId(null)
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content,
        status,
      }

      setPosts([newPost, ...posts])
    }

    setTitle("")
    setContent("")
    setStatus("Draft")
  }

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  const editPost = (post) => {
    setTitle(post.title)
    setContent(post.content)
    setStatus(post.status)
    setEditId(post.id)
  }

  const toggleStatus = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              status:
                post.status === "Published"
                  ? "Draft"
                  : "Published",
            }
          : post
      )
    )
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const publishedCount = posts.filter(
    (post) => post.status === "Published"
  ).length

  const draftCount = posts.filter(
    (post) => post.status === "Draft"
  ).length

  return (
    <div className="app">
      <nav className="navbar">
        <h2>📚 Content Creator Blog Manager</h2>

        <div className="nav-links">
          <a href="#">🏠 Home</a>
          <a href="#">✍️ Create Post</a>
          <a href="#">ℹ️ About</a>
        </div>
      </nav>

      <div className="form-container">
        <h2>Create Blog Post</h2>

        <input
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Draft</option>
          <option>Published</option>
        </select>

        <button onClick={addOrUpdatePost}>
          {editId ? "Update Post" : "Add Post"}
        </button>
      </div>

      <input
        className="search-box"
        placeholder="🔍 Search Posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {viewPost && (
        <div className="view-box">
          <h2>{viewPost.title}</h2>

          <p>
            <strong>Status:</strong> {viewPost.status}
          </p>

          <p>{viewPost.content}</p>

          <button onClick={() => setViewPost(null)}>
            Close
          </button>
        </div>
      )}

      <div className="dashboard">
        <div className="stat-card">
          <h3>{posts.length}</h3>
          <p>Total Posts</p>
        </div>

        <div className="stat-card">
          <h3>{publishedCount}</h3>
          <p>Published</p>
        </div>

        <div className="stat-card">
          <h3>{draftCount}</h3>
          <p>Drafts</p>
        </div>
      </div>

      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <div className="card" key={post.id}>
            <h3>{post.title}</h3>

            <p>{post.content.substring(0, 100)}...</p>

            <span
              className={
                post.status === "Published"
                  ? "published"
                  : "draft"
              }
            >
              {post.status}
            </span>

            <div className="actions">
              <button onClick={() => setViewPost(post)}>
                View
              </button>

              <button onClick={() => editPost(post)}>
                Edit
              </button>

              <button onClick={() => deletePost(post.id)}>
                Delete
              </button>

              <button onClick={() => toggleStatus(post.id)}>
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}