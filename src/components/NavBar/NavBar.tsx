import './NavBar.scss'
import { useContext, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

// Constants Imports
import { NavLists, NavIconNames } from '../../constants.ts';

// SVG Imports 
import arrowLink from '../../assets/arrowLink.svg';
import NavIcon from './components/NavIcon.tsx';
import gitIcon from '../../assets/github-icon.svg';

import { type IconName } from './components/NavIcon.tsx';
import { NavContext } from './nav.context.tsx';

const NavBar = () => {

    //  Hooks
    const navContext = useContext(NavContext);

    if (!navContext) {
        throw new Error('NavBar must be used within NavProvider');
    }

    const { active, setActive } = navContext;
    const navRef = useRef(null);
    const listRef = useRef<(HTMLLIElement | null)[]>([]);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const githubRef = useRef<HTMLSpanElement | null>(null);

    // Initial Nav Animation
    useGSAP(() => {
        gsap.from(navRef.current, {
            yPercent: -100,
            scale: 0.9,
            duration: 1,
            ease: 'power2.inOut',
            delay: 0.5
        })
    }, {
        scope: navRef
    })

    // Animate One List Item To Another 
    useGSAP(() => {
        const index = NavLists.findIndex(item => item === active);
        const el = listRef.current[index];

        if(el && indicatorRef.current){
            gsap.to(indicatorRef.current, {
                x: el.offsetLeft,
                width: el.offsetWidth,
                height: el.offsetHeight,
                duration: 0.4,
                ease: "power3.out"
            } )
        }
    }, [active])

    const handleGithubMove = (e: React.MouseEvent<HTMLSpanElement>) => {
            const rect = githubRef.current?.getBoundingClientRect();
            if(!rect)
                    return
            const x = gsap.utils.mapRange(rect?.left, rect?.right, -rect?.width / 2, rect?.width / 2, e.clientX);
            const y = gsap.utils.mapRange(rect?.top, rect?.bottom, -rect?.height / 2, rect?.height / 2, e.clientY);

             gsap.to(githubRef.current, {
                x: x * 0.8,
                y: y * 0.8,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto"
            });
    }

    const handleGithubLeave = () => {
        gsap.to(githubRef.current, { x: 0, y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto"
    });
    }

  return (
    <nav className="navbar" ref={navRef}>
        <h2>Aditya.</h2>
        <ul>
            {NavLists.map((item, index) => {
            const currentIcon: IconName = NavIconNames[index]
            return (
            <li 
            key={item}
            ref={(el) => {listRef.current[index] = el}}
            className={`${active === item ? "textWhite": ""}`}
            onClick={() => setActive(item)}
            >
            <span>
                {item}    
            </span>

            <NavIcon iconName={currentIcon} isActive={active === item} />
            </li>
            )})}

            {/* Active Indicator */}
            <div ref={indicatorRef} className='active-indicator'/>
        </ul>
        <span ref={githubRef} onMouseMove={(e) => handleGithubMove(e)} onMouseLeave={handleGithubLeave} className='github-link'>
            <a href="https://github.com/theunpredictableaditya" target="_blank" rel="noopener noreferrer">
                <span>Github</span>
                <img className="git-arrow" src={arrowLink} alt="arrow-link" />
                <img src={gitIcon} alt="github-icon" className='git-icon'/>
            </a>
        </span>
    </nav>
  )
}

export default NavBar