import MethHero from "./../../assets/images/meth_hero.svg";
import MethHeroHand from "./../../assets/images/meth_hero_hand.svg";
import MethHeroAnimation from "./../../assets/images/meth_hero_animation.gif";

function Hero() {
    return (
        <div className="flex rounded-3xl border-1 border-black w-full h-full bg-white items-center">
            <div className={`h-full flex items-center justify-center w-full`}>
                <img src={MethHero} alt="MethHero"/>
            </div>

            <div className="h-full flex items-end justify-end w-auto">
                <img src={MethHeroHand} alt="MethHeroHand" className="w-full h-full overflow-hidden rounded-b-3xl"/>
            </div>
        </div>
    );
}

export default Hero;