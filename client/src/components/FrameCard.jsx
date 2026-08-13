import React from 'react';

// ---- Sub-components used by the id-card frame ----
const InfoIcon = ({ children }) => (
  <div className="w-6 h-6 rounded-full bg-hh-green-deep/10 border border-hh-green-deep/40 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#0a3d24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  </div>
);

const DashedUnderline = () => (
  <svg viewBox="0 0 200 2" preserveAspectRatio="none" className="w-full h-[2px] mt-1">
    <line x1="0" y1="1" x2="200" y2="1" stroke="#0a3d24" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" />
  </svg>
);

const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-start gap-2">
    <InfoIcon>{icon}</InfoIcon>
    <div className="flex-1 min-w-0">
      <div className="font-mono text-[6px] tracking-[0.3em] text-hh-green-deep/60 uppercase">{label}</div>
      <div className="font-display text-hh-green-deep text-[11px] leading-tight truncate">{value}</div>
      <DashedUnderline />
    </div>
  </div>
);

const StepIcon = ({ label, path }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="w-7 h-7 rounded-full bg-hh-green-deep flex items-center justify-center shadow-sm">
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#f9df32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {path}
      </svg>
    </div>
    <div className="font-mono text-[5.5px] tracking-[0.2em] text-hh-green-deep/70">{label}</div>
  </div>
);

/**
 * FrameCard - renders a builder ID in exactly two premium styles:
 *   1. 'pfp'      -> Social PFP (circular cutout, 3:4)
 *   2. 'id-card'  -> Physical Event Badge (vertical VIP lanyard, ~2:3)
 */
