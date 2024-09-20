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
            className="flex flex-col rounded-3xl items-center justify-center bg-[#BEC598] text-white h-custom-783 pt-8">
            <FooterLogo/>
            <h1 className="h-12 text-5xl font-light my-12 font-kodchasan text-[#39442B]">
                METOD@GMAIL.COM
            </h1>
            <p className="text-white text-2xl">
                +7 920 786 456 67
            </p>
            <div className="w-[60%] mt-5 mb-36">
                <div className="line border-b-1 border-[#FDFDF1] mb-10 opacity-25"></div>
                <SocialMedia socialMedia={socialMediaData}/>
            </div>
            <div className="w-[85%]">
                <div className="line border-b-1 border-[#FDFDF1] opacity-25"></div>
                <div className="flex justify-between items-center"></div>
                <div className={"flex justify-between items-center mt-4"}>
                    <a href="/rules" className="flex flex-row items-center font-bold text-greenDark">
                        ПРАВИЛА МЕТОДА
                        <Arrow className="ml-1"/>
                    </a>
                    <a href="/terms" className="flex flex-row items-center font-bold text-greenDark">
                        ПОЛЬЗОВАТЕЛЬСКИЕ СОГЛАШЕНИЯ
                        <Arrow className="ml-1"/>
                    </a>
                </div>
            </div>
            <p className={"px-16 font-inter text-[#7D7D7D] font-normal mt-4"}>
                Индивидуальный предприниматель Вахитов-Брук Руслан Эмилевич ИНН 165808340907 ГРНИП 324169000184999
                Расч. сч. 40802810429930006967 БИК 042202824 Кор. сч. 30101810200000000824
            </p>
        </footer>
    );
}

export default Footer;