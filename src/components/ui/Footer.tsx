export default function Footer() {
    return (
        <footer className="z-50 w-full border-t-[3px] border-gray-900 mt-auto flex justify-between items-center p-4 px-32 bg-gray-100">
            <a href="https://github.com/yourrepo" target="_blank" rel="noopener noreferrer" className="text-gray-950 hover:underline">
                Suggest a Feature
            </a>
            <a href="https://twitter.com/yourapp" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
                Review us
            </a>
            <a href="https://discord.com/invite/yourdiscord" target="_blank" rel="noopener noreferrer" className="text-[#7b65c9] hover:underline">
                Join Discord
            </a>
        </footer>
    );
}
