export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 80"
            fill="currentColor"
            width="450"
            height="80"
        >
            {/* "Edu" Part */}
            <text
                x="10"
                y="50"
                fontSize="48"
                fontWeight="bold"
                className="fill-current text-white dark:text-blue-200"
            >
                Dorako
            </text>

            {/* Accent Underline */}
            <line
                x1="10"
                y1="60"
                x2="110"
                y2="60"
                stroke="currentColor"
                strokeWidth="4"
                className="text-yellow-600 dark:stroke-blue-200"
            />

            {/* "Track" Part */}
            <text
                x="180"
                y="50"
                fontSize="48"
                fontWeight="300"
                className="fill-current text-yellow-200 dark:text-gray-300"
            >
                Ventures
            </text>
        </svg>
    );
}
