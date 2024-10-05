import MethHero from "./../../assets/images/meth_hero.svg";
import MethHeroHand from "./../../assets/images/meth_hero_hand.svg";
import MethHeroAnimation from "../../assets/images/meth_hero_animation1.gif";

function Hero() {
    return (
        <div className="flex rounded-custom-xl border-greenDark border-solid border-1 drop-shadow-lg w-[75rem] h-[25.5rem] bg-white items-center">
            <div className={`h-full flex items-center justify-center w-full`}>
                <img src={MethHero} alt="MethHero"/>
            </div>

            <div className="h-full  flex items-end justify-end w-auto">
                <img src={MethHeroAnimation} alt="MethHeroHand" className="w-[27rem] h-96 overflow-hidden rounded-custom-xl"/>
            </div>
        </div>
    );
}

export default Hero;