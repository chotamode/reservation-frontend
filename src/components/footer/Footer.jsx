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
            className="rounded-3xl bg-[#BEC598] text-white w-[75rem]">
            <div className="flex flex-col items-center justify-center py-4">

                <div className=" w-14 h-14 my-12">
                    <FooterLogo/>
                </div>
                <h1 className="h-12 text-3xl font-normal my-4 font-kodchasan text-[#39442B]">
                    METOD@GMAIL.COM
                </h1>
                <p className="text-white text-2xl font-inter mt-6 mb-2 font-normal">
                    +7 920 786 456 67
                </p>
                <div className="w-[80%]">
                    <div className="line border-b-1 border-[#FDFDF1]  opacity-25"></div>
                    <div className=" mt-6 mb-20"><SocialMedia socialMedia={socialMediaData}/></div>
                </div>

                    <div className="opacity-25"></div>
                    <div className="flex justify-between items-center"></div>

                <div className={"flex w-full justify-center gap-48 mt-4"}>
                    <a href="/pdfs/privacy_policy.pdf"
                       className="flex flex-row items-center font-bold text-greenDark">
                        ПРАВИЛА МЕТОДА
                        <Arrow className="ml-1"/>
                    </a>

                    <a href="/pdfs/offer.pdf"
                       className="flex flex-row items-center font-bold text-greenDark">
                        ОФЕРТА
                        <Arrow className="ml-1"/>
                    </a>

                    <a href="/pdfs/user_agreement.pdf"
                       className="flex flex-row items-center font-bold text-greenDark">
                        ПОЛЬЗОВАТЕЛЬСКИЕ СОГЛАШЕНИЯ
                        <Arrow className="ml-1"/>
                    </a>

                </div>
                    <div className="w-[85%]">


                    <p className={"font-inter text-[#7D7D7D] my-4 text-center text-sm font-normal"}>
                        Индивидуальный предприниматель Вахитов-Брук Руслан Эмилевич ИНН 165808340907 ГРНИП
                        324169000184999
                        Расч. сч. 40802810429930006967 БИК 042202824 Кор. сч. 30101810200000000824
                    </p>

                </div>

            </div>
        </footer>
    );
}

export default Footer;