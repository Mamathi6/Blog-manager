import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import AllPosts from "./pages/AllPosts";
import BlogDetails from "./pages/BlogDetails";
import "./App.css";

function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("cbm_posts");
    return saved ? JSON.parse(saved) : [];
  });

  const savePosts = (updated) => {
    setPosts(updated);
    localStorage.setItem("cbm_posts", JSON.stringify(updated));
  };

  const addPost = (post) => {
    const updated = [{ ...post, id: "p_" + Date.now(), createdAt: Date.now() }, ...posts];
    savePosts(updated);
  };

  const updatePost = (id, changes) => {
    const updated = posts.map((p) => (p.id === id ? { ...p, ...changes } : p));
    savePosts(updated);
  };

  const deletePost = (id) => {
    const updated = posts.filter((p) => p.id !== id);
    savePosts(updated);
  };

  return (
    <BrowserRouter>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <span className="brand-icon">✦</span>
            <div>
              <div className="brand-title">Blog Manager</div>
              <div className="brand-sub">Content Creator</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <span className="nav-icon">⊞</span> Dashboard
            </NavLink>
            <NavLink to="/create" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <span className="nav-icon">✎</span> Create Blog
            </NavLink>
            <NavLink to="/manage" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <span className="nav-icon">≡</span> Manage Posts
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <span className="nav-icon">ℹ</span> About
            </NavLink>
          </nav>

          <div className="sidebar-footer">
            <div className="dev-label">Mamathi</div>
            <div className="dev-sub">BCA Internship · 2026</div>
          </div>
        </aside>

        <div className="main-area">
          <Header posts={posts} />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Home posts={posts} />} />
              <Route path="/create" element={<CreatePost addPost={addPost} />} />
              <Route path="/manage" element={<AllPosts posts={posts} updatePost={updatePost} deletePost={deletePost} />} />
              <Route path="/blog/:id" element={<BlogDetails posts={posts} />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

function AboutPage() {
  return (
    <div className="page-section">
      <div className="page-heading">
        <h1>About this project</h1>
        <p>Project details and developer information</p>
      </div>
      <div className="card">
        <h2 className="card-title">Project overview</h2>
        <p className="card-text">
          Content Creator Blog Manager is a multi-page React application built as a BCA internship project.
          It allows content creators to write, organize, and manage blog posts with a professional dashboard interface.
        </p>

        <h2 className="card-title" style={{ marginTop: "1.25rem" }}>Features</h2>
        <ul className="feature-list">
          <li>Create blog posts with title, content, and status</li>
          <li>Publish posts or save as drafts</li>
          <li>Edit and delete existing posts</li>
          <li>Search and filter posts</li>
          <li>Live dashboard statistics</li>
          <li>Data persists using localStorage</li>
        </ul>

        <h2 className="card-title" style={{ marginTop: "1.25rem" }}>Developer details</h2>
        <table className="info-table">
          <tbody>
            <tr><td>Developer</td><td>Mamathi</td></tr>
            <tr><td>Program</td><td>Bachelor of Computer Applications (BCA)</td></tr>
            <tr><td>Project type</td><td>Internship project</td></tr>
            <tr><td>Tech stack</td><td>React + Vite + React Router DOM</td></tr>
            <tr><td>Storage</td><td>localStorage (client-side)</td></tr>
            <tr><td>Year</td><td>2026</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;