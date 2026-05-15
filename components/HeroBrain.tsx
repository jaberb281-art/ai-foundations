'use client'

const nodes = [
    [126, 152], [171, 112], [226, 128], [286, 150],
    [329, 214], [294, 292], [225, 330], [158, 295],
    [101, 226], [168, 220], [224, 214], [260, 253],
    [139, 258], [207, 174], [246, 185], [190, 260],
]

const links = [
    [0, 1], [1, 13], [13, 2], [2, 14], [14, 3], [3, 4],
    [4, 5], [5, 6], [6, 7], [7, 12], [12, 8], [8, 0],
    [9, 10], [10, 11], [11, 5], [12, 9], [9, 15], [15, 6],
    [13, 10], [10, 14], [14, 4],
]

export default function HeroBrain() {
    return (
        <div className="relative h-[390px] w-[390px] sm:h-[500px] sm:w-[500px] overflow-hidden rounded-[2.5rem]">
            {/* Background atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(59,130,246,0.28),transparent_42%),radial-gradient(circle_at_70%_55%,rgba(139,92,246,0.25),transparent_38%),linear-gradient(135deg,#06111f,#0a1020_55%,#050713)]" />

            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
            <div className="absolute left-[42%] top-[45%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-2xl" />

            <svg
                viewBox="0 0 420 420"
                className="relative z-10 h-full w-full drop-shadow-[0_0_55px_rgba(139,92,246,0.55)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="brainStroke" x1="70" y1="70" x2="360" y2="350">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="45%" stopColor="#7c3aed" />
                        <stop offset="75%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>

                    <radialGradient id="brainFill" cx="50%" cy="48%" r="55%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                        <stop offset="60%" stopColor="#4f46e5" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#020617" stopOpacity="0.05" />
                    </radialGradient>

                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="hotGlow">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Organic brain silhouette */}
                <path
                    d="M211 59
          C170 55 132 78 117 117
          C88 119 62 143 58 176
          C28 194 28 245 61 267
          C58 279 57 292 60 306
          C67 347 105 377 148 374
          C180 372 202 358 218 337
          C236 359 263 371 296 364
          C337 355 363 319 358 278
          C389 259 405 227 399 190
          C391 142 349 108 303 113
          C287 80 253 63 211 59Z"
                    fill="url(#brainFill)"
                    stroke="url(#brainStroke)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#softGlow)"
                >
                    <animate
                        attributeName="d"
                        dur="7s"
                        repeatCount="indefinite"
                        values="
            M211 59 C170 55 132 78 117 117 C88 119 62 143 58 176 C28 194 28 245 61 267 C58 279 57 292 60 306 C67 347 105 377 148 374 C180 372 202 358 218 337 C236 359 263 371 296 364 C337 355 363 319 358 278 C389 259 405 227 399 190 C391 142 349 108 303 113 C287 80 253 63 211 59Z;
            M210 62 C167 58 130 82 114 121 C86 122 64 146 59 178 C31 198 33 242 64 264 C61 279 60 292 63 307 C72 346 107 374 149 371 C180 369 204 354 219 334 C238 356 266 368 296 361 C334 352 359 318 355 277 C386 257 401 225 394 191 C386 146 347 112 303 116 C284 83 251 66 210 62Z;
            M211 59 C170 55 132 78 117 117 C88 119 62 143 58 176 C28 194 28 245 61 267 C58 279 57 292 60 306 C67 347 105 377 148 374 C180 372 202 358 218 337 C236 359 263 371 296 364 C337 355 363 319 358 278 C389 259 405 227 399 190 C391 142 349 108 303 113 C287 80 253 63 211 59Z"
                    />
                </path>

                {/* Hemisphere separation */}
                <path
                    d="M211 73 C199 115 207 154 191 191 C177 224 184 268 216 337"
                    stroke="#93c5fd"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.35"
                />

                {/* Cortex folds */}
                {[
                    'M112 140 C145 111 190 108 225 133',
                    'M92 203 C129 176 178 176 217 205',
                    'M116 271 C153 245 213 248 255 285',
                    'M225 132 C264 124 299 145 316 176',
                    'M221 204 C260 181 307 198 329 237',
                    'M221 332 C249 302 292 300 320 328',
                    'M145 160 C158 148 176 143 196 148',
                    'M266 235 C290 229 309 242 322 265',
                ].map((d, i) => (
                    <path
                        key={i}
                        d={d}
                        stroke="url(#brainStroke)"
                        strokeWidth={i > 5 ? 1.4 : 2.3}
                        strokeLinecap="round"
                        opacity="0.55"
                    >
                        <animate
                            attributeName="opacity"
                            values="0.18;0.78;0.18"
                            dur={`${3.2 + i * 0.35}s`}
                            begin={`${i * 0.25}s`}
                            repeatCount="indefinite"
                        />
                    </path>
                ))}

                {/* Neural links */}
                <g stroke="#60a5fa" strokeWidth="1.35" opacity="0.55">
                    {links.map(([a, b], i) => (
                        <line
                            key={i}
                            x1={nodes[a][0]}
                            y1={nodes[a][1]}
                            x2={nodes[b][0]}
                            y2={nodes[b][1]}
                        >
                            <animate
                                attributeName="opacity"
                                values="0.12;0.9;0.18"
                                dur={`${2.4 + (i % 5) * 0.45}s`}
                                begin={`${i * 0.08}s`}
                                repeatCount="indefinite"
                            />
                        </line>
                    ))}
                </g>

                {/* Traveling signals */}
                {[
                    'M126 152 L171 112 L207 174 L224 214 L260 253 L294 292',
                    'M101 226 L139 258 L168 220 L224 214 L246 185 L329 214',
                    'M158 295 L225 330 L294 292 L329 214',
                    'M286 150 L246 185 L224 214 L190 260 L225 330',
                ].map((path, i) => (
                    <circle key={i} r="4.5" fill="#bfdbfe" filter="url(#hotGlow)">
                        <animateMotion
                            dur={`${2.8 + i * 0.55}s`}
                            begin={`${i * 0.45}s`}
                            repeatCount="indefinite"
                            path={path}
                        />
                        <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur={`${2.8 + i * 0.55}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                ))}

                {/* Central cognition core */}
                <g filter="url(#hotGlow)">
                    <circle cx="224" cy="214" r="28" fill="#3b82f6" opacity="0.16">
                        <animate attributeName="r" values="22;34;22" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="224" cy="214" r="9" fill="#bfdbfe">
                        <animate attributeName="r" values="6;10;6" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="224" cy="214" r="3" fill="#ffffff" opacity="0.9" />
                </g>

                {/* Nodes */}
                {nodes.map(([x, y], i) => (
                    <g key={i}>
                        <circle cx={x} cy={y} r="16" fill="#38bdf8" opacity="0.08">
                            <animate
                                attributeName="r"
                                values="8;22;8"
                                dur={`${2 + (i % 6) * 0.35}s`}
                                begin={`${i * 0.12}s`}
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="opacity"
                                values="0.05;0.32;0.05"
                                dur={`${2 + (i % 6) * 0.35}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle cx={x} cy={y} r="5.5" fill="#93c5fd">
                            <animate
                                attributeName="opacity"
                                values="0.35;1;0.35"
                                dur={`${1.7 + (i % 5) * 0.22}s`}
                                begin={`${i * 0.09}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    </g>
                ))}

                {/* Orbit ring */}
                <ellipse
                    cx="215"
                    cy="218"
                    rx="145"
                    ry="96"
                    stroke="#8b5cf6"
                    strokeWidth="1.2"
                    opacity="0.18"
                    strokeDasharray="6 12"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 215 218"
                        to="360 215 218"
                        dur="28s"
                        repeatCount="indefinite"
                    />
                </ellipse>
            </svg>

            {/* Floating particles */}
            <div className="pointer-events-none absolute inset-0 z-20">
                {[...Array(32)].map((_, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full bg-blue-200/35"
                        style={{
                            width: `${2 + (i % 3)}px`,
                            height: `${2 + (i % 3)}px`,
                            left: `${(i * 31) % 100}%`,
                            top: `${(i * 47) % 100}%`,
                            animation: `floatParticle ${5 + (i % 7)}s ease-in-out infinite`,
                            animationDelay: `${i * 0.18}s`,
                        }}
                    />
                ))}
            </div>

            <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-blue-100 shadow-lg backdrop-blur-md">
                Neural cognition pathway
            </div>

            <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.25;
          }
          50% {
            transform: translate3d(10px, -18px, 0);
            opacity: 0.85;
          }
        }
      `}</style>
        </div>
    )
}