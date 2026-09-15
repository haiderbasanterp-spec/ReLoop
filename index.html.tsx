import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Scissors, Recycle, ScanFace, Leaf, Sparkles } from 'lucide-react';

const colors = {
  bg: '#F8F9FA',      // Blanco tiza
  text: '#1F2421',    // Grafito profundo
  accent: '#2D6A4F',  // Verde esmeralda bosque
};

const MagneticButton = ({ children, className = '', onClick, variant = 'dark' }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isDark = variant === 'dark';

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-full px-8 py-4 font-medium tracking-wide flex items-center gap-2 group transition-shadow hover:shadow-2xl ${className}`}
      style={{
        backgroundColor: isDark ? colors.text : colors.bg,
        color: isDark ? colors.bg : colors.text,
        border: isDark ? 'none' : `1px solid ${colors.text}20`
      }}
    >
      <span className="relative z-10 flex items-center gap-2 mix-blend-difference text-white">
        {children}
      </span>
      <div 
        className="absolute inset-0 w-full h-full rounded-full transition-transform duration-500 origin-bottom z-0"
        style={{ 
            backgroundColor: colors.accent,
            transform: isHovered ? 'scaleY(1)' : 'scaleY(0)'
        }}
      />
    </motion.button>
  );
};

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-4 py-6 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center backdrop-blur-xl bg-[#F8F9FA]/70 border border-[#1F2421]/10 rounded-full px-3 py-2 pr-4 shadow-lg pointer-events-auto transition-all duration-300 hover:bg-[#F8F9FA]/90">
        
        <div className="flex items-center pl-2">
           {/* Fallback to text if image fails to load in preview */}
          <div className="font-bold text-xl tracking-tighter flex items-center gap-1" style={{ color: colors.text }}>
             ReL<span className="text-[#2D6A4F]">oo</span>p
          </div>
          {/* Real implementation should use image_3265e1.jpg or image_319006.jpg
          <img 
            src="image_3265e1.jpg" 
            alt="ReLoop Logo" 
            className="h-8 w-auto object-contain mix-blend-multiply rounded-full"
            onError={(e) => { e.target.style.display = 'none'; }}
          /> */}
        </div>

        <div className="hidden md:flex items-center gap-10 text-[12px] font-semibold tracking-widest uppercase" style={{ color: colors.text }}>
          <a href="#ecosistema" className="hover:text-[#2D6A4F] transition-colors relative group py-2">
            El Ecosistema
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2D6A4F] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#probador" className="hover:text-[#2D6A4F] transition-colors relative group py-2">
            Probador AI
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2D6A4F] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#catalogo" className="hover:text-[#2D6A4F] transition-colors relative group py-2">
            Catálogo Local
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2D6A4F] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <button 
          className="text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
          style={{ backgroundColor: colors.text, color: colors.bg }}
        >
          <Sparkles size={14} /> Entrar
        </button>
      </div>
    </motion.nav>
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.5], ['0%', '-50%']);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: colors.bg }}>
      
      <div className="absolute inset-4 md:inset-8 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
        <motion.div 
          className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center will-change-transform"
          style={{ 
            // Using a reliable Unsplash image for the background to ensure preview works
            backgroundImage: 'url("https://images.unsplash.com/photo-1550614000-4b95d466f16f?q=80&w=2070&auto=format&fit=crop")',
            y: yBackground,
            scale: scaleBackground,
            filter: 'brightness(0.7) contrast(1.1) saturate(0.8)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>
      
      <motion.div 
        style={{ opacity: opacityText, y: yText }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl"
      >
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
           className="mb-8 px-5 py-2.5 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center gap-3 text-white/95 text-xs font-semibold tracking-[0.2em] uppercase"
        >
           <Leaf size={14} className="text-[#2D6A4F]" /> Innovación Circular
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter leading-[0.9] text-white"
        >
          El futuro de <br/> tu clóset es <br/>
          <span className="italic font-light text-[#2D6A4F] pr-4">infinito.</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14"
        >
           <MagneticButton variant="light" className="!bg-white !text-[#1F2421]">
              Descubrir Colección <ArrowRight size={18} />
           </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

const EcosystemSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Controls for the left side text steps
  const step1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const step1Y = useTransform(scrollYProgress, [0.3, 0.6], [0, -50]);
  
  const step2Opacity = useTransform(scrollYProgress, [0.4, 0.7, 1], [0, 1, 1]);
  const step2Y = useTransform(scrollYProgress, [0.4, 0.7], [50, 0]);

  // Controls for the right side image transition
  const maskSize = useTransform(scrollYProgress, [0.3, 0.7], ['0%', '100%']);
  const oldImageScale = useTransform(scrollYProgress, [0.3, 0.7], [1, 1.1]);
  const oldImageBlur = useTransform(scrollYProgress, [0.3, 0.7], ['blur(0px)', 'blur(8px)']);

  return (
    <section id="ecosistema" className="py-32 relative" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-24 text-center max-w-3xl mx-auto">
           <h2 className="text-sm font-semibold tracking-widest uppercase mb-4 text-[#2D6A4F]">El Modelo ReLoop</h2>
           <p className="text-3xl md:text-5xl font-medium tracking-tight leading-tight">
             Dejamos de extraer. <br/> Empezamos a <span className="italic text-[#2D6A4F]">transformar.</span>
           </p>
        </div>

        <div ref={containerRef} className="relative flex flex-col md:flex-row items-center justify-center gap-16 min-h-[150vh]">
          
          {/* Lado Izquierdo: Textos Narrativos (Sticky) */}
          <div className="flex-1 w-full h-[400px] md:h-[600px] relative flex items-center">
            <div className="sticky top-1/2 -translate-y-1/2 w-full">
                
                {/* Paso 1 */}
                <motion.div 
                  style={{ opacity: step1Opacity, y: step1Y }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-full md:pr-16"
                >
                  <div className="flex items-center gap-3 text-[#2D6A4F] mb-6 font-mono text-sm tracking-widest uppercase">
                    <Recycle size={18} /> <span>Fase 01: Selección</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
                    Materia prima con <br/> historia propia.
                  </h3>
                  <p className="text-lg opacity-70 leading-relaxed font-light">
                    Rescatamos prendas de segunda mano de alta calidad. Cada textura, desgaste e imperfección cuenta una historia que nos sirve como lienzo en blanco para nuestros creadores.
                  </p>
                </motion.div>

                {/* Paso 2 */}
                <motion.div 
                  style={{ opacity: step2Opacity, y: step2Y }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-full md:pr-16"
                >
                  <div className="flex items-center gap-3 text-[#2D6A4F] mb-6 font-mono text-sm tracking-widest uppercase">
                    <Scissors size={18} /> <span>Fase 02: Upcycling</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
                    Talento local, <br/> diseño de vanguardia.
                  </h3>
                  <p className="text-lg opacity-70 leading-relaxed font-light">
                    Nuestros talleres locales aplican técnicas artesanales complejas. Desmontan, cortan y reconstruyen para transformar físicamente la prenda en una pieza contemporánea exclusiva.
                  </p>
                </motion.div>

            </div>
          </div>

          {/* Lado Derecho: Interacción Visual de Prendas */}
          <div className="flex-1 w-full flex justify-center items-center h-[50vh] md:h-[80vh] sticky top-[10vh]">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-[#EFEFEF]">
              
              {/* Prenda Base (Vieja) - Using reliable Unsplash URL for preview */}
              <motion.img 
                style={{ scale: oldImageScale, filter: oldImageBlur }}
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop" 
                alt="Prenda Original" 
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              
              {/* Prenda Transformada (Nueva) - Revelada por máscara */}
              <motion.div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ height: maskSize }}
              >
                {/* Using reliable Unsplash URL for preview */}
                <img 
                  src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2069&auto=format&fit=crop" 
                  alt="Prenda Upcycled" 
                  className="absolute top-0 left-0 w-full min-h-[100%] object-cover object-center" 
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2D6A4F] shadow-[0_0_15px_rgba(45,106,79,0.8)]" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const DigitalFittingRoom = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scannerTop = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);
  const clipHeight = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section id="probador" className="py-32 relative overflow-hidden" style={{ backgroundColor: '#0A0A0A', color: colors.bg }}>
      
      {/* Fondo decorativo tech premium */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'linear-gradient(#2D6A4F 1px, transparent 1px), linear-gradient(90deg, #2D6A4F 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-[#2D6A4F] opacity-10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
           <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] mb-6 border border-[#2D6A4F]/20">
             <ScanFace size={28} />
           </div>
           <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6">
             Fitting. <span className="text-[#2D6A4F] italic font-light">Evolucionado.</span>
           </h2>
           <p className="text-lg opacity-60 font-light max-w-2xl mx-auto">
             Sin avatares 3D genéricos. Nuestra IA analiza la topología de tu fotografía y mapea la prenda física real sobre ti, respetando texturas, luz y caída.
           </p>
        </div>

        <div ref={containerRef} className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 min-h-[120vh]">
          
          {/* Instrucciones Left */}
          <div className="flex-1 max-w-sm sticky top-[30vh]">
            <div className="flex flex-col gap-8">
              <div className="flex gap-6 group">
                <span className="text-[#2D6A4F] font-mono text-xl font-semibold opacity-50 group-hover:opacity-100 transition-opacity">01</span>
                <div>
                  <h4 className="text-xl font-medium mb-2">Carga tu retrato</h4>
                  <p className="text-sm font-light opacity-60 leading-relaxed">Sube una fotografía con buena iluminación y postura frontal.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <span className="text-[#2D6A4F] font-mono text-xl font-semibold opacity-50 group-hover:opacity-100 transition-opacity">02</span>
                <div>
                  <h4 className="text-xl font-medium mb-2">Elige tu pieza</h4>
                  <p className="text-sm font-light opacity-60 leading-relaxed">Selecciona cualquier prenda única de nuestro catálogo de creadores locales.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <span className="text-[#2D6A4F] font-mono text-xl font-semibold opacity-100">03</span>
                <div>
                  <h4 className="text-xl font-medium mb-2 text-[#2D6A4F]">Scroll para probar</h4>
                  <p className="text-sm font-light opacity-60 leading-relaxed">Nuestra red neuronal ajusta la prenda a tu cuerpo al instante.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Área del Escáner Interactivo */}
          <div className="flex-1 w-full flex justify-center sticky top-[15vh]">
            <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(45,106,79,0.1)] border border-white/5 bg-[#1F2421]">
              
              {/* Imagen Base (Usuario) - Using reliable Unsplash URL for preview */}
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                alt="Usuario Fotografía Base" 
                className="absolute inset-0 w-full h-full object-cover object-center grayscale-[0.3]"
              />
              
              {/* Imagen Resultante Revelada - Using reliable Unsplash URL for preview */}
              <motion.div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ height: clipHeight }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop" 
                  alt="Usuario con Prenda Upcycled" 
                  className="absolute top-0 left-0 w-full min-h-[100%] object-cover object-center filter contrast-[1.05]"
                />
              </motion.div>

              {/* Línea de Escáner Verde Esmeralda Animada por Scroll */}
              <motion.div 
                className="absolute left-0 right-0 h-[2px] z-20"
                style={{ 
                  backgroundColor: colors.accent,
                  top: scannerTop
                }}
              >
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60px] opacity-50 blur-xl pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, transparent, ${colors.accent}, transparent)` }}
                />
                <div className="absolute top-1/2 left-0 w-1.5 h-4 bg-white -translate-y-1/2 rounded-r-full shadow-[0_0_15px_#fff]"></div>
                <div className="absolute top-1/2 right-0 w-1.5 h-4 bg-white -translate-y-1/2 rounded-l-full shadow-[0_0_15px_#fff]"></div>
              </motion.div>

              {/* UI overlay estético de la cámara */}
              <div className="absolute inset-5 border border-white/10 rounded-2xl pointer-events-none flex justify-between p-5">
                 <div className="w-10 h-10 border-t-2 border-l-2 border-white/40 rounded-tl-xl"></div>
                 <div className="w-10 h-10 border-t-2 border-r-2 border-white/40 rounded-tr-xl"></div>
                 <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-white/40 rounded-bl-xl"></div>
                 <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-white/40 rounded-br-xl"></div>
                 
                 <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-white/80">AI Vision V2.4</span>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const CatalogSection = () => {
    return (
        <section id="catalogo" className="py-32" style={{ backgroundColor: colors.bg, color: colors.text }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">
                            Colección <br/> <span className="italic text-[#2D6A4F]">Limitada.</span>
                        </h2>
                        <p className="text-lg opacity-60 font-light max-w-md">
                            Piezas únicas creadas por diseñadores de Cali. Una vez que se van, no vuelven a existir.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase hover:text-[#2D6A4F] transition-colors pb-2 border-b border-black hover:border-[#2D6A4F]">
                        Ver Todo <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Item 1 */}
                    <div className="group cursor-pointer">
                        <div className="relative aspect-[4/5] bg-[#EFEFEF] rounded-2xl overflow-hidden mb-6">
                            {/* Using reliable Unsplash URL for preview */}
                            <img 
                                src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop"
                                alt="Intarsia Upcycled"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider">
                                1 of 1
                            </div>
                        </div>
                        <h3 className="text-xl font-medium mb-1">Camiseta Intarsia Reconstruida</h3>
                        <p className="text-sm opacity-60 font-light">Taller Ancestral, Cali</p>
                    </div>

                    {/* Item 2 */}
                    <div className="group cursor-pointer md:mt-16">
                        <div className="relative aspect-[4/5] bg-[#EFEFEF] rounded-2xl overflow-hidden mb-6">
                            {/* Using reliable Unsplash URL for preview */}
                            <img 
                                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop"
                                alt="Streetwear Upcycled"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider">
                                1 of 1
                            </div>
                        </div>
                        <h3 className="text-xl font-medium mb-1">Jersey Oversize Malla 73</h3>
                        <p className="text-sm opacity-60 font-light">Studio True, Medellín</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
  return (
    <footer className="py-24 border-t relative overflow-hidden" style={{ backgroundColor: colors.bg, borderColor: '#1F242115' }}>
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#2D6A4F]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-12" style={{ color: colors.text }}>
          Únete a la revolución <br/><span className="italic text-[#2D6A4F]">circular.</span>
        </h2>
        <MagneticButton variant="dark">
           Crear Perfil <ArrowRight size={18} />
        </MagneticButton>
        <div className="mt-32 pt-8 w-full border-t border-[#1F242110] flex flex-col md:flex-row justify-between text-xs uppercase tracking-widest font-semibold opacity-50" style={{ color: colors.text }}>
          <p>© 2026 ReLoop. Todos los derechos reservados.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-[#2D6A4F] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#2D6A4F] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#2D6A4F] transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    // Injecting Inter font for editorial look
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Injecting Tailwind CSS via CDN for standalone preview reliability
    const tailwind = document.createElement('script');
    tailwind.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tailwind);

    document.body.style.fontFamily = "'Inter', sans-serif";
    document.body.style.margin = "0";
    document.body.style.backgroundColor = colors.bg;
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(tailwind);
    };
  }, []);

  return (
    <div className="w-full min-h-screen font-sans antialiased selection:bg-[#2D6A4F] selection:text-white" style={{ backgroundColor: colors.bg }}>
      <Navbar />
      
      <main>
        <HeroSection />
        <EcosystemSection />
        <DigitalFittingRoom />
        <CatalogSection />
      </main>
      
      <Footer />
    </div>
  );
}