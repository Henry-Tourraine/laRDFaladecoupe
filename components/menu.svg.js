export default function SVG({ style, className, onClick }) {
    return (
        <svg viewBox="0 0 100 80" style={style} className={className} onClick={() => onClick()}>
            <rect y="0" width="100" height="10" ></rect>
            <rect y="20" width="100" height="10" ></rect>
            <rect y="40" width="100" height="10" ></rect>
            <rect y="60" width="100" height="10" ></rect>
        </ svg>)
}