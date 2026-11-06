/* One editable source for scene placements, artwork and hotspots.
Each grid placement is [x,y,width,height] in zero-based cells; hotspot bounds are [x,y,w,h] percentages of artwork viewBox.
The occupancy mask appears in layout debugging only and never clips the artwork. */
window.GROUPJECTS = [
  {
    "id": "retro",
    "title": "Retro graphics",
    "asset": "groupjects/assets/retro.svg",
    "aspect": 1.1764705882352942,
    "wide": [
      0,
      0,
      8,
      8
    ],
    "compact": [
      0,
      0,
      7,
      8
    ],
    "mobile": [
      0,
      1,
      12,
      12
    ],
    "mask": [
      ".######.",
      "########",
      "########",
      ".#######",
      ".######.",
      "########",
      "########",
      ".######."
    ],
    "screen": {
      "kind": "crt",
      "bounds": [
        20.8,
        15.6,
        50.1,
        34.6
      ],
      "heading": "C:\\TECHROTE\\ART",
      "cols": 2
    },
    "projects": [
      [
        "GlyphPaint",
        "glyphpaint/",
        "Hosted paint application"
      ],
      [
        "GlyphPoint",
        "glyphpoint/",
        "Hosted Unicode editor"
      ],
      [
        "ASCIIomium",
        "https://github.com/techrote/ASCIIomium",
        "Terminal art project source"
      ],
      [
        "PNGGPU",
        "https://github.com/techrote/PNGGPU",
        "GPU ANSI converter source"
      ],
      [
        "PlasmaTerm",
        "plasmaterm/",
        "Hosted plasma visualizer"
      ],
      [
        "PNG2ANSI",
        "PNG2ANSI-web.html",
        "Hosted image-to-ANSI converter"
      ],
      [
        "pyANSI",
        "projects/pyansi.html",
        "Python ANSI converter information"
      ]
    ]
  },
  {
    "id": "gaming",
    "title": "Games & simulations",
    "asset": "groupjects/assets/gaming.svg",
    "aspect": 1.1363636363636365,
    "wide": [
      8,
      0,
      10,
      8
    ],
    "compact": [
      7,
      0,
      8,
      8
    ],
    "mobile": [
      0,
      1,
      12,
      12
    ],
    "mask": [
      "#########.",
      "##########",
      "##########",
      "##########",
      ".#########",
      ".#########",
      "..########",
      ".#########"
    ],
    "screen": {
      "kind": "gaming",
      "bounds": [
        9,
        11.3,
        65.2,
        37.1
      ],
      "heading": "ACTIVE DISPLAYS",
      "cols": 1
    },
    "projects": [
      [
        "Relay Moth Beta",
        "relay_moth_beta/",
        "Playable hosted beta"
      ],
      [
        "XenoField",
        "xenofield/",
        "Live visual synthesis"
      ],
      [
        "CyberSand",
        "https://github.com/techrote/cybersand",
        "Simulation project source"
      ],
      [
        "Sandfall",
        "https://github.com/techrote/sandfall",
        "Simulation project source"
      ],
      [
        "SteelMoth",
        "https://github.com/techrote/steelmoth",
        "Rendering engine source"
      ]
    ],
    "hatch": {
      "bounds": [
        79.5,
        74.5,
        19.5,
        15.5
      ],
      "links": [
        [
          "Shattered Art Stash",
          "shattered-art-stash/"
        ],
        [
          "Signal Relics",
          "signal-relics/"
        ],
        [
          "Salvage Apparatus",
          "salvage-apparatus/"
        ],
        [
          "Salvage Arcade",
          "salvage-arcade/"
        ]
      ]
    }
  },
  {
    "id": "cad",
    "title": "CAD & design",
    "asset": "groupjects/assets/cad.svg",
    "aspect": 0.9655172413793104,
    "wide": [
      18,
      0,
      6,
      8
    ],
    "compact": [
      15,
      0,
      5,
      8
    ],
    "mobile": [
      0,
      1,
      12,
      12
    ],
    "mask": [
      ".####..",
      "######.",
      "######.",
      "######.",
      ".#####.",
      "...####",
      "..#####",
      ".######"
    ],
    "screen": {
      "kind": "cad",
      "bounds": [
        10,
        14,
        70.5,
        38.4
      ],
      "heading": "WORKSPACE / PART DESIGN",
      "cols": 1
    },
    "projects": [
      [
        "INTUIT3D",
        "https://github.com/techrote/INTUIT3D",
        "CAD workbench source"
      ],
      [
        "EdgeCraft",
        "edgecraft-stl.html",
        "Hosted STL editor"
      ],
      [
        "radiCADSAC",
        "https://github.com/techrote/radiCADSAC",
        "Machining research source"
      ]
    ]
  },
  {
    "id": "calculator",
    "title": "Calculators & physics",
    "asset": "groupjects/assets/calculator.svg",
    "aspect": 0.963855421686747,
    "wide": [
      1,
      8,
      7,
      6
    ],
    "compact": [
      1,
      8,
      6,
      6
    ],
    "mobile": [
      0,
      1,
      12,
      12
    ],
    "mask": [
      ".######.",
      "########",
      "########",
      "########",
      "########",
      "########",
      "########",
      ".######."
    ],
    "screen": {
      "kind": "calculator",
      "bounds": [
        22.5,
        13.4,
        53.2,
        27.7
      ],
      "heading": "SCIENTIFIC / INDEX",
      "cols": 1
    },
    "projects": [
      [
        "ThermoPipe",
        "thermopipe_parameter_suite.html",
        "Thermal engineering calculator"
      ],
      [
        "Brachistochrone",
        "brachistochrone-lab-v2.html",
        "Interactive physics experiment"
      ],
      [
        "Connection Lab",
        "connection-lab/",
        "Connection measurement experiment"
      ]
    ]
  },
  {
    "id": "paper",
    "title": "Notes & reference",
    "asset": "groupjects/assets/paper.svg",
    "aspect": 1.4473684210526316,
    "wide": [
      8,
      8,
      14,
      6
    ],
    "compact": [
      7,
      8,
      13,
      6
    ],
    "mobile": [
      0,
      1,
      12,
      12
    ],
    "mask": [
      "..########..",
      "############",
      "############",
      "############",
      "############",
      "..##########"
    ],
    "paperLinks": [
      [
        "scratchpad",
        "projects/scratchpad.html",
        [
          30,
          27,
          45,
          9
        ],
        "Archive and sketches"
      ],
      [
        "devref",
        "https://github.com/techrote/devref",
        [
          33,
          41,
          34,
          9
        ],
        "Development reference"
      ],
      [
        "project sources",
        "https://github.com/techrote",
        [
          31,
          55,
          43,
          9
        ],
        "GitHub profile and repositories"
      ]
    ]
  }
];
