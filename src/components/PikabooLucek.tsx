import { useState, useEffect, useCallback } from 'react';

const PikabooLucek = () => {
    // State to track visibility and positioning
    const [isVisible, setIsVisible] = useState(false);
    const [side, setSide] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
    const [shouldRender, setShouldRender] = useState(false);

    // Random interval generation (between min and max ms)
    const getRandomInterval = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // Pick a random side
    const pickRandomSide = () => {
        const sides: ('top' | 'bottom' | 'left' | 'right')[] = ['top', 'bottom', 'left', 'right'];
        return sides[Math.floor(Math.random() * sides.length)];
    };

    const triggerEffect = useCallback(() => {
        const newSide = pickRandomSide();
        setSide(newSide);
        setShouldRender(true);
        
        // Small delay to allow render before transitioning for animation
        setTimeout(() => {
            setIsVisible(true);
        }, 50);

        // Auto hide after showing for a while (e.g., 3 seconds)
        setTimeout(() => {
            hideAndReset();
        }, 3000); // Effect duration
    }, []);

    const scheduleNext = useCallback(() => {
        const nextInterval = getRandomInterval(10000, 30000); // 10s to 30s
        // const nextInterval = getRandomInterval(3000, 8000); // Debugging values
        console.log(`Next Pikaboo in ${nextInterval}ms`);
        setTimeout(() => {
            triggerEffect();
        }, nextInterval);
    }, [triggerEffect]);

    useEffect(() => {
        // Start the cycle
        scheduleNext();
        
        // Cleanup not strictly necessary for simple timeouts in this specific pattern 
        // as we want them to persist, but ideally we'd manage a ref for the timeout to clear on unmount
        // For now, simple "fire and forget" recursive timeout pattern.
        return () => {
             // In a real robust app we'd clear timeout here
        };
    }, [scheduleNext]);

    const hideAndReset = () => {
        setIsVisible(false);
        // Wait for transition to finish before unmounting
        setTimeout(() => {
            setShouldRender(false);
            scheduleNext();
        }, 500); // Match transition duration
    };

    const handleClick = () => {
        // "Can't catch me" - hide immediately
        hideAndReset();
    };

    if (!shouldRender) return null;

    // Styles based on side
    const getStyles = () => {
        const baseStyle: React.CSSProperties = {
            position: 'fixed',
            zIndex: 9999, // On top of everything
            transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), margin 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Bouncy effect
            cursor: 'pointer',
            maxWidth: '200px', // Restrict size
            maxHeight: '200px',
        };

        // We use margins for the slide effect to keep rotation simple
        
        let sideStyle: React.CSSProperties = {};
        
        switch (side) {
            case 'bottom':
                sideStyle = {
                    bottom: 0,
                    left: '50%', // Center or random? Random along edge would be cooler but center is safe
                    marginLeft: '-100px', // Center alignment adjustment
                    marginBottom: isVisible ? '-50px' : '-200px', // Peek offset
                    transform: 'rotate(0deg)',
                };
                break;
            case 'top':
                 sideStyle = {
                    top: 0,
                    left: '50%',
                    marginLeft: '-100px',
                    marginTop: isVisible ? '-50px' : '-200px',
                    transform: 'rotate(180deg)',
                };
                break;
            case 'left':
                 sideStyle = {
                    left: 0,
                    top: '50%',
                    marginTop: '-100px',
                    marginLeft: isVisible ? '-50px' : '-200px',
                    transform: 'rotate(90deg)',
                };
                break;
            case 'right':
                 sideStyle = {
                    right: 0,
                    top: '50%',
                    marginTop: '-100px',
                    marginRight: isVisible ? '-50px' : '-200px',
                    transform: 'rotate(-90deg)',
                };
                break;
        }

        return { ...baseStyle, ...sideStyle };
    };

    return (
        <img 
            src="/lucek_kapec.png" 
            alt="Lucek" 
            style={getStyles()} 
            onClick={handleClick}
            draggable={false}
        />
    );
};

export default PikabooLucek;
