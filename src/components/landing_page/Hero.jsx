import MethHero from "./../../assets/images/meth_hero.svg";
import MethHeroHand from "./../../assets/images/meth_hero_hand.svg";

function Hero() {
    return (
        <div className="flex rounded-3xl border-1 border-black w-full h-full bg-white items-center">
            <div className={`h-full flex items-center justify-center w-2/3`}>
                <img src={MethHero} alt="MethHero"/>
            </div>

            <div className="ml-auto h-full flex items-center">
                <img src={MethHeroHand} alt="MethHeroHand" className="w-full h-full"/>
            </div>
        </div>
    );
}

export default Hero;