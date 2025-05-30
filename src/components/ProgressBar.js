export default function ProgressBar({ current, total }) {
    const progress = ((current + 1) / total) * 100;
    
    return (
      <div className="progress-info">
        <span className="progress-text">{current + 1} / {total}</span>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{Math.round(progress)}%</span>
      </div>
    );
  }