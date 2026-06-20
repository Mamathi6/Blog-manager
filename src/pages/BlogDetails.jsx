import { useParams, useNavigate } from "react-router-dom";

function BlogDetails({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="page-section">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>Post not found.</p>
          <button className="btn primary" onClick={() => navigate("/manage")}>
            Back to posts
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="page-section">
      <button className="btn" style={{ marginBottom: "1rem" }} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="card">
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "1rem" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 500, flex: 1, lineHeight: 1.4 }}>{post.title}</h1>
          <span className={`badge ${post.status}`}>{post.status}</span>
        </div>
        <div style={{ fontSize: "12px", color: "var(--color-text-tertiary, #888)", marginBottom: "1.25rem" }}>
          📅 {formatDate(post.createdAt)}
        </div>
        <div className="blog-body">{post.content}</div>
      </div>
    </div>
  );
}

export default BlogDetails;