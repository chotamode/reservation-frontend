import FooterLogo from '../../assets/images/footer_logo.svg?react';
import SocialMedia from './SocialMedia.jsx';
import TelegramLogo from '../../assets/images/social_media_icons/telegram.svg?react';
import InstagramLogo from '../../assets/images/social_media_icons/instagram.svg?react';
import Arrow from '../../assets/images/arrow.svg?react';

const socialMediaData = [
    { id: 1, link: 'https://telegram.org', icon: <TelegramLogo className="text-blue-500" /> },
    { id: 2, link: 'https://instagram.com', icon: <InstagramLogo className="text-pink-500" /> },
];

function Footer() {
    return (
        <footer className="rounded-3xl bg-[#BEC598] text-white w-full md:w-[75rem] p-2 md:p-0">
            <div className="flex flex-col items-center justify-center py-4">
                <div className="w-14 h-14 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light my-4 sm:my-6 md:my-8 lg:my-12 font-kodchasan">
                    <FooterLogo />
                </div>
                <h1 className="h-12 text-xl md:text-3xl font-normal my-4 font-kodchasan text-[#39442B]">
                    METOD@GMAIL.COM
                </h1>
                <p className="text-white text-xl md:text-2xl font-inter mt-0 md:mt-6 mb-2 font-normal">
                    +7 920 786 456 67
                </p>
                <div className="w-full sm:w-[80%] mt-5 mb-5 sm:mb-28">
                    <div className="line border-b-1 border-[#FDFDF1] mb-5 sm:mb-10 opacity-25"></div>
                    <div className="mt-6 mb-10 md:mb-20">
                        <SocialMedia socialMedia={socialMediaData} />
                    </div>
                </div>
                <div className="w-full sm:w-[85%]">
                    <div className="line border-b-1 border-[#FDFDF1] opacity-25"></div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                        <a href="/rules" className="flex flex-row items-center font-bold text-greenDark text-sm sm:text-base -mb-1 sm:mb-0">
                            ПРАВИЛА МЕТОДА
                            <Arrow className="ml-1" />
                        </a>
                        <a href="/terms" className="flex flex-row items-center font-bold text-sm sm:text-base text-greenDark">
                            ПОЛЬЗОВАТЕЛЬСКИЕ СОГЛАШЕНИЯ
                            <Arrow className="ml-1" />
                        </a>
                    </div>
                    <p className="font-inter text-[#7D7D7D] my-4 text-center text-xs md:text-sm font-normal">
                        Индивидуальный предприниматель Вахитов-Брук Руслан Эмилевич ИНН 165808340907 ГРНИП 324169000184999
                        Расч. сч. 40802810429930006967 БИК 042202824 Кор. сч. 30101810200000000824
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;