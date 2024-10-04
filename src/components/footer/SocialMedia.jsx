function SocialMedia({ socialMedia }) {
    return (
        <div className="flex justify-center space-x-6">
            {socialMedia.map((social) => (
                <a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center rounded-2xl w-16 h-12 bg-[#FDFDF1]"
                >
                    <div className="w-7 h-7">
                        {social.icon}
                    </div>
                </a>
            ))}
        </div>
    );
}

export default SocialMedia;