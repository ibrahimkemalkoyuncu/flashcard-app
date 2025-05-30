'use client'
export default function Toggle({ active, onClick }) {
  return (
    <div className={`toggle ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="toggle-switch"></div>
    </div>
  );
}