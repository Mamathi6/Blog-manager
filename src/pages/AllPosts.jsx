import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AllPosts({ posts, updatePost, deletePost }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editStatus, setEditStatus] = useState("published");
  const [saveMsg, setSaveMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearch(q);
  }, [location.search]);

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const filtered = posts
    .filter((p) => filter === "all" || p.status === filter)
    .filter(
      (p) =>
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  const openEdit = (post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditStatus(post.status);
    setSaveMsg("");
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim() || !editContent.trim()) {
      setSaveMsg("⚠ Title and content are required.");
      return;
    }
    updatePost(editingPost.id, {
      title: editTitle.trim(),
      content: editContent.trim(),
      status: editStatus,
    });
    setSaveMsg("✓ Post updated!");
    setTimeout(() => {
      setEditingPost(null);
      setSaveMsg("");
    }, 900);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this post? This cannot be undone.")) {
      deletePost(id);
    }
  };

  return (
    <div className="page-section">
      <div className="page-heading">
        <h1>Manage posts</h1>
        <p>View, edit, and delete your blogs</p>
      </div>

      <div className="toolbar">
        <div className="filter-group">
          {["all", "published", "draft"].map((f) => (
            <button
              key={f}
              className={"filter-btn" + (filter === f ? " active" : "")}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>
            {posts.length === 0
              ? "No posts yet."
              : "No posts match your search."}
          </p>
          {posts.length === 0 && (
            <button className="btn primary" onClick={() => navigate("/create")}>
              Create your first blog
            </button>
          )}
        </div>
      ) : (
        <div className="posts-list">
          {filtered.map((p) => (
            <div className="post-card" key={p.id}>
              <div className="post-card-head">
                <div
                  className="post-card-title"
                  onClick={() => navigate(`/blog/${p.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {p.title}
                </div>
                <span className={`badge ${p.status}`}>{p.status}</span>
              </div>
              <div className="post-card-preview">{p.content}</div>
              <div className="post-card-foot">
                <span className="post-date">📅 {formatDate(p.createdAt)}</span>
                <div className="btn-row">
                  <button className="btn sm" onClick={() => openEdit(p)}>✎ Edit</button>
                  <button className="btn sm danger" onClick={() => handleDelete(p.id)}>🗑 Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingPost && (
        <div className="modal-overlay" onClick={(e) => { if (e.target.className === "modal-overlay") setEditingPost(null); }}>
          <div className="modal">
            <div className="modal-head">
              <h2>Edit post</h2>
              <button className="close-btn" onClick={() => setEditingPost(null)}>✕</button>
            </div>

            {saveMsg && (
              <div className={`alert ${saveMsg.startsWith("⚠") ? "alert-warn" : "alert-success"}`}>
                {saveMsg}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                className="form-input"
                rows={6}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            </div>
            <div className="form-footer">
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" name="edit-status" value="published" checked={editStatus === "published"} onChange={() => setEditStatus("published")} />
                  Published
                </label>
                <label className="radio-option">
                  <input type="radio" name="edit-status" value="draft" checked={editStatus === "draft"} onChange={() => setEditStatus("draft")} />
                  Draft
                </label>
              </div>
              <div className="btn-row">
                <button className="btn" onClick={() => setEditingPost(null)}>Cancel</button>
                <button className="btn primary" onClick={handleSaveEdit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPosts;