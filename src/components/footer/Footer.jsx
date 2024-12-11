// src/components/footer/Footer.jsx
import FooterLogo from '../../assets/images/footer_logo.svg?react';
import SocialMedia from './SocialMedia.jsx';
import TelegramLogo from '../../assets/images/social_media_icons/telegram.svg?react';
import InstagramLogo from '../../assets/images/social_media_icons/instagram.svg?react';
import Arrow from '../../assets/images/arrow.svg?react';

const socialMediaData = [
    {id: 1, link: 'https://telegram.org', icon: <TelegramLogo className="text-blue-500"/>},
    {id: 2, link: 'https://instagram.com', icon: <InstagramLogo className="text-pink-500"/>},
];

function Footer() {
    return (
        <footer
            className="rounded-3xl bg-[#BEC598] text-white w-full md:w-[75rem]"
        >
            <div className="flex flex-col items-center justify-center py-4">
                <div className="w-14 h-14 my-12">
                    <FooterLogo />
                </div>

                {/* Email Heading */}
                <h1 className="h-12 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal my-4 sm:my-6 md:my-8 lg:my-12 font-kodchasan text-[#39442B]">
                    METOD@GMAIL.COM
                </h1>

                {/* Phone Number */}
                <p className="text-white text-lg sm:text-xl md:text-2xl font-inter mt-6 mb-2 font-normal">
                    +7 920 786 456 67
                </p>

                {/* Social Media Section */}
                <div className="w-full md:w-[80%]">
                    <div className="line border-b-1 border-[#FDFDF1] opacity-25"></div>
                    <div className="mt-5 md:mt-6 mb-10 md:mb-20">
                        <SocialMedia socialMedia={socialMediaData} />
                    </div>
                </div>

                {/* Rules, Offer, User Agreement Links */}
                <div className="w-full md:w-[85%]">
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-0 md:mt-4">
                        <a
                            href="/rules"
                            className="flex flex-row items-center text-sm sm:text-base mb-1 sm:mb-0 font-bold text-greenDark"
                        >
                            ПРАВИЛА МЕТОДА
                            <Arrow className="ml-1" />
                        </a>

                        <a
                            href="/pdfs/offer.pdf"
                            className="flex flex-row items-center text-sm sm:text-base mb-1 sm:mb-0 font-bold text-greenDark"
                        >
                            ОФЕРТА
                            <Arrow className="ml-1" />
                        </a>

                        <a
                            href="/pdfs/user_agreement.pdf"
                            className="flex flex-row items-center font-bold text-sm sm:text-base text-greenDark"
                        >
                            ПОЛЬЗОВАТЕЛЬСКИЕ СОГЛАШЕНИЯ
                            <Arrow className="ml-1" />
                        </a>
                    </div>

                    {/* Business Information */}
                    <p className="font-inter text-[#7D7D7D] font-normal mt-4 text-center sm:text-left text-xs sm:text-base px-9">
                        Индивидуальный предприниматель Вахитов-Брук Руслан Эмилевич ИНН 165808340907 ГРНИП
                        324169000184999 Расч. сч. 40802810429930006967 БИК 042202824 Кор. сч. 30101810200000000824
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
