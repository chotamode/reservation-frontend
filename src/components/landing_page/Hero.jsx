import MethHero from "./../../assets/images/meth_hero.svg";
import MethHeroHand from "./../../assets/images/meth_hero_hand.svg";
import MethHeroAnimation from "../../assets/images/meth_hero_animation1.gif";

function Hero() {
    return (
        <div className="flex flex-col md:flex-row rounded-custom-xl border-greenDark border-solid drop-shadow-lg w-full md:w-[75rem] h-full md:h-[25.5rem] bg-white items-center p-12">
            <div className={`h-full flex items-center justify-center w-full`}>
                <img src={MethHero} alt="MethHero"/>
            </div>

            <div  className="hidden md:flex items-end justify-end w-auto">
                <img src={MethHeroAnimation} alt="MethHeroHand" className="max-w-fit h-full md:h-96 overflow-hidden rounded-custom-xl" />
            </div>
        </div>
    );
}

export default Hero;