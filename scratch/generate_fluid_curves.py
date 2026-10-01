# Generate fluid curves SVG meticulously aligned with Frame 26
svg_code = '''<svg viewBox="0 0 1440 660" fill="none" xmlns="http://www.w3.org/2000/svg" class="fluid-curves-svg" preserveAspectRatio="xMaxYMin meet">
  <defs>
    <!-- Soft sheer watercolor washes in the loops between the curves -->
    <linearGradient id="fluid-loop-wash-1" x1="20%" y1="100%" x2="80%" y2="0%">
      <stop offset="0%" stop-color="#94a9bc" stop-opacity="0.14" />
      <stop offset="50%" stop-color="#8e9e9a" stop-opacity="0.10" />
      <stop offset="100%" stop-color="#94a9bc" stop-opacity="0.06" />
    </linearGradient>

    <linearGradient id="fluid-loop-wash-2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8e9e9a" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#94a9bc" stop-opacity="0.06" />
    </linearGradient>
  </defs>

  <!-- Soft Warm Architectural Band matching Frame 26 -->
  <rect x="130" y="415" width="1180" height="120" rx="10" fill="#f7f4ee" opacity="0.85" />

  <!-- Loop 1 Soft Translucent Wash (Enclosed between Blue and Grey lines) -->
  <path d="M 915,445
           C 955,395 1015,245 1085,228
           C 1125,218 1152,215 1172,216
           C 1140,240 1090,290 1045,335
           C 985,395 935,432 915,445 Z"
        fill="url(#fluid-loop-wash-1)" />

  <!-- Loop 2 Soft Translucent Wash (Upper crossover loop) -->
  <path d="M 1172,216
           C 1198,205 1242,205 1285,112
           C 1260,145 1215,195 1172,216 Z"
        fill="url(#fluid-loop-wash-2)" />

  <!-- Slate-Blue Fluid Strand (Design) -->
  <path d="M 270,488 
           C 360,446 445,430 535,434 
           C 640,438 735,472 825,472
           C 868,472 895,462 915,445
           C 960,408 1020,242 1085,228
           C 1130,218 1190,216 1245,222
           C 1276,225 1296,172 1316,112
           C 1336,52 1362,32 1388,18"
        stroke="#94a9bc" 
        stroke-width="3.5" 
        stroke-linecap="round" 
        stroke-linejoin="round" />

  <!-- Sage-Grey Fluid Strand (Code) -->
  <path d="M 775,535 
           C 820,532 865,518 892,482
           C 903,466 908,454 915,445
           C 945,368 970,322 1010,308
           C 1060,292 1120,248 1172,216
           C 1222,172 1265,132 1285,112
           C 1315,72 1360,42 1415,18"
        stroke="#8e9e9a" 
        stroke-width="3.5" 
        stroke-linecap="round" 
        stroke-linejoin="round" />
</svg>
'''

with open("public/assets/images/fluid-curves.svg", "w") as f:
    f.write(svg_code)
print("Successfully generated public/assets/images/fluid-curves.svg")