const FrameCard = ({
  frame,
  name = 'AARAV',
  role = 'BUILDER',
  title = '',
  team = '',
  photo,
  builderId = 'HH-26-0000',
  zoom = 1,
  pan = { x: 0, y: 0 },
  onPanChange,
  className = '',
  thumb = false,
}) => {
  const displayName = (name || 'AARAV').toUpperCase();
  const displayRole = (role || 'BUILDER').toUpperCase();
  const displayTitle = (title || 'CRAFTING IN GOA').toUpperCase();
  const displayTeam = (team || 'SOLO BUILDER').toUpperCase();

  if (!frame) return null;

  // Enable dragging only when an image exists and onPanChange handler is passed
  const isInteractive = Boolean(onPanChange && photo && !thumb);

  const handlePointerDown = (e) => {
    if (!isInteractive) return;
    e.preventDefault();

    const startX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const startY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    const initialX = pan.x || 0;
    const initialY = pan.y || 0;

    const handlePointerMove = (moveEvent) => {
      const currentX = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0] ? moveEvent.touches[0].clientX : 0);
      const currentY = moveEvent.clientY || (moveEvent.touches && moveEvent.touches[0] ? moveEvent.touches[0].clientY : 0);

      let newX = initialX + (currentX - startX);
      let newY = initialY + (currentY - startY);

      const maxPan = 400 * zoom;

      if (newX > maxPan) newX = maxPan;
      if (newX < -maxPan) newX = -maxPan;
      if (newY > maxPan) newY = maxPan;
      if (newY < -maxPan) newY = -maxPan;

      onPanChange({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);
  };

  const photoEl = (shape = 'rect', extraClass = '') => (
    <div
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      className={`relative overflow-hidden ${extraClass} bg-hh-green-deep ${
        shape === 'circle' ? 'rounded-full' : 'rounded-xl'
      } ${isInteractive ? 'cursor-grab active:cursor-grabbing select-none' : ''}`}
    >
      {photo ? (
        <img
          src={photo}
          alt="user"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            objectPosition: `calc(50% + ${pan.x || 0}px) calc(50% + ${pan.y || 0}px)`,
            transform: `scale(${zoom})`,
          }}
        />
      ) : (
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-70 pointer-events-none">
          <circle cx="50" cy="40" r="18" fill="#f5edb7" />
          <path d="M20 100 Q50 65 80 100 Z" fill="#f5edb7" />
        </svg>
      )}
    </div>
  );

  // ============================================================
  // 1. SOCIAL PFP — premium circular cutout on deep green
  // ============================================================
  if (frame.id === 'pfp') {
    return (
      <div
        data-testid="frame-pfp"
        className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-hh-green-deep border-2 border-hh-yellow/70 shadow-[6px_6px_0_#ec2f89] ${className}`}
      >
        {/* subtle luxe grain overlay */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'radial-gradient(#f5edb7 1px, transparent 1px)', backgroundSize: '6px 6px' }}
        />

        {/* Corner monogram */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="font-mono text-[8px] tracking-[0.3em] text-hh-yellow/80">EST · 2026</div>
        </div>
        <div className="absolute top-4 right-4 font-mono text-[8px] tracking-[0.3em] text-hh-yellow/80 pointer-events-none">
          {builderId}
        </div>

        {/* Premium typography above circle */}
        <div className="absolute top-[14%] left-0 right-0 text-center pointer-events-none px-6">
          <div className="font-mono text-[8px] tracking-[0.45em] text-hh-pink mb-1">— PRESENTING —</div>
          <div className="font-display text-hh-yellow text-2xl leading-none tracking-wide" style={{ WebkitTextStroke: '0.6px #ec2f89' }}>
            HACKER HOUSE
          </div>
          <div className="font-display text-hh-cream text-lg leading-none tracking-[0.25em] mt-1">GOA · 2026</div>
        </div>

        {/* Circular photo dead center with dashed yellow + pink rings */}
        <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[62%] aspect-square">
          {/* Outer pink dashed ring */}
          <svg viewBox="0 0 100 100" className="absolute -inset-[6%] w-[112%] h-[112%] pointer-events-none animate-[spin_60s_linear_infinite]">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#ec2f89" strokeWidth="0.8" strokeDasharray="1 3" strokeLinecap="round" />
          </svg>
          {/* Inner yellow dashed ring */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
            <circle cx="50" cy="50" r="49" fill="none" stroke="#f9df32" strokeWidth="1.2" strokeDasharray="3 2" />
          </svg>
          {photoEl('circle', 'w-full h-full border-4 border-hh-green-deep')}
          {/* subtle glow */}
          <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_20px_rgba(249,223,50,0.25)]" />
        </div>

        {/* Bottom name plate */}
        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none px-6">
          <div className="font-display text-hh-yellow text-xl leading-none tracking-wider">{displayName}</div>
          <div className="inline-block mt-2 border border-hh-yellow/60 bg-hh-green-deep/60 px-3 py-1 rounded-full">
            <span className="font-mono text-[8px] tracking-[0.35em] text-hh-cream">{displayRole}</span>
          </div>
          <div className="mt-3 font-mono text-[7px] tracking-[0.4em] text-hh-cream/60">#FRAMEINGOA</div>
        </div>
      </div>
    );
  }

  // ============================================================
  // 2. EVENT ID BADGE — premium physical VIP lanyard (~2:3)
  // ============================================================
  if (frame.id === 'id-card') {
    return (
      <div
        data-testid="frame-id-card"
        className={`relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#f7f1de] shadow-[6px_6px_0_#ec2f89] border border-hh-green-deep/20 ${className}`}
      >
        {/* Lanyard hole hint (top center) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-hh-green-deep/25 pointer-events-none" />

        {/* ============ HEADER ============ */}
        <div className="relative">
          <div className="relative bg-hh-green-deep pt-6 pb-8 px-4 text-center">
            <div className="font-mono text-[7px] tracking-[0.45em] text-hh-yellow/80">VIP · ACCESS</div>
            <div className="font-display text-hh-yellow text-xl leading-none tracking-wide mt-1" style={{ WebkitTextStroke: '0.4px #ec2f89' }}>
              HACKER HOUSE
            </div>
            <div className="font-display text-hh-cream text-sm leading-none tracking-[0.35em] mt-1">GOA · 2026</div>
            <div className="mt-2 inline-flex items-center gap-2">
              <span className="w-6 h-[1px] bg-hh-yellow/60" />
              <span className="font-mono text-[8px] tracking-[0.35em] text-hh-yellow">28 — 31 OCT 2026</span>
              <span className="w-6 h-[1px] bg-hh-yellow/60" />
            </div>
          </div>
          {/* Wavy bottom edge */}
          <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute bottom-[-1px] left-0 w-full h-6">
            <path d="M0 0 C 40 24 80 24 100 10 C 120 -4 160 -4 200 12 L200 20 L0 20 Z" fill="#0a3d24" />
            <path d="M0 4 C 40 26 80 26 100 14 C 120 2 160 2 200 16" fill="none" stroke="#f9df32" strokeWidth="0.6" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* ============ BODY (two columns) ============ */}
        <div className="grid grid-cols-[45%_55%] gap-2.5 px-3 pt-3 pb-2">
          {/* -------- LEFT column -------- */}
          <div className="flex flex-col">
            {/* photo with dashed gold frame */}
            <div className="relative p-1.5">
              <svg viewBox="0 0 100 130" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                <rect x="1" y="1" width="98" height="128" rx="6" ry="6" fill="none" stroke="#c9a227" strokeWidth="1" strokeDasharray="3 2.5" />
              </svg>
              {photoEl('rect', 'w-full aspect-[3/4] rounded-lg border border-hh-green-deep/10 shadow-sm')}
            </div>

            {/* Slogan */}
            <div className="mt-2 px-1">
              <div className="font-display text-hh-green-deep text-[10px] leading-tight tracking-wide">
                BUILDING IN GOA,
              </div>
              <div className="font-display text-hh-pink text-[10px] leading-tight tracking-wide">
                SHIPPING IMPACT
              </div>
            </div>

            {/* Palm trees + sun decoration */}
            <div className="mt-auto pt-2">
              <svg viewBox="0 0 100 40" className="w-full h-8">
                {/* sun */}
                <circle cx="82" cy="18" r="6" fill="#f9df32" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                  <line
                    key={a}
                    x1={82 + 8 * Math.cos((a * Math.PI) / 180)}
                    y1={18 + 8 * Math.sin((a * Math.PI) / 180)}
                    x2={82 + 11 * Math.cos((a * Math.PI) / 180)}
                    y2={18 + 11 * Math.sin((a * Math.PI) / 180)}
                    stroke="#f9df32"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                ))}
                {/* palm 1 */}
                <path d="M15 40 Q16 25 15 12" stroke="#0a3d24" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M15 13 Q6 10 2 14" stroke="#0a3d24" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M15 13 Q24 10 28 14" stroke="#0a3d24" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M15 13 Q10 6 6 4" stroke="#0a3d24" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M15 13 Q20 6 24 4" stroke="#0a3d24" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* palm 2 (smaller) */}
                <path d="M40 40 Q41 30 40 22" stroke="#0a3d24" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M40 22 Q34 20 31 22" stroke="#0a3d24" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M40 22 Q46 20 49 22" stroke="#0a3d24" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M40 22 Q37 16 34 15" stroke="#0a3d24" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* ground */}
                <path d="M0 40 Q30 36 60 40 T100 40" stroke="#0a3d24" strokeWidth="0.6" fill="none" strokeDasharray="1.5 1.5" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* -------- RIGHT column -------- */}
          <div className="flex flex-col gap-2.5">
            {/* Builder ID pill */}
            <div className="inline-flex items-center gap-1.5 self-start bg-hh-green-deep text-hh-yellow px-3 py-1 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-hh-pink" />
              <span className="font-mono text-[7px] tracking-[0.3em] font-bold">BUILDER ID</span>
            </div>

            <InfoRow
              label="YOUR NAME"
              value={displayName}
              icon={<><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" /></>}
            />
            <InfoRow
              label="ROLE / STACK"
              value={displayRole}
              icon={<><path d="M4 7l8-4 8 4-8 4-8-4z" /><path d="M4 12l8 4 8-4" /><path d="M4 17l8 4 8-4" /></>}
            />
            <InfoRow
              label="BUILDER TITLE"
              value={displayTitle}
              icon={<><path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.8l-4.9 2.4.9-5.5-4-3.9 5.5-.8z" /></>}
            />
            <InfoRow
              label="TEAM NAME"
              value={displayTeam}
              icon={<><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2.5" /><path d="M3 20c1-3 3-4.5 6-4.5s5 1.5 6 4.5" /><path d="M15 20c.5-2 2-3 4-3s3.5 1 4 3" /></>}
            />

            {/* Step icons row */}
            <div className="mt-auto pt-1 flex items-center justify-between gap-1">
              <StepIcon label="BUILD" path={<><path d="M12 3v18M3 12h18" /></>} />
              <StepIcon label="HACK" path={<><path d="M8 4l-5 8 5 8M16 4l5 8-5 8" /></>} />
              <StepIcon label="SHIP" path={<><path d="M3 12l4-8h10l4 8-9 8z" /></>} />
              <StepIcon label="CONNECT" path={<><circle cx="6" cy="12" r="2" /><circle cx="18" cy="12" r="2" /><path d="M8 12h8" /></>} />
            </div>
          </div>
        </div>

        {/* ============ QR BANNER FOOTER ============ */}
        <div className="absolute bottom-0 left-0 right-0 bg-hh-green-deep px-3 py-2.5 flex items-center gap-3">
          {/* QR mock */}
          <div className="bg-hh-cream p-1 rounded-md shrink-0">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              {/* corner markers */}
              <rect x="2" y="2" width="10" height="10" fill="none" stroke="#0a3d24" strokeWidth="1.5" />
              <rect x="4" y="4" width="6" height="6" fill="#0a3d24" />
              <rect x="28" y="2" width="10" height="10" fill="none" stroke="#0a3d24" strokeWidth="1.5" />
              <rect x="30" y="4" width="6" height="6" fill="#0a3d24" />
              <rect x="2" y="28" width="10" height="10" fill="none" stroke="#0a3d24" strokeWidth="1.5" />
              <rect x="4" y="30" width="6" height="6" fill="#0a3d24" />
              {/* data squares */}
              {[
                [15,3],[19,3],[23,3],[15,7],[23,7],[27,15],[31,15],[35,15],
                [3,15],[7,15],[15,15],[19,19],[23,15],[27,19],[15,19],
                [3,19],[3,23],[7,23],[11,23],[15,23],[19,23],[23,23],[27,23],[31,23],[35,23],
                [15,27],[19,31],[23,27],[27,27],[31,31],[35,27],
                [19,35],[23,35],[27,35],[31,35],[15,31],[23,31],
              ].map(([x, y], i) => (
                <rect key={i} x={x} y={y} width="3" height="3" fill="#0a3d24" />
              ))}
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[7px] tracking-[0.35em] text-hh-yellow/80">— SCAN TO CONNECT —</div>
            <div className="font-display text-hh-cream text-[13px] leading-none tracking-wider mt-1 truncate">
              {displayName}
            </div>
            <div className="font-mono text-[7px] tracking-[0.25em] text-hh-yellow mt-1">
              ID · {builderId}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-mono text-[6px] tracking-[0.3em] text-hh-cream/70">#FRAMEINGOA</div>
            <div className="font-mono text-[6px] tracking-[0.3em] text-hh-cream/70">GOA · INDIA</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FrameCard;