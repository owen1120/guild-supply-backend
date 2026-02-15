const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const productsData = [
    {
    "id": "PROD_001_A_JKT",
    "createdAt": "2025-12-01T09:00:00Z",
    "updatedAt": "2025-12-05T14:30:00Z",
    "isPublished": true,
    
    "title": "[SSR] Wilderness Pioneer Bushcraft Jacket", 
    "brand": "Guild Masterworks",
    "description": "<h3>📜 Equipment Legend</h3><p>Forged for the vanguard explorers venturing into the <strong>Uncharted Regions</strong>. This armor fuses the concealment of <em>Forest Green</em> with the high visibility of <em>Terracotta Orange</em>—balancing stealth with team safety.</p><p>Whether you are executing a camp survival task or navigating urban ruins, its rugged tailoring provides a significant <strong>[DEF]</strong> boost. This is not just a jacket; it is your second mobile inventory.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Dual-Tone Aesthetics:</strong> A tribute to the golden age of vintage workwear.</li><li><strong>4D Pocket Space:</strong> Four large bellows pockets max out your carrying capacity.</li><li><strong>Environmental Shielding:</strong> Articulated hood and cuffs seal out the cold.</li></ul>", 
    "category": "Apparel", 
    
    "price": 12800,
    "stock": 15,
    "sku": "A-JKT-G01-FGL",
    
    "rarity": "SSR",
    "def": 85,
    "agi": 40,
    "res": 95,
    
    "ribbons": ["New Arrival", "Staff Pick", "SSR"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Paint Options",
      "values": ["Forest Green / Orange", "Midnight Black"]
    },
    {
      "id": "opt_size",
      "name": "Size Selection",
      "values": ["S", "M", "L", "XL", "XXL"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_tech",
      "title": "Material Tech",
      "content": "Guild-Tex Pro 3L (Waterproof Rating: 20,000mm)"
    },
    {
      "id": "sec_care",
      "title": "Maintenance",
      "content": "Machine wash warm (40°C). Double rinse. Do not bleach."
    }
    ],
    
    "images": [
    {
      "id": "img_001_01",
      "url": "https://cdn.hwcc0321.com/Guild%20Supply/PROD_001_A_JKT_01.webp",
      "isPrimary": true,
      "altText": "Wilderness Pioneer Jacket - Front View"
    },
    {
      "id": "img_001_02",
      "url": "https://cdn.hwcc0321.com/Guild%20Supply/PROD_001_A_JKT_02.webp",
      "isPrimary": false,
      "altText": "Bellows Pocket Detail"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Polar-specific",
      "Heavy equipment",
      "Bushcraft",
      "Waterproof"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SSR] Wilderness Pioneer Jacket - Guild Supply",
    "metaDescription": "High-defense bushcraft jacket with dual-tone design. Perfect for alpine and forest exploration. Features 4D pockets and high waterproof rating.",
    "slug": "ssr-wilderness-pioneer-bushcraft-jacket"
    }
    },
    {
    "id": "PROD_002_C_RUN",
    "createdAt": "2025-12-02T11:00:00Z",
    "updatedAt": "2025-12-05T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Zephyr-7 Ultralight Trail Runner",
    "brand": "Salomon",
    "description": "<h3>📜 Equipment Legend</h3><p>Engineered for the <strong>Speedrunners</strong> of the guild. The Zephyr-7 strips away all excess weight, leaving only pure propulsion. Its geometry is designed to dodge obstacles rather than withstand them.</p><p>Wearing this grants a massive <strong>[AGI]</strong> buff, allowing you to traverse technical terrain like a gust of wind. Perfect for single-day assaults or FKT challenges.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Zero-G Mesh:</strong> Upper material so light it feels like wearing nothing but air.</li><li><strong>Energy Return Core:</strong> Carbon plate infusion converts impact energy into forward momentum.</li><li><strong>Claw Grip:</strong> Aggressive lug pattern bites into loose gravel and mud.</li></ul>",
    "category": "Apparel",
    
    "price": 5800,
    "stock": 24,
    "sku": "C-RUN-S07-NY09",
    
    "rarity": "SR",
    "def": 30,
    "agi": 98,
    "res": 50,
    
    "ribbons": ["Speedrun Choice", "Lightweight"],
    
    "options": [
    {
    "id": "opt_color",
    "name": "Color",
    "values": ["Neon Yellow", "Phantom Black"]
    },
    {
    "id": "opt_size",
    "name": "Size (US)",
    "values": ["8", "8.5", "9", "9.5", "10", "10.5", "11"]
    }
    ],
    
    "sections": [
    {
    "id": "sec_tech",
    "title": "Outsole Tech",
    "content": "Contagrip® TA (Mud & Loose Surface Specialized)"
    },
    {
    "id": "sec_spec",
    "title": "Drop / Weight",
    "content": "Drop: 4mm | Weight: 210g (Size US9)"
    }
    ],
    
    "images": [
    {
    "id": "img_002_01",
    "url": "https://cdn.guildsupply.com/products/prod_002_side.jpg",
    "isPrimary": true,
    "altText": "Zephyr-7 Trail Runner - Neon Yellow Side View"
    },
    {
    "id": "img_002_02",
    "url": "https://cdn.guildsupply.com/products/prod_002_sole.jpg",
    "isPrimary": false,
    "altText": "Aggressive Lug Pattern Detail"
    },
    {
    "id": "img_002_03",
    "url": "https://cdn.guildsupply.com/products/prod_002_action.jpg",
    "isPrimary": false,
    "altText": "Action Shot on Trail"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
    "Speedrun",
    "Ultralight",
    "Breathable",
    "Trail Running"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
    "value": 0,
    "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
    "type": "NO_RESTRICTION",
    "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Zephyr-7 Ultralight Trail Runner - Guild Supply",
    "metaDescription": "Top-tier agility footwear for trail running and speed hiking. Features carbon plate technology and aggressive traction. Weight: 210g.",
    "slug": "sr-zephyr-7-ultralight-trail-runner"
    }
    },
    {
    "id": "PROD_003_D_BAG",
    "createdAt": "2025-12-03T08:00:00Z",
    "updatedAt": "2025-12-05T14:30:00Z",
    "isPublished": true,
    
    "title": "[SSR] Terraframe 65 \"Titan\" Expedition Pack",
    "brand": "Mystery Ranch",
    "description": "<h3>📜 Equipment Legend</h3><p>A mobile fortress for the <strong>Heavyweight Class</strong> adventurer. The \"Titan\" is built around the legendary Guide Light MT™ Frame, an exoskeleton capable of stabilizing massive loads that would crush a lesser adventurer.</p><p>Its unique <strong>Overload® Feature</strong> allows you to expand the frame to carry awkward quest items—be it firewood, elk quarters, or a backup generator—without occupying the main inventory slots. Equip this to maximize your carrying capacity.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Overload Shelf:</strong> Secret expansion slot between the frame and bag for hauling extra gear.</li><li><strong>3-ZIP Design:</strong> Rapid access to any item in the main compartment. No more digging.</li><li><strong>Cordura® Armor:</strong> 330D Lite Plus CORDURA® fabric offers S-tier abrasion resistance <strong>[DEF]</strong>.</li></ul>",
    "category": "Apparel",
    
    "price": 16500,
    "stock": 8,
    "sku": "D-BAG-M03-DE65",
    
    "rarity": "SSR",
    "def": 95,
    "agi": 15,
    "res": 80,
    
    "ribbons": ["Heavy Duty", "Expedition Class"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Color",
      "values": ["Deep Earth", "Lichen Green"]
    },
    {
      "id": "opt_size",
      "name": "Torso Size",
      "values": ["S", "M", "L", "XL"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_frame",
      "title": "Suspension System",
      "content": "Guide Light MT™ Frame (Carbon Fiber stays)"
    },
    {
      "id": "sec_cap",
      "title": "Volume / Weight",
      "content": "65 Liters (Expandable) | 2.6 kg"
    }
    ],
    
    "images": [
    {
      "id": "img_003_01",
      "url": "https://cdn.guildsupply.com/products/prod_003_hero.jpg",
      "isPrimary": true,
      "altText": "Terraframe 65 Titan - Deep Earth Color"
    },
    {
      "id": "img_003_02",
      "url": "https://cdn.guildsupply.com/products/prod_003_overload.jpg",
      "isPrimary": false,
      "altText": "Overload Shelf Deployment Mode"
    },
    {
      "id": "img_003_03",
      "url": "https://cdn.guildsupply.com/products/prod_003_yoke.jpg",
      "isPrimary": false,
      "altText": "Adjustable Yoke Detail"
    }
    ],
    
    "videos": [
    {
      "id": "vid_003_01",
      "url": "https://cdn.guildsupply.com/products/prod_003_demo.mp4",
      "thumbnail_url": "https://cdn.guildsupply.com/products/prod_003_vid_thumb.jpg"
    }
    ],
    
    "rpgDetails": {
    "tags": [
      "Expedition",
      "Heavy Load",
      "Storage Expansion",
      "Multi-day"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": true,
    "shippingMessage": "Restocking soon. Estimated dispatch: 14 days.",
    "restriction": {
      "type": "LIMITED_TO",
      "limitQuantity": 2
    }
    },
    
    "seo": {
    "metaTitle": "[SSR] Terraframe 65 Expedition Backpack - Guild Supply",
    "metaDescription": "The ultimate load-hauling backpack with Overload® shelf feature. 65L capacity for multi-day expeditions. Built with Cordura for maximum durability.",
    "slug": "ssr-terraframe-65-titan-backpack"
    }
    },
    {
    "id": "PROD_004_E_TNT",
    "createdAt": "2025-12-04T14:00:00Z",
    "updatedAt": "2025-12-05T14:30:00Z",
    "isPublished": true,
    
    "title": "[SSR] Hilleberg Jannu \"Alpine Fortress\"",
    "brand": "Hilleberg",
    "description": "<h3>📜 Equipment Legend</h3><p>A portable sanctuary designed for the harshest <strong>High-Altitude Environments</strong>. The Jannu is not merely a tent; it is a fortress capable of withstanding gale-force winds and heavy snow loads that would flatten lesser shelters.</p><p>Crafted with the legendary <em>Kerlon 1200</em> fabric, it offers the highest tier of <strong>[RES]</strong> against the elements. Its self-supporting dome structure ensures that even on narrow ledges or rocky terrain, your party remains secure.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Kerlon 1200 Armor:</strong> Silicone-coated fabric with a tear strength of 12kg. Virtually indestructible in normal use.</li><li><strong>Geodesic Dome:</strong> Multiple pole crossing points create a lattice of strength to handle snow loading.</li><li><strong>Ventilation System:</strong> Roof vent ensures oxygen flow even when buried in snow.</li></ul>",
    "category": "Apparel",
    
    "price": 36800,
    "stock": 5,
    "sku": "E-TNT-H01-RD02",
    
    "rarity": "SSR",
    "def": 90,
    "agi": 20,
    "res": 100,
    
    "ribbons": ["King of Tents", "4-Season"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Color",
      "values": ["Hilleberg Red", "Stealth Green", "Sand"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_mat",
      "title": "Fabric Spec",
      "content": "Kerlon 1200 (30D High Tenacity Ripstop Nylon)"
    },
    {
      "id": "sec_dim",
      "title": "Dimensions",
      "content": "Inner Area: 3.3 m² | Height: 100 cm | Weight: 3.2 kg"
    }
    ],
    
    "images": [
    {
      "id": "img_004_01",
      "url": "https://cdn.guildsupply.com/products/prod_004_red.jpg",
      "isPrimary": true,
      "altText": "Hilleberg Jannu - Signature Red"
    },
    {
      "id": "img_004_02",
      "url": "https://cdn.guildsupply.com/products/prod_004_interior.jpg",
      "isPrimary": false,
      "altText": "Interior Layout (2 Person)"
    },
    {
      "id": "img_004_03",
      "url": "https://cdn.guildsupply.com/products/prod_004_snow.jpg",
      "isPrimary": false,
      "altText": "Field Test in Heavy Snow"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Alpine",
      "Expedition",
      "4-Season",
      "Stormproof"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": true,
    "shippingMessage": "High demand item. Pre-order recommended.",
    "restriction": {
      "type": "LIMITED_TO",
      "limitQuantity": 1
    }
    },
    
    "seo": {
    "metaTitle": "[SSR] Hilleberg Jannu 2-Person Tent - Guild Supply",
    "metaDescription": "The ultimate alpine climbing tent. Strong, lightweight, and stormproof. Built with Kerlon 1200 for 4-season protection.",
    "slug": "ssr-hilleberg-jannu-alpine-fortress"
    }
    },
    {
    "id": "PROD_005_E_LMP",
    "createdAt": "2025-12-05T09:00:00Z",
    "updatedAt": "2025-12-05T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Goal Zero Lighthouse Micro Flash \"Mana Crystal\"",
    "brand": "Goal Zero",
    "description": "<h3>📜 Equipment Legend</h3><p>A condensed shard of sunlight encased in a crystalline shell. This <strong>Pocket-Sized Beacon</strong> is essential for delving into the darkest dungeons or illuminating your base camp.</p><p>Despite its diminutive size, it emits a blinding 150-lumen flash, acting as a ward against the encroaching night. Its internal mana capacitor allows for infinite recharges via USB, ensuring you are never left in the dark.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Dual-Mode Emission:</strong> Switch instantly between a focused beam (Flashlight) and area-of-effect glow (Lantern).</li><li><strong>Infinite Mana Loop:</strong> Integrated USB connector means no cables required for recharging.</li><li><strong>IPX6 Shielding:</strong> Weather-resistant seal allows operation even during heavy rainstorms.</li></ul>",
    "category": "Apparel",
    
    "price": 1280,
    "stock": 100,
    "sku": "E-LMP-GZ1-CL00",
    
    "rarity": "SR",
    "def": 40,
    "agi": 95,
    "res": 70,
    
    "ribbons": ["Best Seller", "Compact"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Crystal Housing",
      "values": ["Standard Clear", "Japan Khaki Limited", "Flash Green"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_lumen",
      "title": "Lumens / Runtime",
      "content": "Max 150 Lumens | Up to 170 Hours (Low mode)"
    },
    {
      "id": "sec_spec",
      "title": "Weight / Dimensions",
      "content": "68g (Ultralight) | 93mm Length"
    }
    ],
    
    "images": [
    {
      "id": "img_005_01",
      "url": "https://cdn.guildsupply.com/products/prod_005_on.jpg",
      "isPrimary": true,
      "altText": "Goal Zero Micro Flash - Lantern Mode Active"
    },
    {
      "id": "img_005_02",
      "url": "https://cdn.guildsupply.com/products/prod_005_hand.jpg",
      "isPrimary": false,
      "altText": "Size Reference in Hand"
    },
    {
      "id": "img_005_03",
      "url": "https://cdn.guildsupply.com/products/prod_005_camp.jpg",
      "isPrimary": false,
      "altText": "Illuminating Tent at Night"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Lighting",
      "Ultralight",
      "Camp Essentials",
      "USB Rechargeable"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Goal Zero Lighthouse Micro Flash - Guild Supply",
    "metaDescription": "The ultimate ultralight camping lantern. 150 lumens, USB rechargeable, and waterproof. A pocket-sized essential for every adventurer.",
    "slug": "sr-goal-zero-lighthouse-micro-flash"
    }
    },
    {
    "id": "PROD_006_E_FIR",
    "createdAt": "2025-12-06T08:30:00Z",
    "updatedAt": "2025-12-06T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] SOTO WindMaster \"Vortex Core\" Stove",
    "brand": "SOTO",
    "description": "<h3>📜 Equipment Legend</h3><p>An alchemical heating unit designed to defy the gale. The \"Vortex Core\" utilizes a unique concave burner head to create a wind-shielding barrier, ensuring your flame remains stable even on exposed peaks.</p><p>Equipped with a <strong>Micro Regulator</strong>, it maintains consistent output regardless of dropping ambient temperatures. Essential for brewing stamina elixirs (coffee) or reconstituting rations rapidly.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Concave Shielding:</strong> The burner head sits below the rim, protecting the flame from side winds without extra windscreens.</li><li><strong>Micro Regulator System:</strong> Stabilizes internal pressure to provide consistent heat output in cold environments (-5°C).</li><li><strong>Stealth Ignition:</strong> Integrated Piezo igniter hidden inside the gas line to prevent impact damage.</li></ul>",
    "category": "Apparel",
    
    "price": 2890,
    "stock": 45,
    "sku": "E-FIR-S01-SV00",
    
    "rarity": "SR",
    "def": 60,
    "agi": 90,
    "res": 85,
    
    "ribbons": ["Guild Recommended", "Windproof"],
    
    "options": [
    {
      "id": "opt_kit",
      "name": "Configuration",
      "values": ["Standard Kit (4Flex)", "Minimalist (3Flex Only)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_output",
      "title": "Heat Output",
      "content": "2800 kcal/h (3260w) | Boils 500ml in 2:30 min"
    },
    {
      "id": "sec_weight",
      "title": "Weight",
      "content": "67g (Stove only) / 87g (with 4Flex pot support)"
    }
    ],
    
    "images": [
    {
      "id": "img_006_01",
      "url": "https://cdn.guildsupply.com/products/prod_006_flame.jpg",
      "isPrimary": true,
      "altText": "SOTO WindMaster - Active Flame"
    },
    {
      "id": "img_006_02",
      "url": "https://cdn.guildsupply.com/products/prod_006_folded.jpg",
      "isPrimary": false,
      "altText": "Compact Storage Mode"
    },
    {
      "id": "img_006_03",
      "url": "https://cdn.guildsupply.com/products/prod_006_cooking.jpg",
      "isPrimary": false,
      "altText": "Cooking in Windy Conditions"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Cooking",
      "Ultralight",
      "Winter Capable",
      "Windproof"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] SOTO WindMaster Stove OD-1RX - Guild Supply",
    "metaDescription": "The ultimate wind-resistant backpacking stove. Features micro regulator for cold weather performance. Ultralight design for alpine cooking.",
    "slug": "sr-soto-windmaster-vortex-core"
    }
    },
    {
    "id": "PROD_007_E_CKW",
    "createdAt": "2025-12-07T09:15:00Z",
    "updatedAt": "2025-12-07T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Snow Peak Titanium Trek 900 \"Mithril Pot\"",
    "brand": "Snow Peak",
    "description": "<h3>📜 Equipment Legend</h3><p>Forged from pure Japanese <strong>Mithril (Titanium)</strong>, this cooking vessel offers an impossible strength-to-weight ratio. It is feather-light in your pack but completely immune to the corruption of rust <strong>[RES]</strong>.</p><p>Designed for the solo adventurer, the main pot holds 900ml of liquid—perfect for boiling water for dehydrated rations or brewing morning coffee. The lid doubles as a frying pan for searing wild game.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Mithril Construction:</strong> Crafted from aerospace-grade titanium. Weighs only 175g—you won't even feel it in your inventory.</li><li><strong>Stacking System:</strong> Perfectly sized to stow a standard gas canister and a compact stove (like the WindMaster) inside.</li><li><strong>Thermal Coloration:</strong> Will develop a unique blue-purple patina after repeated exposure to flame, recording your journey.</li></ul>",
    "category": "Apparel",
    
    "price": 1850,
    "stock": 60,
    "sku": "E-CKW-S05-TI00",
    
    "rarity": "SR",
    "def": 70,
    "agi": 95,
    "res": 100,
    
    "ribbons": ["Ultralight", "Mithril Grade"],
    
    "options": [
    {
      "id": "opt_set",
      "name": "Material Finish",
      "values": ["Raw Titanium", "Anodized Blue (Limited)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_dim",
      "title": "Dimensions",
      "content": "Pot: 120x107mm | Pan: 128x39mm"
    },
    {
      "id": "sec_cap",
      "title": "Capacity",
      "content": "Pot: 900ml | Pan: 250ml"
    }
    ],
    
    "images": [
    {
      "id": "img_007_01",
      "url": "https://cdn.guildsupply.com/products/prod_007_set.jpg",
      "isPrimary": true,
      "altText": "Snow Peak Trek 900 Set"
    },
    {
      "id": "img_007_02",
      "url": "https://cdn.guildsupply.com/products/prod_007_stack.jpg",
      "isPrimary": false,
      "altText": "Stacking Example with Canister"
    },
    {
      "id": "img_007_03",
      "url": "https://cdn.guildsupply.com/products/prod_007_cooking.jpg",
      "isPrimary": false,
      "altText": "Cooking on Campfire"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Cookware",
      "Ultralight",
      "Titanium",
      "Solo Camp"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Snow Peak Titanium Trek 900 Cookset - Guild Supply",
    "metaDescription": "Ultralight titanium cookware for solo backpacking. 900ml capacity, rust-proof, and fits a gas canister inside. Weight: 175g.",
    "slug": "sr-snow-peak-titanium-trek-900"
    }
    },
    {
    "id": "PROD_008_E_FUR",
    "createdAt": "2025-12-08T10:00:00Z",
    "updatedAt": "2025-12-08T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Helinox Chair Zero \"Restoration Throne\"",
    "brand": "Helinox",
    "description": "<h3>📜 Equipment Legend</h3><p>A skeletal framework of ancient alloys that unfolds into a seat of power. The \"Restoration Throne\" is the lightest chair in the guild's inventory, weighing less than a standard potion flask (500ml water bottle).</p><p>Despite its featherweight status, its <strong>DAC Aluminum</strong> structure supports a fully armored warrior, keeping you elevated above the cold, wet ground to maximize <strong>[HP Recovery]</strong> speed during short rests.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>DAC Alloy Skeleton:</strong> Crafted from TH72M aluminum—the same material used in expedition-grade tent poles for superior strength-to-weight ratio.</li><li><strong>Levitation Design:</strong> sits 11 inches off the ground, isolating your lower body from ground chill.</li><li><strong>Instant Deployment:</strong> Internal shock-cord system allows the frame to self-assemble in seconds.</li></ul>",
    "category": "Apparel",
    
    "price": 3980,
    "stock": 30,
    "sku": "E-FUR-H02-BK00",
    
    "rarity": "SR",
    "def": 50,
    "agi": 95,
    "res": 80,
    
    "ribbons": ["Ultralight", "Award Winning"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Fabric Color",
      "values": ["Black", "Grey", "Sand", "White (Limited)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_spec",
      "title": "Weight / Capacity",
      "content": "490g (Chair only) | Load Capacity: 120kg"
    },
    {
      "id": "sec_dim",
      "title": "Packed Size",
      "content": "35 x 10 x 10 cm (Fits in side pockets)"
    }
    ],
    
    "images": [
    {
      "id": "img_008_01",
      "url": "https://cdn.guildsupply.com/products/prod_008_iso.jpg",
      "isPrimary": true,
      "altText": "Helinox Chair Zero - Black"
    },
    {
      "id": "img_008_02",
      "url": "https://cdn.guildsupply.com/products/prod_008_packed.jpg",
      "isPrimary": false,
      "altText": "Packed Size Comparison"
    },
    {
      "id": "img_008_03",
      "url": "https://cdn.guildsupply.com/products/prod_008_camp.jpg",
      "isPrimary": false,
      "altText": "Resting at Summit"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Furniture",
      "Ultralight",
      "Compact",
      "Recovery"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Helinox Chair Zero Ultralight Camping Chair - Guild Supply",
    "metaDescription": "The lightest camping chair on the market. Weighs only 490g but supports 120kg. Made with DAC aluminum alloy for maximum durability.",
    "slug": "sr-helinox-chair-zero-restoration-throne"
    }
    },
    {
    "id": "PROD_009_A_BAS",
    "createdAt": "2025-12-09T09:30:00Z",
    "updatedAt": "2025-12-09T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Smartwool Merino 250 \"Mana Regulator\" Crew",
    "brand": "Smartwool",
    "description": "<h3>📜 Equipment Legend</h3><p>The foundation of any adventurer's loadout. This \"inner armor\" is woven from the fleece of highland beasts (100% Merino Wool), granting it magical properties of temperature regulation.</p><p>It acts as a <strong>Mana Regulator</strong> for your body—trapping heat when you are idle, and venting moisture when you are in combat. Its natural enchantment repels the foul odors of the undead, allowing you to wear it for days without washing.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Thermostatic Weave:</strong> Interlock knit construction provides enhanced comfort, breathability, and thermoregulation.</li><li><strong>Odor Nullification:</strong> Natural wool fibers absorb odor-causing bacteria <strong>[RES]</strong>, keeping your stealth stats high.</li><li><strong>Shoulder Panels:</strong> Shoulder seams are rolled forward to prevent friction damage when equipping heavy backpacks.</li></ul>",
    "category": "Apparel",
    
    "price": 3800,
    "stock": 50,
    "sku": "A-BAS-SW1-CH00",
    
    "rarity": "SR",
    "def": 20,
    "agi": 80,
    "res": 90,
    
    "ribbons": ["Guild Essential", "100% Merino"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Color",
      "values": ["Charcoal Heather", "Deep Navy", "Olive Green"]
    },
    {
      "id": "opt_size",
      "name": "Size",
      "values": ["S", "M", "L", "XL"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_mat",
      "title": "Material Composition",
      "content": "100% Merino Wool (250g/m²)"
    },
    {
      "id": "sec_fit",
      "title": "Fit Type",
      "content": "Slim Fit (Next-to-skin)"
    }
    ],
    
    "images": [
    {
      "id": "img_009_01",
      "url": "https://cdn.guildsupply.com/products/prod_009_front.jpg",
      "isPrimary": true,
      "altText": "Smartwool Merino 250 - Charcoal Heather"
    },
    {
      "id": "img_009_02",
      "url": "https://cdn.guildsupply.com/products/prod_009_detail.jpg",
      "isPrimary": false,
      "altText": "Fabric Texture Detail"
    },
    {
      "id": "img_009_03",
      "url": "https://cdn.guildsupply.com/products/prod_009_layer.jpg",
      "isPrimary": false,
      "altText": "Layering Example"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Baselayer",
      "Merino Wool",
      "Winter Essential",
      "Odor Resistant"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Smartwool Merino 250 Baselayer Crew - Guild Supply",
    "metaDescription": "The ultimate base layer for cold weather. Made from 100% Merino wool for natural temperature regulation and odor resistance.",
    "slug": "sr-smartwool-merino-250-mana-regulator"
    }
    },
    {
    "id": "PROD_010_B_PNT",
    "createdAt": "2025-12-10T09:00:00Z",
    "updatedAt": "2025-12-10T14:30:00Z",
    "isPublished": true,
    
    "title": "[SSR] Fjällräven Vidda Pro \"Ironbark\" Tactical Trousers",
    "brand": "Fjällräven",
    "description": "<h3>📜 Equipment Legend</h3><p>Leg armor forged for the roughest terrain. Crafted from the legendary <strong>G-1000 Eco</strong> fabric, these trousers act as a second skin of iron bark, deflecting thorns, embers, and mosquito bites with ease.</p><p>Its unique <strong>\"Wax Enchantment\"</strong> system allows you to manually apply Greenland Wax to boost its <strong>[RES]</strong> (Water/Wind resistance) for winter quests, or wash it out for maximum <strong>[AGI]</strong> (Breathability) in summer.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>G-1000 Armor Plating:</strong> A dense weave of recycled polyester and organic cotton. Virtually indestructible against abrasion <strong>[High DEF]</strong>.</li><li><strong>Utility Holsters:</strong> Equipped with 6 tactical pockets, including an axe loop and map slot. Your tools are always within quick-draw range.</li><li><strong>Ventilation Vents:</strong> Side zippers allow for rapid heat dumping during high-intensity maneuvers.</li></ul>",
    "category": "Apparel",
    
    "price": 5600,
    "stock": 40,
    "sku": "B-PNT-F01-DK48",
    
    "rarity": "SSR",
    "def": 95,
    "agi": 60,
    "res": 70,
    
    "ribbons": ["Legendary Armor", "Waxable"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Camo Pattern",
      "values": ["Dark Olive", "Black", "Deep Forest / Laurel Green"]
    },
    {
      "id": "opt_size",
      "name": "Size (EU)",
      "values": ["44", "46", "48", "50", "52", "54"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_mat",
      "title": "Material",
      "content": "G-1000® Eco: 65% polyester, 35% cotton"
    },
    {
      "id": "sec_feat",
      "title": "Reinforcement",
      "content": "Double layers over knees"
    }
    ],
    
    "images": [
    {
      "id": "img_010_01",
      "url": "https://cdn.guildsupply.com/products/prod_010_front.jpg",
      "isPrimary": true,
      "altText": "Vidda Pro Trousers - Dark Olive"
    },
    {
      "id": "img_010_02",
      "url": "https://cdn.guildsupply.com/products/prod_010_pockets.jpg",
      "isPrimary": false,
      "altText": "Tactical Pocket Configuration"
    },
    {
      "id": "img_010_03",
      "url": "https://cdn.guildsupply.com/products/prod_010_wax.jpg",
      "isPrimary": false,
      "altText": "Waxing Process Demonstration"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Tactical",
      "Bushcraft",
      "G-1000",
      "Durable"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SSR] Fjällräven Vidda Pro Ventilated Trousers - Guild Supply",
    "metaDescription": "Durable trekking trousers with G-1000 Eco fabric. Features ventilation zippers and multiple pockets. Waxable for weather resistance.",
    "slug": "ssr-fjallraven-vidda-pro-ironbark"
    }
    },
    {
    "id": "PROD_011_E_SLP",
    "createdAt": "2025-12-11T08:00:00Z",
    "updatedAt": "2025-12-11T14:30:00Z",
    "isPublished": true,
    
    "title": "[SSR] NANGA Aurora Light 600DX \"Crimson Stasis\"",
    "brand": "NANGA",
    "description": "<h3>📜 Equipment Legend</h3><p>A portable hibernation unit forged by Japanese craftsmen. Unlike standard sleeping bags that fear moisture, the \"Crimson Stasis\" is armored with <strong>Aurora-Tex®</strong>, a proprietary waterproof-breathable shell that shields the precious down feathers from condensation and frost.</p><p>Filled with 600g of high-purity Spanish Duck Down (760FP), it traps your body heat in a stasis field, allowing you to maintain optimal core temperature even when the outside world drops to -11°C.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Aurora-Tex® Shell:</strong> 20-denier waterproof nylon. Eliminates the need for a separate bivy sack <strong>[High RES]</strong>.</li><li><strong>Trapezoid Box Baffles:</strong> Advanced internal structure prevents down migration and cold spots.</li><li><strong>Glow-in-Dark Zip:</strong> Zipper pulls equipped with phosphorescent parts for easy operation during night raids.</li></ul>",
    "category": "Apparel",
    
    "price": 13800,
    "stock": 12,
    "sku": "E-SLP-N01-RD00",
    
    "rarity": "SSR",
    "def": 85,
    "agi": 40,
    "res": 95,
    
    "ribbons": ["Made in Japan", "Waterproof Down"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Shell Color",
      "values": ["Red", "Black", "Turquoise", "Coyote Brown"]
    },
    {
      "id": "opt_size",
      "name": "Length",
      "values": ["Regular (178cm)", "Long (185cm)", "Short (165cm)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_temp",
      "title": "Temperature Rating",
      "content": "Comfort: -4°C | Limit: -11°C | Extreme: -30°C"
    },
    {
      "id": "sec_fill",
      "title": "Insulation",
      "content": "Spanish Duck Down 90-10% (760 Fill Power)"
    }
    ],
    
    "images": [
    {
      "id": "img_011_01",
      "url": "https://cdn.guildsupply.com/products/prod_011_red.jpg",
      "isPrimary": true,
      "altText": "NANGA Aurora Light 600DX - Red"
    },
    {
      "id": "img_011_02",
      "url": "https://cdn.guildsupply.com/products/prod_011_texture.jpg",
      "isPrimary": false,
      "altText": "Aurora-Tex Fabric Detail"
    },
    {
      "id": "img_011_03",
      "url": "https://cdn.guildsupply.com/products/prod_011_packed.jpg",
      "isPrimary": false,
      "altText": "Compression Sack Size"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Sleeping Bag",
      "Winter",
      "Down",
      "Waterproof"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": true,
    "shippingMessage": "Handmade in Japan. Lead time: 3 weeks.",
    "restriction": {
      "type": "LIMITED_TO",
      "limitQuantity": 1
    }
    },
    
    "seo": {
    "metaTitle": "[SSR] NANGA Aurora Light 600DX Sleeping Bag - Guild Supply",
    "metaDescription": "Premium waterproof down sleeping bag made in Japan. 760FP down with Aurora-Tex shell. Comfort rating -4°C for winter camping.",
    "slug": "ssr-nanga-aurora-light-600dx-crimson-stasis"
    }
    },
    {
    "id": "PROD_012_E_PAD",
    "createdAt": "2025-12-12T08:00:00Z",
    "updatedAt": "2025-12-12T14:30:00Z",
    "isPublished": true,
    
    "title": "[SSR] Therm-a-Rest NeoAir XTherm NXT \"Magma Mat\"",
    "brand": "Therm-a-Rest",
    "description": "<h3>📜 Equipment Legend</h3><p>The ultimate barrier between you and the frozen void. The \"Magma Mat\" utilizes the proprietary <strong>Triangular Core Matrix™</strong> to create a complex lattice of air cells that traps heat and reflects it back to your body.</p><p>With an astronomical <strong>R-Value of 7.3</strong>, it provides the warmth of a heated floor even when sleeping on glaciers. Yet, when the magic is dispelled (deflated), it shrinks to the size of a water bottle.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>ThermaCapture™ Technology:</strong> Internal reflective layers radiate radiant heat back to the user without the weight of down or synthetic fills.</li><li><strong>70D Nylon Base:</strong> The underside is reinforced with thicker armor to prevent punctures from sharp rocks or ice shards <strong>[DEF]</strong>.</li><li><strong>WingLock™ Valve:</strong> One-way inflation valve allows for rapid deployment (inflation) and instant extraction (deflation).</li></ul>",
    "category": "Apparel",
    
    "price": 8600,
    "stock": 25,
    "sku": "E-PAD-T01-GY00",
    
    "rarity": "SSR",
    "def": 65,
    "agi": 95,
    "res": 100,
    
    "ribbons": ["Highest R-Value", "Ultralight"],
    
    "options": [
    {
      "id": "opt_size",
      "name": "Size",
      "values": ["Regular (R)", "Regular Wide (RW)", "Large (L)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_rval",
      "title": "Insulation Power",
      "content": "R-Value: 7.3 (Best-in-class weight-to-warmth ratio)"
    },
    {
      "id": "sec_spec",
      "title": "Dimensions / Weight",
      "content": "Regular: 183x51x7.6cm | 439g"
    }
    ],
    
    "images": [
    {
      "id": "img_012_01",
      "url": "https://cdn.guildsupply.com/products/prod_012_top.jpg",
      "isPrimary": true,
      "altText": "NeoAir XTherm NXT - Top View"
    },
    {
      "id": "img_012_02",
      "url": "https://cdn.guildsupply.com/products/prod_012_valve.jpg",
      "isPrimary": false,
      "altText": "WingLock Valve Detail"
    },
    {
      "id": "img_012_03",
      "url": "https://cdn.guildsupply.com/products/prod_012_pack.jpg",
      "isPrimary": false,
      "altText": "Packed Size Comparison"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Sleeping Pad",
      "Winter",
      "Ultralight",
      "High R-Value"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SSR] Therm-a-Rest NeoAir XTherm NXT Sleeping Pad - Guild Supply",
    "metaDescription": "The warmest ultralight sleeping pad ever made. R-Value 7.3 for extreme cold. Features WingLock valve and durable 70D bottom.",
    "slug": "ssr-therm-a-rest-neoair-xtherm-nxt"
    }
    },
    {
    "id": "PROD_013_E_KNF",
    "createdAt": "2025-12-13T09:00:00Z",
    "updatedAt": "2025-12-13T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Morakniv Garberg \"Black Carbon Fang\"",
    "brand": "Morakniv",
    "description": "<h3>📜 Equipment Legend</h3><p>The strongest blade ever forged by the Swedish smiths of Mora. The \"Black Carbon Fang\" features a <strong>Full Tang</strong> construction, meaning the high-carbon steel runs the entire length of the handle. It is virtually unbreakable.</p><p>The spine is ground to a sharp 90-degree angle, designed specifically to strike sparks from a ferro rod, allowing you to cast [Fire] magic without matches. A quintessential sidearm for any Bushcraft practitioner.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Carbon Steel Edge:</strong> Hardened carbon steel offers superior edge retention and sharpness compared to stainless variants. Requires oil maintenance to prevent rust.</li><li><strong>90° Spine Grinding:</strong> Perfect compatibility with fire starters (Fire Steel) for rapid ignition.</li><li><strong>Indestructible Grip:</strong> Polyamide handle withstands extreme impact and cold temperatures without cracking.</li></ul>",
    "category": "Apparel",
    
    "price": 3200,
    "stock": 60,
    "sku": "E-KNF-M01-CB00",
    
    "rarity": "SR",
    "def": 98,
    "agi": 75,
    "res": 40,
    
    "ribbons": ["Full Tang", "Survival Choice"],
    
    "options": [
    {
      "id": "opt_sheath",
      "name": "Sheath Type",
      "values": ["Leather Sheath (Classic)", "Multi-Mount (Tactical)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_spec",
      "title": "Blade Specs",
      "content": "Length: 109mm | Thickness: 3.2mm | Steel: High Carbon"
    },
    {
      "id": "sec_weight",
      "title": "Weight",
      "content": "272g (Including Sheath)"
    }
    ],
    
    "images": [
    {
      "id": "img_013_01",
      "url": "https://cdn.guildsupply.com/products/prod_013_blade.jpg",
      "isPrimary": true,
      "altText": "Morakniv Garberg BlackBlade Detail"
    },
    {
      "id": "img_013_02",
      "url": "https://cdn.guildsupply.com/products/prod_013_fire.jpg",
      "isPrimary": false,
      "altText": "Striking Sparks with Spine"
    },
    {
      "id": "img_013_03",
      "url": "https://cdn.guildsupply.com/products/prod_013_sheath.jpg",
      "isPrimary": false,
      "altText": "Leather Sheath Configuration"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Survival Knife",
      "Bushcraft",
      "Full Tang",
      "Carbon Steel"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Morakniv Garberg Carbon Steel Knife - Guild Supply",
    "metaDescription": "The ultimate full-tang bushcraft knife. High carbon steel blade with 90-degree spine for fire starting. Includes durable sheath.",
    "slug": "sr-morakniv-garberg-black-carbon"
    }
    },
    {
    "id": "PROD_014_E_TOL",
    "createdAt": "2025-12-14T10:00:00Z",
    "updatedAt": "2025-12-14T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Leatherman Wave+ \"Artificer's Omni-Tool\"",
    "brand": "Leatherman",
    "description": "<h3>📜 Equipment Legend</h3><p>The quintessential artifact for the guild's engineers and rogues. This compact unit transforms into 18 different tools, acting as a skeleton key for the physical world. Whether you need to repair a damaged stove, tighten a trekking pole, or cut through wire traps, the Wave+ is the answer.</p><p>Upgraded with <strong>Replaceable Wire Cutters</strong>, it ensures that even if you damage the jaws on a heavy-duty quest, you can swap them out and keep the tool running forever.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>One-Hand Operable:</strong> All locking blades can be deployed with a single hand, keeping your other hand free for combat or climbing.</li><li><strong>18-in-1 Arsenal:</strong> Includes pliers, wire cutters, knives (serrated & plain), saw, scissors, files, and drivers.</li><li><strong>Bit Kit Compatible:</strong> Can be upgraded with the Bit Kit set to drive almost any screw type known to man.</li></ul>",
    "category": "Apparel",
    
    "price": 3980,
    "stock": 35,
    "sku": "E-TOL-L01-SS00",
    
    "rarity": "SR",
    "def": 90,
    "agi": 60,
    "res": 85,
    
    "ribbons": ["18 Tools", "EDC Classic"],
    
    "options": [
    {
      "id": "opt_finish",
      "name": "Finish",
      "values": ["Stainless Steel", "Black Oxide"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_tools",
      "title": "Tool Count",
      "content": "18 Tools (Including Pliers, Saw, Scissors)"
    },
    {
      "id": "sec_spec",
      "title": "Material / Weight",
      "content": "420HC Stainless Steel | 241g"
    }
    ],
    
    "images": [
    {
      "id": "img_014_01",
      "url": "https://cdn.guildsupply.com/products/prod_014_open.jpg",
      "isPrimary": true,
      "altText": "Leatherman Wave+ Fully Deployed"
    },
    {
      "id": "img_014_02",
      "url": "https://cdn.guildsupply.com/products/prod_014_pliers.jpg",
      "isPrimary": false,
      "altText": "Replaceable Wire Cutters Detail"
    },
    {
      "id": "img_014_03",
      "url": "https://cdn.guildsupply.com/products/prod_014_hand.jpg",
      "isPrimary": false,
      "altText": "One-hand Opening Action"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Multi-tool",
      "EDC",
      "Repair Kit",
      "18 Tools"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Leatherman Wave+ Multi-Tool - Guild Supply",
    "metaDescription": "The best-selling multi-tool of all time. Features 18 tools including replaceable wire cutters and one-hand opening blades. 25-year warranty.",
    "slug": "sr-leatherman-wave-plus-omni-tool"
    }
    },
    {
    "id": "PROD_015_E_WAT",
    "createdAt": "2025-12-15T09:00:00Z",
    "updatedAt": "2025-12-15T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Sawyer Squeeze \"Purification Scepter\"",
    "brand": "Sawyer",
    "description": "<h3>📜 Equipment Legend</h3><p>A magical artifact capable of transmuting corrupted sludge into the Elixir of Life. The \"Scepter\" uses hollow-fiber membrane technology derived from kidney dialysis to physically filter out 99.99999% of bacteria and protozoa.</p><p>With a lifespan of 100,000 gallons, it will likely outlast your adventuring career. Screw it onto a standard potion bottle (Smartwater bottle) or drink directly from the source to neutralize <strong>[Poison]</strong> status risks.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>0.1 Micron Barrier:</strong> Physical filtration pore size is so small that Salmonell, Cholera, and Giardia cannot pass through <strong>[Max RES]</strong>.</li><li><strong>Backflush Capable:</strong> When flow rate slows, simply backflush with the included syringe to restore it to full power. No replacement cartridges needed.</li><li><strong>Universal Threading:</strong> Compatible with most standard 28mm disposable bottles found in the ruins of civilization.</li></ul>",
    "category": "Apparel",
    
    "price": 1650,
    "stock": 80,
    "sku": "E-WAT-S01-STD0",
    
    "rarity": "SR",
    "def": 20,
    "agi": 90,
    "res": 100,
    
    "ribbons": ["Thru-Hiker Favorite", "Lifetime Warranty"],
    
    "options": [
    {
      "id": "opt_kit",
      "name": "Kit Version",
      "values": ["Standard (2 Pouches)", "Minimalist (Filter Only)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_eff",
      "title": "Filtration Spec",
      "content": "0.1 Micron Absolute | Removes 99.99999% Bacteria"
    },
    {
      "id": "sec_life",
      "title": "Lifespan / Weight",
      "content": "100,000 Gallons | 85g (3 oz)"
    }
    ],
    
    "images": [
    {
      "id": "img_015_01",
      "url": "https://cdn.guildsupply.com/products/prod_015_main.jpg",
      "isPrimary": true,
      "altText": "Sawyer Squeeze Filter System"
    },
    {
      "id": "img_015_02",
      "url": "https://cdn.guildsupply.com/products/prod_015_drink.jpg",
      "isPrimary": false,
      "altText": "Drinking Directly from Stream"
    },
    {
      "id": "img_015_03",
      "url": "https://cdn.guildsupply.com/products/prod_015_flush.jpg",
      "isPrimary": false,
      "altText": "Backflushing Maintenance"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Water Filter",
      "Ultralight",
      "Survival",
      "Health Safety"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Sawyer Squeeze Water Filtration System - Guild Supply",
    "metaDescription": "The gold standard for backcountry water filtration. Removes 99.99999% of bacteria and protozoa. Lightweight and rated for 100,000 gallons.",
    "slug": "sr-sawyer-squeeze-purification-scepter"
    }
    },
    {
    "id": "PROD_016_E_TCH",
    "createdAt": "2025-12-16T10:00:00Z",
    "updatedAt": "2025-12-16T14:30:00Z",
    "isPublished": true,
    
    "title": "[SSR] Garmin Instinct 2X Solar \"Tactical HUD\"",
    "brand": "Garmin",
    "description": "<h3>📜 Equipment Legend</h3><p>A wrist-mounted <strong>Heads-Up Display (HUD)</strong> powered by the sun itself. The Instinct 2X Solar features an oversized chemically strengthened screen that absorbs solar energy, theoretically providing <strong>Infinite Battery Life</strong> in outdoor environments.</p><p>Built to U.S. Military Standard 810 for thermal, shock, and water resistance. It grants the user access to [Stealth Mode] (cuts off all wireless comms) and [Night Vision] compatibility, ensuring you remain a ghost on the battlefield.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Solar Charging Lens:</strong> Converts sunlight into system mana. 3 hours of direct sunlight per day keeps it running indefinitely in smartwatch mode.</li><li><strong>Integrated Flashlight:</strong> A built-in multi-LED torch (Green/White) provides hands-free illumination for map reading or signaling.</li><li><strong>Multi-Band GNSS:</strong> Connects to GPS, GLONASS, and Galileo satellites simultaneously for pinpoint location tracking in deep canyons.</li></ul>",
    "category": "Apparel",
    
    "price": 16990,
    "stock": 20,
    "sku": "E-TCH-G01-BK00",
    
    "rarity": "SSR",
    "def": 90,
    "agi": 85,
    "res": 100,
    
    "ribbons": ["Solar Power", "Mil-Spec"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Tactical Color",
      "values": ["Black", "Coyote Tan", "Moss Green"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_bat",
      "title": "Battery Life",
      "content": "Smartwatch: Unlimited with Solar | GPS: 60 Hours"
    },
    {
      "id": "sec_spec",
      "title": "Durability",
      "content": "MIL-STD-810 | Water Rating: 10 ATM (100m)"
    }
    ],
    
    "images": [
    {
      "id": "img_016_01",
      "url": "https://cdn.guildsupply.com/products/prod_016_hero.jpg",
      "isPrimary": true,
      "altText": "Garmin Instinct 2X Solar Tactical - Black"
    },
    {
      "id": "img_016_02",
      "url": "https://cdn.guildsupply.com/products/prod_016_light.jpg",
      "isPrimary": false,
      "altText": "Built-in Flashlight Active"
    },
    {
      "id": "img_016_03",
      "url": "https://cdn.guildsupply.com/products/prod_016_solar.jpg",
      "isPrimary": false,
      "altText": "Solar Charging Graph Interface"
    }
    ],
    
    "videos": [
    {
      "id": "vid_016_01",
      "url": "https://cdn.guildsupply.com/products/prod_016_promo.mp4",
      "thumbnail_url": "https://cdn.guildsupply.com/products/prod_016_thumb.jpg"
    }
    ],
    
    "rpgDetails": {
    "tags": [
      "GPS Watch",
      "Tactical",
      "Solar Power",
      "Navigation"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SSR] Garmin Instinct 2X Solar Tactical Edition - Guild Supply",
    "metaDescription": "Rugged GPS smartwatch with infinite battery life via solar charging. Features built-in flashlight, tactical modes, and multi-band GNSS.",
    "slug": "ssr-garmin-instinct-2x-solar-tactical"
    }
    },
    {
    "id": "PROD_017_E_MED",
    "createdAt": "2025-12-17T09:00:00Z",
    "updatedAt": "2025-12-17T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] AMK Ultralight / Watertight .7 \"Field Medic Pack\"",
    "brand": "Adventure Medical Kits",
    "description": "<h3>📜 Equipment Legend</h3><p>A compact apothecary designed for 1-2 adventurers on missions up to 4 days. Unlike standard healing kits, this pack features a proprietary two-stage waterproofing system, ensuring your <strong>[Potions]</strong> and bandages remain viable even after submersion.</p><p>Contains critical supplies to treat common status effects: <strong>[Bleeding]</strong>, <strong>[Blisters]</strong>, and <strong>[Pain]</strong>. Do not venture into the dungeon without this insurance policy.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>DryFlex™ Bags:</strong> Inner waterproof liners keep medical supplies bone-dry inside the ultralight outer silnylon pouch <strong>[Max RES]</strong>.</li><li><strong>Blister Prevention:</strong> Includes die-cut Moleskin to treat hot spots on your feet before they become mobility-crippling wounds.</li><li><strong>Trauma Management:</strong> Equipped with precision forceps (tick removal/splinter extraction) and duct tape for gear repair or emergency bandaging.</li></ul>",
    "category": "Apparel",
    
    "price": 1450,
    "stock": 50,
    "sku": "E-MED-AMK-07-YL00",
    
    "rarity": "SR",
    "def": 10,
    "agi": 95,
    "res": 100,
    
    "ribbons": ["Waterproof", "Trauma Ready"],
    
    "options": [
    {
      "id": "opt_type",
      "name": "Kit Type",
      "values": ["Standard .7", "Pro .9 (Expanded Trauma)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_cap",
      "title": "Capacity",
      "content": "Group Size: 1-2 People | Trip Duration: 1-4 Days"
    },
    {
      "id": "sec_weight",
      "title": "Weight / Dimensions",
      "content": "227g (Ultralight) | 17 x 15 x 5 cm"
    }
    ],
    
    "images": [
    {
      "id": "img_017_01",
      "url": "https://cdn.guildsupply.com/products/prod_017_bag.jpg",
      "isPrimary": true,
      "altText": "AMK Ultralight Watertight .7 Kit"
    },
    {
      "id": "img_017_02",
      "url": "https://cdn.guildsupply.com/products/prod_017_contents.jpg",
      "isPrimary": false,
      "altText": "Full Medical Contents Spread"
    },
    {
      "id": "img_017_03",
      "url": "https://cdn.guildsupply.com/products/prod_017_dryflex.jpg",
      "isPrimary": false,
      "altText": "Inner DryFlex Waterproof Liners"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "First Aid",
      "Waterproof",
      "Survival",
      "Safety"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] AMK Ultralight Watertight .7 First Aid Kit - Guild Supply",
    "metaDescription": "Waterproof medical kit for 1-4 day trips. Includes blister treatment, bandages, and medication. Essential survival gear for hikers.",
    "slug": "sr-amk-ultralight-watertight-field-medic"
    }
    },
    {
    "id": "PROD_018_E_POL",
    "createdAt": "2025-12-18T09:00:00Z",
    "updatedAt": "2025-12-18T14:30:00Z",
    "isPublished": true,
    
    "title": "[SSR] Black Diamond Distance Carbon Z \"Phantom Limbs\"",
    "brand": "Black Diamond",
    "description": "<h3>📜 Equipment Legend</h3><p>Why walk on two legs when you can sprint on four? These carbon fiber extensions integrate seamlessly with your body, effectively reducing lower-body stamina consumption by 30%.</p><p>Forged from 100% carbon fiber, they are impossibly light. The patented <strong>Z-Pole Rapid Deployment System</strong> allows you to snap them into combat readiness in a single motion, like drawing a sword. Essential for speedrunners and heavy-load carriers alike.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>100% Carbon Construction:</strong> Weighs only ~140g per limb. You swing them faster than the eye can follow <strong>[High AGI]</strong>.</li><li><strong>Z-Fold Deployment:</strong> Collapses into three sections (like the letter Z) to fit inside your pack, then locks instantly with a single pull.</li><li><strong>EVA Foam Grip:</strong> Breathable grip material wicks away sweat, preventing slippage during intense boss fights (steep ascents).</li></ul>",
    "category": "Apparel",
    
    "price": 6200,
    "stock": 30,
    "sku": "E-POL-BD1-CZ10",
    
    "rarity": "SSR",
    "def": 40,
    "agi": 100,
    "res": 60,
    
    "ribbons": ["Ultralight", "Z-Pole Tech"],
    
    "options": [
    {
      "id": "opt_len",
      "name": "Length (Fixed)",
      "values": ["110 cm", "115 cm", "120 cm", "125 cm", "130 cm"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_weight",
      "title": "Weight Per Pair",
      "content": "284g (110cm) | 298g (120cm)"
    },
    {
      "id": "sec_len",
      "title": "Collapsed Length",
      "content": "33cm (110cm version) - Fits inside most daypacks"
    }
    ],
    
    "images": [
    {
      "id": "img_018_01",
      "url": "https://cdn.guildsupply.com/products/prod_018_pair.jpg",
      "isPrimary": true,
      "altText": "Black Diamond Distance Carbon Z Pair"
    },
    {
      "id": "img_018_02",
      "url": "https://cdn.guildsupply.com/products/prod_018_folded.jpg",
      "isPrimary": false,
      "altText": "Z-Fold Compact Mode"
    },
    {
      "id": "img_018_03",
      "url": "https://cdn.guildsupply.com/products/prod_018_grip.jpg",
      "isPrimary": false,
      "altText": "EVA Foam Grip Detail"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Trekking Poles",
      "Ultralight",
      "Carbon Fiber",
      "Trail Running"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SSR] Black Diamond Distance Carbon Z Trekking Poles - Guild Supply",
    "metaDescription": "The lightest Z-pole on the market. 100% carbon fiber construction for trail running and fastpacking. Rapid deployment system.",
    "slug": "ssr-black-diamond-distance-carbon-z-phantom-limbs"
    }
    },
    {
    "id": "PROD_019_C_SOC",
    "createdAt": "2025-12-19T09:00:00Z",
    "updatedAt": "2025-12-19T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Darn Tough Hiker \"Eternal Weave\" Micro Crew",
    "brand": "Darn Tough",
    "description": "<h3>📜 Equipment Legend</h3><p>The only piece of armor in the guild that possesses the legendary attribute: <strong>[Infinite Durability]</strong>. Forged in the mountains of Vermont, these socks are knit with such high density that they are virtually indestructible.</p><p>If you somehow manage to wear a hole in them through years of questing, the smiths (Darn Tough) will replace them for free. Forever. They also grant high resistance to the <strong>[Blister]</strong> status effect thanks to their performance fit.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Unconditional Lifetime Guarantee:</strong> No strings attached. You buy this item once, and you own it for life.</li><li><strong>High-Density Knitting:</strong> More stitches per inch means incredible durability and a fit that doesn't slip, bunch, or cause blisters.</li><li><strong>Merino Wool Blend:</strong> Naturally pulls moisture away from your skin and repels bacteria/odors even after days of use.</li></ul>",
    "category": "Apparel",
    
    "price": 950,
    "stock": 150,
    "sku": "C-SOC-D01-ON00",
    
    "rarity": "SR",
    "def": 100,
    "agi": 60,
    "res": 90,
    
    "ribbons": ["Lifetime Warranty", "Best Seller"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Color",
      "values": ["Onyx Black", "Olive", "Denim Blue"]
    },
    {
      "id": "opt_size",
      "name": "Size",
      "values": ["S", "M", "L", "XL"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_mat",
      "title": "Material",
      "content": "61% Merino Wool, 36% Nylon, 3% Lycra Spandex"
    },
    {
      "id": "sec_cushion",
      "title": "Cushion Level",
      "content": "Mid-level Cushion (Underfoot)"
    }
    ],
    
    "images": [
    {
      "id": "img_019_01",
      "url": "https://cdn.guildsupply.com/products/prod_019_pair.jpg",
      "isPrimary": true,
      "altText": "Darn Tough Micro Crew - Onyx"
    },
    {
      "id": "img_019_02",
      "url": "https://cdn.guildsupply.com/products/prod_019_detail.jpg",
      "isPrimary": false,
      "altText": "High Density Knitting Texture"
    },
    {
      "id": "img_019_03",
      "url": "https://cdn.guildsupply.com/products/prod_019_life.jpg",
      "isPrimary": false,
      "altText": "Lifestyle Shot on Trail"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Socks",
      "Lifetime Warranty",
      "Merino Wool",
      "Footwear"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Darn Tough Hiker Micro Crew Cushion Socks - Guild Supply",
    "metaDescription": "The most durable hiking socks on the planet. Backed by an unconditional lifetime guarantee. Made with Merino wool for blister prevention.",
    "slug": "sr-darn-tough-hiker-eternal-weave"
    }
    },
    {
    "id": "PROD_020_E_GLS",
    "createdAt": "2025-12-20T10:00:00Z",
    "updatedAt": "2025-12-20T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Oakley Sutro Lite \"Prizm Visor\"",
    "brand": "Oakley",
    "description": "<h3>📜 Equipment Legend</h3><p>A high-tech ocular implant (external) designed to hack your visual cortex. Equipped with the proprietary <strong>Prizm™ Lens Technology</strong>, it filters the light spectrum to dramatically enhance contrast and detail.</p><p>Wearing this grants a massive buff to <strong>[Perception]</strong>, allowing you to spot hidden roots, rocks, and changes in terrain texture before your feet even touch them. The wide field of view acts as a physical shield against wind, dust, and debris.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Prizm™ Trail Torch:</strong> Specifically tuned for forest and mountain environments. Turns dull browns and greens into vibrant, distinct layers.</li><li><strong>Unobtanium® Grip:</strong> Nose pads increase grip with perspiration. The harder you work, the more secure the visor becomes.</li><li><strong>Impact Protection:</strong> Lenses tested under extreme mass and high velocity to ensure uncompromised protection in chaotic combat zones.</li></ul>",
    "category": "Apparel",
    
    "price": 5800,
    "stock": 25,
    "sku": "E-GLS-O01-TR00",
    
    "rarity": "SR",
    "def": 45,
    "agi": 80,
    "res": 100,
    
    "ribbons": ["Prizm Tech", "High Impact"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Frame/Lens Combo",
      "values": ["Matte Black / Prizm Trail", "Matte Carbon / Prizm 24K", "White / Prizm Road"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_lens",
      "title": "Lens Tech",
      "content": "Prizm™ Trail Torch (Light Transmission: 35%)"
    },
    {
      "id": "sec_fit",
      "title": "Fit / Coverage",
      "content": "Wide - High Bridge Fit"
    }
    ],
    
    "images": [
    {
      "id": "img_020_01",
      "url": "https://cdn.guildsupply.com/products/prod_020_hero.jpg",
      "isPrimary": true,
      "altText": "Oakley Sutro Lite Sweep - Matte Black"
    },
    {
      "id": "img_020_02",
      "url": "https://cdn.guildsupply.com/products/prod_020_lens.jpg",
      "isPrimary": false,
      "altText": "Prizm Trail Lens View Simulation"
    },
    {
      "id": "img_020_03",
      "url": "https://cdn.guildsupply.com/products/prod_020_side.jpg",
      "isPrimary": false,
      "altText": "Side Profile with Unobtanium Grip"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Eyewear",
      "Prizm Technology",
      "UV Protection",
      "Trail Running"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Oakley Sutro Lite Prizm Sunglasses - Guild Supply",
    "metaDescription": "Performance eyewear with Prizm Trail technology. Enhances visibility in dirt and rocky environments. Impact resistant and lightweight.",
    "slug": "sr-oakley-sutro-lite-prizm-visor"
    }
    },
    {
    "id": "PROD_021_F_FOD",
    "createdAt": "2025-12-21T09:00:00Z",
    "updatedAt": "2025-12-21T14:30:00Z",
    "isPublished": true,
    
    "title": "[R] Satake Magic Rice \"Alchemical Rations\"",
    "brand": "Satake",
    "description": "<h3>📜 Equipment Legend</h3><p>Dehydrated grains processed via ancient preservation techniques. In their dry state, they are light as a feather, allowing you to stack multiple units in your inventory without encumbrance.</p><p>Upon contact with water (hot or cold), a transmutation reaction occurs, expanding the grains into a fluffy, caloric-dense meal in minutes. Essential for <strong>[Stamina Recovery]</strong> during boss battles or waiting out a storm in your tent.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Time Dilation Preservation:</strong> Hermetically sealed packaging grants a shelf life of 5 years <strong>[High RES]</strong>. Perfect for emergency caches.</li><li><strong>Dual-Mode Preparation:</strong> Can be prepared as standard rice (fill to red line) or porridge (fill to blue line) depending on your water supply and digestion needs.</li><li><strong>Thermal Activation:</strong> Ready in 15 minutes with hot water, or 60 minutes with cold water (stealth camping mode).</li></ul>",
    "category": "Apparel",
    
    "price": 180,
    "stock": 200,
    "sku": "F-FOD-S01-WH00",
    
    "rarity": "R",
    "def": 0,
    "agi": 80,
    "res": 100,
    
    "ribbons": ["5-Year Shelf Life", "Just Add Water"],
    
    "options": [
    {
      "id": "opt_flavor",
      "name": "Flavor Variant",
      "values": ["White Rice", "Gomoku (Vegetable Mix)", "Dry Curry", "Root Vegetable Rice"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_nutri",
      "title": "Nutrition / Energy",
      "content": "~380 kcal per pack | Carbs: 82g"
    },
    {
      "id": "sec_weight",
      "title": "Weight",
      "content": "Net: 100g | Rehydrated: 260g"
    }
    ],
    
    "images": [
    {
      "id": "img_021_01",
      "url": "https://cdn.guildsupply.com/products/prod_021_group.jpg",
      "isPrimary": true,
      "altText": "Satake Magic Rice Flavor Collection"
    },
    {
      "id": "img_021_02",
      "url": "https://cdn.guildsupply.com/products/prod_021_cooked.jpg",
      "isPrimary": false,
      "altText": "Rehydrated Curry Rice Detail"
    },
    {
      "id": "img_021_03",
      "url": "https://cdn.guildsupply.com/products/prod_021_step.jpg",
      "isPrimary": false,
      "altText": "Preparation Steps Infographic"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Emergency Food",
      "Ultralight",
      "5-Year Storage",
      "Consumable"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[R] Satake Magic Rice Emergency Food - Guild Supply",
    "metaDescription": "Japanese freeze-dried rice with 5-year shelf life. Lightweight camping food, ready in 15 minutes with hot water. Multiple flavors available.",
    "slug": "r-satake-magic-rice-alchemical-rations"
    }
    },
    {
    "id": "PROD_022_E_COF",
    "createdAt": "2025-12-22T09:00:00Z",
    "updatedAt": "2025-12-22T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Porlex Mini II \"Grindstone of Clarity\"",
    "brand": "Porlex",
    "description": "<h3>📜 Equipment Legend</h3><p>A precision instrument crafted in Kagoshima, designed to refine raw beans into a catalyst for the <strong>[Awakening]</strong> buff. Its ceramic burrs are harder than steel and impervious to rust, ensuring pure flavor extraction without metallic taint.</p><p>The compact cylinder is engineered to slot perfectly inside an AeroPress (sold separately), creating a stealthy coffee brewing system. Rotating the handle restores <strong>[Sanity Points]</strong> for the whole party before the day's march begins.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Ceramic Burrs:</strong> The grinding core will never rust and stays sharp indefinitely. Produces a consistent grind size from espresso (fine) to french press (coarse).</li><li><strong>Mithril Body:</strong> The stainless steel housing is robust enough to survive being dropped on dungeon floors <strong>[High DEF]</strong>.</li><li><strong>Silicone Grip:</strong> An integrated band provides torque leverage and holds the handle during transport to prevent rattling.</li></ul>",
    "category": "Apparel",
    
    "price": 2480,
    "stock": 40,
    "sku": "E-COF-P02-SS00",
    
    "rarity": "SR",
    "def": 85,
    "agi": 70,
    "res": 90,
    
    "ribbons": ["Made in Japan", "Barista Choice"],
    
    "options": [
    {
      "id": "opt_model",
      "name": "Model",
      "values": ["Mini II (Compact)", "Tall II (High Capacity)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_cap",
      "title": "Capacity",
      "content": "20g (Approx. 2 cups)"
    },
    {
      "id": "sec_dim",
      "title": "Dimensions / Weight",
      "content": "135mm Height | 266g"
    }
    ],
    
    "images": [
    {
      "id": "img_022_01",
      "url": "https://cdn.guildsupply.com/products/prod_022_stand.jpg",
      "isPrimary": true,
      "altText": "Porlex Mini II Grinder"
    },
    {
      "id": "img_022_02",
      "url": "https://cdn.guildsupply.com/products/prod_022_parts.jpg",
      "isPrimary": false,
      "altText": "Disassembled Ceramic Burrs"
    },
    {
      "id": "img_022_03",
      "url": "https://cdn.guildsupply.com/products/prod_022_hand.jpg",
      "isPrimary": false,
      "altText": "Grinding Action Shot"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Coffee Gear",
      "Stainless Steel",
      "Camp Kitchen",
      "Made in Japan"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Porlex Mini II Stainless Steel Coffee Grinder - Guild Supply",
    "metaDescription": "The best portable coffee grinder for camping. Made in Japan with ceramic burrs. Fits inside an AeroPress. Durable stainless steel body.",
    "slug": "sr-porlex-mini-ii-grindstone-of-clarity"
    }
    },
    {
    "id": "PROD_023_A_HAT",
    "createdAt": "2025-12-23T10:00:00Z",
    "updatedAt": "2025-12-23T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] The North Face Gore-Tex Bucket \"Storm Shelter\"",
    "brand": "The North Face",
    "description": "<h3>📜 Equipment Legend</h3><p>A deceptive piece of armor. While it appears to be a standard cloth helm favored by urban rangers, it is woven with the <strong>GORE-TEX® Membrane</strong>. This enchantment renders it completely impervious to rain <strong>[Waterproof]</strong> while allowing the heat from your head to escape.</p><p>Its wide brim reduces the glare of the sun (Solar Defense), and the integrated chin strap ensures it stays equipped even during high-velocity wind events. Perfect for transitioning from the subway to the summit.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>GORE-TEX® 2L:</strong> The gold standard for weather protection. Seam-sealed to prevent any moisture infiltration during monsoon seasons.</li><li><strong>Packable Structure:</strong> Can be crushed into a pocket and deployed instantly when the weather turns hostile.</li><li><strong>Adjustable Chin Strap:</strong> Prevents the equipment from being disarmed (blown away) by gale-force winds.</li></ul>",
    "category": "Apparel",
    
    "price": 2380,
    "stock": 60,
    "sku": "A-HAT-TNF-GTX-BK00",
    
    "rarity": "SR",
    "def": 30,
    "agi": 85,
    "res": 95,
    
    "ribbons": ["GORE-TEX", "Street Ready"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Colorway",
      "values": ["Black", "Utility Brown", "Olive"]
    },
    {
      "id": "opt_size",
      "name": "Size",
      "values": ["M", "L"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_mat",
      "title": "Material",
      "content": "Nylon Span Tussah GORE-TEX® Fabrics (2-Layer)"
    },
    {
      "id": "sec_size",
      "title": "Sizing",
      "content": "M (56-58cm) | L (58-60cm)"
    }
    ],
    
    "images": [
    {
      "id": "img_023_01",
      "url": "https://cdn.guildsupply.com/products/prod_023_hero.jpg",
      "isPrimary": true,
      "altText": "The North Face GTX Hat - Black"
    },
    {
      "id": "img_023_02",
      "url": "https://cdn.guildsupply.com/products/prod_023_rain.jpg",
      "isPrimary": false,
      "altText": "Water Beading on Gore-Tex Surface"
    },
    {
      "id": "img_023_03",
      "url": "https://cdn.guildsupply.com/products/prod_023_detail.jpg",
      "isPrimary": false,
      "altText": "Logo Embroidery Detail"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Headgear",
      "Gore-Tex",
      "Waterproof",
      "Urban Outdoor"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] The North Face Gore-Tex Bucket Hat - Guild Supply",
    "metaDescription": "Waterproof bucket hat featuring Gore-Tex technology. Provides sun and rain protection with breathable performance. Ideal for hiking and city use.",
    "slug": "sr-tnf-gore-tex-bucket-storm-shelter"
    }
    },
    {
    "id": "PROD_024_A_GLV",
    "createdAt": "2025-12-24T09:00:00Z",
    "updatedAt": "2025-12-24T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Black Diamond HeavyWeight ScreenTap \"Conduit Gauntlets\"",
    "brand": "Black Diamond",
    "description": "<h3>📜 Equipment Legend</h3><p>Standard gauntlets block the flow of bio-electricity, rendering ancient artifacts (smartphones) useless. The \"Conduit Gauntlets\" solve this by infusing the entire palm with <strong>U|R Powered® material</strong>.</p><p>This allows for a direct neural link between your hands and your digital maps/GPS without exposing your flesh to the biting frost. Forged from <strong>Polartec® Power Stretch® Pro</strong>, they offer high dexterity <strong>[AGI]</strong> while keeping your fingers warm during winter skirmishes.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Full-Palm Conductivity:</strong> Unlike lesser gloves that only have sensors on the fingertips, the entire palm is conductive. You can use multi-touch gestures with ease.</li><li><strong>Polartec® Armor:</strong> The fleece shell is stretchy and durable, providing a snug fit that doesn't sacrifice fine motor skills.</li><li><strong>DWR Finish:</strong> Treated with a water-repellent coating to shed light rain and snow before it freezes.</li></ul>",
    "category": "Apparel",
    
    "price": 1800,
    "stock": 45,
    "sku": "A-GLV-BD1-ST-BK00",
    
    "rarity": "SR",
    "def": 35,
    "agi": 95,
    "res": 50,
    
    "ribbons": ["Full Touch", "Polartec"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Color",
      "values": ["Black", "Smoke Grey"]
    },
    {
      "id": "opt_size",
      "name": "Size",
      "values": ["XS", "S", "M", "L", "XL"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_temp",
      "title": "Temperature Range",
      "content": "-4°C to 4°C (Active Use)"
    },
    {
      "id": "sec_mat",
      "title": "Material",
      "content": "Polartec® Power Stretch® Pro (Fleece)"
    }
    ],
    
    "images": [
    {
      "id": "img_024_01",
      "url": "https://cdn.guildsupply.com/products/prod_024_pair.jpg",
      "isPrimary": true,
      "altText": "Black Diamond ScreenTap Gloves"
    },
    {
      "id": "img_024_02",
      "url": "https://cdn.guildsupply.com/products/prod_024_phone.jpg",
      "isPrimary": false,
      "altText": "Using Smartphone with Gloves On"
    },
    {
      "id": "img_024_03",
      "url": "https://cdn.guildsupply.com/products/prod_024_palm.jpg",
      "isPrimary": false,
      "altText": "Conductive Palm Detail"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Gloves",
      "Touch Screen",
      "Winter",
      "Polartec"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Black Diamond HeavyWeight ScreenTap Gloves - Guild Supply",
    "metaDescription": "Warm fleece gloves with full-palm touchscreen compatibility. Made with Polartec Power Stretch Pro. Ideal for hiking, running, and photography in cold weather.",
    "slug": "sr-black-diamond-screentap-conduit-gauntlets"
    }
    },
    {
    "id": "PROD_025_E_PWR",
    "createdAt": "2025-12-25T09:00:00Z",
    "updatedAt": "2025-12-25T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Nitecore NB10000 Gen 2 \"Carbon Heart\"",
    "brand": "Nitecore",
    "description": "<h3>📜 Equipment Legend</h3><p>The beating heart of your electronic ecosystem. While other power banks act like heavy lead bricks in your pack, the \"Carbon Heart\" is forged from <strong>Carbon Fiber Reinforced Polymer (CFRP)</strong>—the same material used in aerospace engineering.</p><p>Weighing only 150g, it holds enough charge (10,000mAh) to resurrect your smartphone (communication device) three times. It supports PD fast charging, ensuring you spend less time tethered to a wall and more time exploring.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Featherweight Armor:</strong> At 150g, it is 40% lighter than conventional power banks. Every gram saved increases your travel speed <strong>[AGI]</strong>.</li><li><strong>IPX5 Water Resistance:</strong> Sealed against rain and snow. You can charge your gear even in damp cave environments.</li><li><strong>Low Current Mode:</strong> Double-press the button to safely charge sensitive low-power artifacts like wireless earbuds or smart bands.</li></ul>",
    "category": "Apparel",
    
    "price": 1980,
    "stock": 100,
    "sku": "E-PWR-N01-BK00",
    
    "rarity": "SR",
    "def": 60,
    "agi": 95,
    "res": 50,
    
    "ribbons": ["World's Lightest", "Carbon Fiber"],
    
    "options": [
    {
      "id": "opt_gen",
      "name": "Generation",
      "values": ["Gen 2 (Carbon Black)", "Gen 2 (Silver Limited)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_cap",
      "title": "Capacity",
      "content": "10,000mAh 3.85V (38.5Wh)"
    },
    {
      "id": "sec_out",
      "title": "Output / Input",
      "content": "USB-C (PD 20W) | USB-A (QC 18W)"
    }
    ],
    
    "images": [
    {
      "id": "img_025_01",
      "url": "https://cdn.guildsupply.com/products/prod_025_hero.jpg",
      "isPrimary": true,
      "altText": "Nitecore NB10000 Gen 2 Texture"
    },
    {
      "id": "img_025_02",
      "url": "https://cdn.guildsupply.com/products/prod_025_size.jpg",
      "isPrimary": false,
      "altText": "Size Comparison with Phone"
    },
    {
      "id": "img_025_03",
      "url": "https://cdn.guildsupply.com/products/prod_025_water.jpg",
      "isPrimary": false,
      "altText": "IPX5 Water Resistance Test"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Power Bank",
      "Ultralight",
      "Carbon Fiber",
      "Electronics"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Nitecore NB10000 Gen 2 Carbon Fiber Power Bank - Guild Supply",
    "metaDescription": "The world's lightest 10000mAh power bank. Carbon fiber shell, IPX5 waterproof, and PD 20W fast charging. Essential for ultralight backpacking.",
    "slug": "sr-nitecore-nb10000-carbon-heart"
    }
    },
    {
    "id": "PROD_026_E_TRW",
    "createdAt": "2025-12-26T09:00:00Z",
    "updatedAt": "2025-12-26T14:30:00Z",
    "isPublished": true,
    
    "title": "[R] The Deuce #2 \"Trace Eraser\" Trowel",
    "brand": "The TentLab",
    "description": "<h3>📜 Equipment Legend</h3><p>A tool of stealth for the ethical adventurer. To maintain the sanctity of the wilderness, one must bury their biological waste deep within the earth. The \"Trace Eraser\" allows you to dig a proper cathole in seconds, even in rocky soil.</p><p>Forged from <strong>7075-T6 Aluminum</strong> (aerospace grade), it weighs a mere 17g—less than a single potion vial. Its edges are serrated to cut through small roots, ensuring you leave no trace of your passing.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Featherweight Strength:</strong> Thin enough to slice through ground, strong enough to pry rocks. Do not be fooled by its fragile appearance.</li><li><strong>Dual-Use Handle:</strong> Can be used upside down to probe the soil or gain better leverage in hard-packed dirt.</li><li><strong>LNT Compliance:</strong> Essential gear for adhering to the \"Leave No Trace\" code of conduct. Respect the dungeon.</li></ul>",
    "category": "Apparel",
    
    "price": 850,
    "stock": 120,
    "sku": "E-TRW-TTL-02-RD00",
    
    "rarity": "R",
    "def": 40,
    "agi": 100,
    "res": 50,
    
    "ribbons": ["Leave No Trace", "17 Grams"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Anodized Color",
      "values": ["Fire Red", "Ice Blue", "Gold", "Black"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_spec",
      "title": "Material / Weight",
      "content": "7075-T6 Aluminum | 17g (0.6 oz)"
    },
    {
      "id": "sec_dim",
      "title": "Dimensions",
      "content": "173mm x 64mm"
    }
    ],
    
    "images": [
    {
      "id": "img_026_01",
      "url": "https://cdn.guildsupply.com/products/prod_026_colors.jpg",
      "isPrimary": true,
      "altText": "The Deuce #2 Color Collection"
    },
    {
      "id": "img_026_02",
      "url": "https://cdn.guildsupply.com/products/prod_026_hand.jpg",
      "isPrimary": false,
      "altText": "Scale Reference in Hand"
    },
    {
      "id": "img_026_03",
      "url": "https://cdn.guildsupply.com/products/prod_026_soil.jpg",
      "isPrimary": false,
      "altText": "Digging Capability Demonstration"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Sanitation",
      "Ultralight",
      "Leave No Trace",
      "Tool"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[R] The Deuce #2 Ultralight Backpacking Trowel - Guild Supply",
    "metaDescription": "The world's lightest backpacking trowel. Weighs only 17g. Made from aerospace aluminum for digging catholes and adhering to LNT principles.",
    "slug": "r-the-deuce-2-trace-eraser"
    }
    },
    {
    "id": "PROD_027_E_ORG",
    "createdAt": "2025-12-27T09:00:00Z",
    "updatedAt": "2025-12-27T14:30:00Z",
    "isPublished": true,
    
    "title": "[SR] Sea to Summit eVent \"Void Compressor\" Dry Sack",
    "brand": "Sea to Summit",
    "description": "<h3>📜 Equipment Legend</h3><p>A magical pouch that defies the laws of physics. By utilizing a base made of <strong>eVent® fabric</strong>, this sack allows air to be squeezed out through the bottom while preventing water from entering. No bulky purge valves required.</p><p>Use this to compress your sleeping bag or down armor to one-third of their original size, effectively unlocking extra <strong>[Inventory Slots]</strong> in your backpack. It is the ultimate solution for the hoarders of the guild.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>eVent® Air Permeable Base:</strong> The bottom fabric acts as a one-way gate: air goes out, water stays out. Compression is smooth and instant.</li><li><strong>30D Ultra-Sil Body:</strong> The main body is made of Cordura® nylon, providing a balance between extreme lightness and durability against friction.</li><li><strong>2000mm Waterhead:</strong> Fully taped seams and a roll-top closure ensure your critical gear remains dry even if your pack falls into a river.</li></ul>",
    "category": "Apparel",
    
    "price": 1880,
    "stock": 75,
    "sku": "E-ORG-STS-EV-M00",
    
    "rarity": "SR",
    "def": 40,
    "agi": 95,
    "res": 90,
    
    "ribbons": ["Space Saver", "Valve-Free Air Expulsion"],
    
    "options": [
    {
      "id": "opt_size",
      "name": "Size (Capacity)",
      "values": ["XS (6L to 2L)", "S (10L to 3.3L)", "M (14L to 4.5L)", "L (20L to 6.7L)"]
    },
    {
      "id": "opt_color",
      "name": "Color",
      "values": ["Grey", "Yellow (High Vis)"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_vol",
      "title": "Volume Reduction",
      "content": "Compresses from 14L to 4.5L (Size M)"
    },
    {
      "id": "sec_weight",
      "title": "Weight",
      "content": "86g (Size M)"
    }
    ],
    
    "images": [
    {
      "id": "img_027_01",
      "url": "https://cdn.guildsupply.com/products/prod_027_compressed.jpg",
      "isPrimary": true,
      "altText": "Fully Compressed State"
    },
    {
      "id": "img_027_02",
      "url": "https://cdn.guildsupply.com/products/prod_027_open.jpg",
      "isPrimary": false,
      "altText": "Open State ready for packing"
    },
    {
      "id": "img_027_03",
      "url": "https://cdn.guildsupply.com/products/prod_027_event.jpg",
      "isPrimary": false,
      "altText": "eVent Fabric Base Detail"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Compression Sack",
      "Waterproof",
      "Organization",
      "Space Saver"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[SR] Sea to Summit Ultra-Sil eVent Compression Sack - Guild Supply",
    "metaDescription": "Waterproof compression sack with air-permeable base. Compresses gear to 1/3 size. Essential for maximizing backpack space.",
    "slug": "sr-sea-to-summit-event-void-compressor"
    }
    },
    {
    "id": "PROD_028_A_ACC",
    "createdAt": "2026-01-28T09:00:00Z",
    "updatedAt": "2026-01-28T14:30:00Z",
    "isPublished": true,
    
    "title": "[R] Mystery Ranch Tech Holster \"Quick-Draw Module\"",
    "brand": "Mystery Ranch",
    "description": "<h3>📜 Equipment Legend</h3><p>A tactical expansion slot that mounts directly to your chest armor (backpack shoulder strap). The \"Quick-Draw Module\" ensures that your primary communication device or GPS is always within a split-second reach.</p><p>Constructed from the guild's standard <strong>500D CORDURA®</strong> fabric, it offers rugged protection against impact and abrasion. The internal fleece lining ensures your screen remains scratch-free, while the weather-resistant zipper acts as a seal against the elements.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Universal Mounting:</strong> Uses a secure velcro wrap system to attach to almost any backpack strap, belt, or MOLLE grid.</li><li><strong>Armored Shell:</strong> Thick foam padding on the front and back protects sensitive electronics from impact damage <strong>[DEF]</strong>.</li><li><strong>Stealth Pocket:</strong> Includes a separate front pocket for stashing small keys, cables, or memory cards.</li></ul>",
    "category": "Apparel",
    
    "price": 1300,
    "stock": 90,
    "sku": "A-ACC-MR-TH-BK00",
    
    "rarity": "R",
    "def": 60,
    "agi": 90,
    "res": 75,
    
    "ribbons": ["MOLLE Compatible", "Heavy Duty"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Tactical Color",
      "values": ["Black", "Coyote", "Foliage"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_dim",
      "title": "Internal Dimensions",
      "content": "Fits devices up to 17cm x 9cm (Most large smartphones)"
    },
    {
      "id": "sec_weight",
      "title": "Weight",
      "content": "100g"
    }
    ],
    
    "images": [
    {
      "id": "img_028_01",
      "url": "https://cdn.guildsupply.com/products/prod_028_front.jpg",
      "isPrimary": true,
      "altText": "Mystery Ranch Tech Holster - Black"
    },
    {
      "id": "img_028_02",
      "url": "https://cdn.guildsupply.com/products/prod_028_mount.jpg",
      "isPrimary": false,
      "altText": "Shoulder Strap Mounting Example"
    },
    {
      "id": "img_028_03",
      "url": "https://cdn.guildsupply.com/products/prod_028_open.jpg",
      "isPrimary": false,
      "altText": "Internal Layout and Padding"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Accessory",
      "Phone Case",
      "Tactical",
      "MOLLE"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[R] Mystery Ranch Tech Holster - Guild Supply",
    "metaDescription": "Tactical phone pouch for backpacks. Fits large smartphones. Made with 500D Cordura and fully padded for protection.",
    "slug": "r-mystery-ranch-tech-holster-quick-draw"
    }
    },
    {
    "id": "PROD_029_E_HYG",
    "createdAt": "2026-01-29T09:00:00Z",
    "updatedAt": "2026-01-29T14:30:00Z",
    "isPublished": true,
    
    "title": "[R] Matador NanoDry Trek \"Hydro Capsule\" Towel",
    "brand": "Matador",
    "description": "<h3>📜 Equipment Legend</h3><p>A full-sized drying artifact compressed into a palm-sized silicone containment unit. The \"Hydro Capsule\" utilizes advanced <strong>Nanofiber Technology</strong> to absorb 2.3 times its weight in water, stripping moisture from your body instantly.</p><p>Ideally suited for long expeditions, it features a <strong>Gold-Coat Antimicrobial Treatment</strong> that prevents the growth of fungi and bacteria, ensuring the towel remains fresh even when packed away damp.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Silicone Shell:</strong> The towel is stored in a vented silicone case equipped with a carabiner. Clip it to your pack to dry while you move <strong>[Passive Drying]</strong>.</li><li><strong>Nanofiber Matrix:</strong> The fabric is hydrophilic but releases water rapidly when wrung out, allowing for quick reuse.</li><li><strong>Gold-Coat Tech:</strong> A specialized coating that actively neutralizes odors and bacteria <strong>[High RES]</strong>.</li></ul>",
    "category": "Apparel",
    
    "price": 1280,
    "stock": 80,
    "sku": "E-HYG-MAT-ND-CH00",
    
    "rarity": "R",
    "def": 10,
    "agi": 95,
    "res": 85,
    
    "ribbons": ["Ultralight", "Antimicrobial"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Color",
      "values": ["Charcoal", "Slate Blue", "Rust"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_dim",
      "title": "Dimensions",
      "content": "Unpacked: 120 x 60 cm | Packed: 13 x 8 cm"
    },
    {
      "id": "sec_weight",
      "title": "Weight",
      "content": "142g (Including Case)"
    }
    ],
    
    "images": [
    {
      "id": "img_029_01",
      "url": "https://cdn.guildsupply.com/products/prod_029_case.jpg",
      "isPrimary": true,
      "altText": "Silicone Capsule with Carabiner"
    },
    {
      "id": "img_029_02",
      "url": "https://cdn.guildsupply.com/products/prod_029_open.jpg",
      "isPrimary": false,
      "altText": "Full Size Towel Deployed"
    },
    {
      "id": "img_029_03",
      "url": "https://cdn.guildsupply.com/products/prod_029_detail.jpg",
      "isPrimary": false,
      "altText": "Nanofiber Texture Detail"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Hygiene",
      "Ultralight",
      "Travel",
      "Compact"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "sections": [
    {
      "id": "sec_dim",
      "title": "Dimensions",
      "content": "Unpacked: 120 x 60 cm | Packed: 13 x 8 cm"
    },
    {
      "id": "sec_weight",
      "title": "Weight",
      "content": "142g (Including Case)"
    }
    ],
    
    "seo": {
    "metaTitle": "[R] Matador NanoDry Trek Towel - Guild Supply",
    "metaDescription": "Full-size nanofiber travel towel in a compact silicone case. Absorbs 2.3x its weight. Antimicrobial coating keeps it fresh.",
    "slug": "r-matador-nanodry-trek-hydro-capsule"
    }
    },
    {
    "id": "PROD_030_E_BOT",
    "createdAt": "2026-01-30T09:00:00Z",
    "updatedAt": "2026-01-30T14:30:00Z",
    "isPublished": true,
    
    "title": "[C] Nalgene Wide Mouth 1L \"Eternal Vessel\"",
    "brand": "Nalgene",
    "description": "<h3>📜 Equipment Legend</h3><p>The standard issue mana vessel for every recruit in the guild. Forged from <strong>Tritan™ Renew</strong> resin, this bottle is practically indestructible. It can be dropped from cliffs, crushed by rocks, and still hold its seal.</p><p>Its unique alchemy allows it to hold boiling water (100°C) without melting, turning it into a <strong>[Heating Artifact]</strong> to warm your sleeping bag on freezing nights. Conversely, it withstands temperatures down to -40°C without cracking.</p><h3>🛡️ Tactical Analysis</h3><ul><li><strong>Tritan™ Renew Armor:</strong> Made with 50% recycled plastic waste. BPA/BPS free, ensuring your water remains pure and tasteless.</li><li><strong>Wide Mouth Aperture:</strong> The large opening accepts ice cubes and fits most water filtration devices (like the Sawyer Squeeze) directly.</li><li><strong>Leak-Proof Seal:</strong> The cap threads are engineered to lock tight. No O-rings to lose or wear out—just pure mechanical precision.</li></ul>",
    "category": "Apparel",
    
    "price": 680,
    "stock": 300,
    "sku": "E-BOT-N01-GL00",
    
    "rarity": "Common",
    "def": 100,
    "agi": 70,
    "res": 90,
    
    "ribbons": ["Indestructible", "BPA Free"],
    
    "options": [
    {
      "id": "opt_color",
      "name": "Element Color",
      "values": ["Glow Green (Night Vision)", "Slate Blue", "Trout Green", "Clear"]
    }
    ],
    
    "sections": [
    {
      "id": "sec_cap",
      "title": "Capacity / Weight",
      "content": "1000ml (32oz) | 178g"
    },
    {
      "id": "sec_temp",
      "title": "Temperature Range",
      "content": "-40°C to 100°C"
    }
    ],
    
    "images": [
    {
      "id": "img_030_01",
      "url": "https://cdn.guildsupply.com/products/prod_030_glow.jpg",
      "isPrimary": true,
      "altText": "Nalgene Glow in the Dark Edition"
    },
    {
      "id": "img_030_02",
      "url": "https://cdn.guildsupply.com/products/prod_030_filter.jpg",
      "isPrimary": false,
      "altText": "Compatible with Water Filter"
    },
    {
      "id": "img_030_03",
      "url": "https://cdn.guildsupply.com/products/prod_030_hot.jpg",
      "isPrimary": false,
      "altText": "Using as Hot Water Bottle in Camp"
    }
    ],
    
    "videos": [],
    
    "rpgDetails": {
    "tags": [
      "Water Bottle",
      "Essential",
      "Made in USA",
      "Sustainable"
    ]
    },
    
    "pricingDetail": {
    "isSpecialOffer": false,
    "discount": {
      "value": 0,
      "type": "PERCENTAGE"
    }
    },
    
    "preOrder": {
    "isEnabled": false,
    "shippingMessage": "",
    "restriction": {
      "type": "NO_RESTRICTION",
      "limitQuantity": null
    }
    },
    
    "seo": {
    "metaTitle": "[C] Nalgene Wide Mouth 1L Water Bottle - Guild Supply",
    "metaDescription": "The iconic leak-proof water bottle. Made in USA from 50% recycled content. BPA free and withstands boiling water.",
    "slug": "c-nalgene-wide-mouth-eternal-vessel"
    }
    }
];

async function main() {
  console.log('🌱 [系統初始化] 開始搬運裝備進入公會倉庫...');

  await prisma.product.deleteMany();

  console.log('✅ 資料庫已清空，準備重新裝載。');

  console.log(`📦 正在進行 ${productsData.length} 件商品的精確對應...`);

  for (const p of productsData) {
    try {
        await prisma.product.create({
        data: {
            id: p.id,
            title: p.title, 
            description: p.description,
            brand: p.brand,
            category: p.category,
            
            price: p.price,
            stock: p.stock,
            sku: p.sku,
            isPublished: p.isPublished,

            rarity: p.rarity || 'N', 
            def: p.def || 0,
            agi: p.agi || 0,
            res: p.res || 0,

            ribbons: p.ribbons || [],
            options: p.options || [],
            sections: p.sections || [],
            images: p.images || [],
            videos: p.videos || [],
            
            rpgDetails: p.rpgDetails || {},
            pricingDetail: p.pricingDetail || {},
            preOrder: p.preOrder || {},
            seo: p.seo || {}
        }
        });
    } catch (error) {
        console.error(`❌ 匯入商品 [${p.title || p.id}] 失敗:`, error.message);
    }
  }

  console.log('==================================================');
  console.log('🏆 倉庫物資全部到位，伺服器已準備好迎接冒險者！');
  console.log('==================================================');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });