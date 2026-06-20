export default function Home({ posts }) {
  const totalPosts = posts.length;

  const publishedPosts = posts.filter(
    (post) => post.status === "published"
  ).length;

  const draftPosts = posts.filter(
    (post) => post.status === "draft"
  ).length;

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>

      <div className="stats">
        <div className="stat-card">
          <h3>{totalPosts}</h3>
          <p>Total Posts</p>
        </div>

        <div className="stat-card">
          <h3>{publishedPosts}</h3>
          <p>Published</p>
        </div>

        <div className="stat-card">
          <h3>{draftPosts}</h3>
          <p>Drafts</p>
        </div>
      </div>
    </div>
  );
}