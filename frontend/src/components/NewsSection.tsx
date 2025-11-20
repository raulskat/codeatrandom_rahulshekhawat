import type { HackerNewsStory } from '../types';

type NewsSectionProps = {
  stories: HackerNewsStory[];
  loading: boolean;
  error: string | null;
};

const formatTime = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
};

const NewsSection = ({ stories, loading, error }: NewsSectionProps) => {
  return (
    <div className="card">
      <h3>Latest Tech News</h3>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading stories...</p>}
      {!loading && !error && (
        <div className="news-grid">
          {stories.map((story) => (
            <article className="news-card" key={story.id}>
              <a href={story.url ?? `https://news.ycombinator.com/item?id=${story.id}`} target="_blank" rel="noreferrer">
                {story.title}
              </a>
              <span>By {story.by}</span>
              <small>
                Score: {story.score} · {story.type} · {formatTime(story.time)}
              </small>
            </article>
          ))}
          {!stories.length && <p>No stories found right now.</p>}
        </div>
      )}
    </div>
  );
};

export default NewsSection;

