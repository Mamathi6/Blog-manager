import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost({ addPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (!title.trim()) {
      setMessage("⚠ Please enter a title.");
      return;
    }
    if (!content.trim()) {
      setMessage("⚠ Please add some content.");
      return;
    }

    addPost({ title: title.trim(), content: content.trim(), status });
    setTitle("");
    setContent("");
    setStatus("published");
    setMessage("✓ Post saved successfully!");

    setTimeout(() => {
      setMessage("");
      navigate("/manage");
    }, 1200);
  };

  return (
    <div className="page-section">
      <div className="page-heading">
        <h1>Create new blog</h1>
        <p>Write and publish your post</p>
      </div>

      <div className="card">
        {message && (
          <div className={`alert ${message.startsWith("⚠") ? "alert-warn" : "alert-success"}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Blog title</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter a compelling title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            className="form-input"
            placeholder="Write your blog content here..."
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="form-footer">
          <div className="radio-group">
            <span className="form-label" style={{ marginBottom: 0 }}>Status:</span>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="published"
                checked={status === "published"}
                onChange={() => setStatus("published")}
              />
              Published
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={status === "draft"}
                onChange={() => setStatus("draft")}
              />
              Draft
            </label>
          </div>

          <div className="btn-row">
            <button className="btn" onClick={() => navigate("/")}>Cancel</button>
            <button className="btn primary" onClick={handleSave}>Save post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;