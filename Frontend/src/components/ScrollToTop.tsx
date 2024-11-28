import { ArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };




    useEffect(() => {
        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-24 right-10 z-50 p-2 px-3 rounded bg-yellow-400 text-white hover:bg-yellow-500 transition"
            >
                <ArrowUp />
            </button>
        )
    );
};

export default ScrollToTop;
