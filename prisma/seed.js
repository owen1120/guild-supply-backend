const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const couponsData = [
  {
  "id": "PROMO_2026_CNY_DRAGON",
  "code": "DRAGON_YEAR_2026",
  "description": "Celebrate the Lunar New Year with a Guild-wide discount.",
  "discount": 15,
  "expiresAt": "2026-02-28T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "Scroll of the Dragon's Blessing",
      "rpg_flavor_text": "A rare contract signed by the Ancient Dragon, granting wealth to all adventurers who prove their worth."
    },
    "effect": {
      "type": "PERCENTAGE_OFF", 
      "max_discount_amount": 1000,
      "apply_to_shipping": false
    },
    "constraints": {
      "min_order_value": 3000,
      "target_audience": {
        "allowed_ranks": ["GOLD", "PLATINUM"],
        "excluded_users": []
      },
      "target_products": {
        "strategy": "EXCLUDE_SPECIFIC",
        "product_ids": ["PROD_030_E_BOT"], 
        "categories": []
      },
      "usage_limits": {
        "global_limit": 500,
        "per_user_limit": 1
      }
    },
    "schedule": {
      "start_at": "2026-02-01T00:00:00Z",
      "timezone": "Asia/Taipei"
    }
  }
  },
  {
  "id": "PROMO_START_JOURNEY_2026",
  "code": "START_JOURNEY_200",
  "description": "A special gift for new recruits to kickstart their adventure.",
  "discount": 200, // 固定折抵 200 Gold
  "expiresAt": "2026-12-31T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "Funding from the Novice Village",
      "rpg_flavor_text": "Every legend begins with a single gold coin. Use this to sharpen your blade and ready your spirit."
    },
    "effect": {
      "type": "FIXED_AMOUNT", 
      "max_discount_amount": 200,
      "apply_to_shipping": false
    },
    "constraints": {
      "min_order_value": 1500, // 設有基本的低消門檻，引導購買成套基礎裝備
      "target_audience": {
        "allowed_ranks": ["RECRUIT"], // 僅限新兵
        "excluded_users": []
      },
      "target_products": {
        "strategy": "ALL", // 全站商品皆可使用，增加首購轉化率
        "product_ids": [],
        "categories": []
      },
      "usage_limits": {
        "global_limit": null, // 不限量
        "per_user_limit": 1    // 每個靈魂僅限領取一次
      }
    },
    "schedule": {
      "start_at": "2026-01-01T00:00:00Z",
      "timezone": "Asia/Taipei"
    }
  }
  },
  {
  "id": "PROMO_2026_FREE_SHIP_SCOUT",
  "code": "GHOST_STEP_SHIPPING",
  "description": "Zero weight, zero shipping fee. Move like a ghost through the checkout.",
  "discount": 0, // 免運券通常 discount 設為 0，邏輯由 rulesMetadata 處理
  "expiresAt": "2026-06-30T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "Scout's Boots of Haste",
      "rpg_flavor_text": "A blessing from the Guild's logistics mages, making the heaviest load feel as light as air."
    },
    "effect": {
      "type": "FREE_SHIPPING", 
      "max_discount_amount": 150, // 補貼上限，防止偏遠地區超大件物流溢價
      "apply_to_shipping": true
    },
    "constraints": {
      "min_order_value": 800, // 較低的門檻，鼓勵購買配件或耗材
      "target_audience": {
        "allowed_ranks": ["SILVER", "GOLD", "PLATINUM"], 
        "excluded_users": []
      },
      "target_products": {
        "strategy": "ALL",
        "product_ids": [],
        "categories": ["ACCESSORIES", "CONSUMABLES"] // 優先應用於小件物品
      },
      "usage_limits": {
        "global_limit": 1000, 
        "per_user_limit": 2    // 每位資深冒險者每月限領 2 張
      }
    },
    "schedule": {
      "start_at": "2026-02-01T00:00:00Z",
      "timezone": "Asia/Taipei"
    }
  }
  },
  {
  "id": "PROMO_2026_BUY3_GET1_FOOD",
  "code": "ALCHEMIST_FEAST",
  "description": "Buy 3 rations and get the 4th one free via Guild Transmutation.",
  "discount": 0, // 此類型通常由 rulesMetadata 內的 logic 處理
  "expiresAt": "2026-05-31T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "Alchemist’s Mass Production Contract",
      "rpg_flavor_text": "Through the law of equivalent exchange, the fourth item is manifested from the ether."
    },
    "effect": {
      "type": "BUY_X_GET_Y", 
      "buy_quantity": 3,
      "get_quantity": 1,
      "max_discount_amount": 350 // 最高折抵一個單品的金額
    },
    "constraints": {
      "min_order_value": 0,
      "target_audience": {
        "allowed_ranks": ["RECRUIT", "SILVER", "GOLD", "PLATINUM"], 
        "excluded_users": []
      },
      "target_products": {
        "strategy": "INCLUDE_SPECIFIC",
        "product_ids": [],
        "categories": ["CONSUMABLES", "FOOD"] // 僅限消耗品與食物類
      },
      "usage_limits": {
        "global_limit": null, 
        "per_user_limit": 5    // 每人最多可進行 5 次轉換
      }
    },
    "schedule": {
      "start_at": "2026-03-01T00:00:00Z",
      "timezone": "Asia/Taipei"
    }
  }
  },
  {
  "id": "PROMO_2026_GEAR_MASTER_20",
  "code": "FORGE_MASTER_20",
  "description": "20% OFF on all legendary gear categories for a limited time.",
  "discount": 20,
  "expiresAt": "2026-03-15T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "The Legendary Blacksmith's Limited Offer",
      "rpg_flavor_text": "The legendary forge glows with an intense blue flame. It is the perfect moment to upgrade your arsenal."
    },
    "effect": {
      "type": "PERCENTAGE_OFF", 
      "max_discount_amount": 5000, // 考慮到高單價裝備，上限設較高，但依然設防
      "apply_to_shipping": false
    },
    "constraints": {
      "min_order_value": 5000, // 針對高單價商品設定的高門檻
      "target_audience": {
        "allowed_ranks": ["SILVER", "GOLD", "PLATINUM"], 
        "excluded_users": []
      },
      "target_products": {
        "strategy": "INCLUDE_SPECIFIC",
        "product_ids": [],
        "categories": ["BACKPACKS", "TENTS", "CLOTHING_LAYER3"] // 僅限大件高價位類別
      },
      "usage_limits": {
        "global_limit": 100, // 稀有度高，全伺服器僅限 100 名
        "per_user_limit": 1
      }
    },
    "schedule": {
      "start_at": "2026-03-01T00:00:00Z",
      "timezone": "Asia/Taipei"
    }
  }
  },
  {
  "id": "PROMO_2026_NIGHT_MARKET",
  "code": "MOONLIGHT_ONLY",
  "description": "Exclusive midnight discount for those who wander under the stars.",
  "discount": 12, // 12% OFF
  "expiresAt": "2026-04-30T04:00:00Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "Moonlight Market Pass",
      "rpg_flavor_text": "The secret merchant only opens his stall when the moon reaches its zenith. This pass grants you entry to his forbidden stash."
    },
    "effect": {
      "type": "PERCENTAGE_OFF", 
      "max_discount_amount": 800,
      "apply_to_shipping": true // 暗市額外福利：深夜免運
    },
    "constraints": {
      "min_order_value": 1000,
      "target_audience": {
        "allowed_ranks": ["SILVER", "GOLD", "PLATINUM"], 
        "excluded_users": []
      },
      "target_products": {
        "strategy": "ALL",
        "product_ids": [],
        "categories": []
      },
      "usage_limits": {
        "global_limit": 300, 
        "per_user_limit": 1
      }
    },
    "schedule": {
      "start_at": "2026-04-01T22:00:00Z",
      "end_at_override": "04:00:00", // 隱藏邏輯：僅在每日 22:00 - 04:00 有效
      "timezone": "Asia/Taipei"
    }
  }
  },
  {
  "id": "PROMO_REFERRAL_MENTOR_2026",
  "code": "MENTOR_LEGACY_500",
  "description": "Invite a new soul to the Guild. Both shall be blessed with gold.",
  "discount": 500, // 固定金額折抵
  "expiresAt": "2026-12-31T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "Mentor's Legacy",
      "rpg_flavor_text": "The path is long and dangerous. A true mentor provides not just wisdom, but the silver needed for the first step."
    },
    "effect": {
      "type": "FIXED_AMOUNT", 
      "max_discount_amount": 500,
      "apply_to_shipping": false
    },
    "constraints": {
      "min_order_value": 4000, // 較高的門檻，確保推薦帶來的也是高品質轉換
      "target_audience": {
        "allowed_ranks": ["RECRUIT"], // 僅限被邀請的新人（或首次購買者）
        "excluded_users": []
      },
      "target_products": {
        "strategy": "ALL",
        "product_ids": [],
        "categories": []
      },
      "usage_limits": {
        "global_limit": null, 
        "per_user_limit": 1,
        "referral_logic": {
          "reward_referrer": true,
          "referrer_reward_id": "REWARD_MENTOR_STORE_CREDIT" // 推薦人可獲得回饋金
        }
      }
    },
    "schedule": {
      "start_at": "2026-01-01T00:00:00Z",
      "timezone": "Asia/Taipei"
    }
  }
  },
  {
  "id": "PROMO_VIP_PLATINUM_PERK",
  "code": "ULTIMATE_BRAVE_10",
  "description": "A permanent blessing for our most distinguished Platinum members.",
  "discount": 10,
  "expiresAt": "2026-12-31T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "Privilege Scroll of the Platinum Brave",
      "rpg_flavor_text": "Your name is etched in the Guild's Hall of Fame. All merchants bow in your presence, offering their finest wares at a tribute price."
    },
    "effect": {
      "type": "PERCENTAGE_OFF", 
      "max_discount_amount": null, // 針對白金會員不設上限，展現大氣
      "apply_to_shipping": true    // 同時享有免運特權
    },
    "constraints": {
      "min_order_value": 0,        // 無低消限制，隨時可用
      "target_audience": {
        "allowed_ranks": ["PLATINUM"], 
        "excluded_users": []
      },
      "target_products": {
        "strategy": "ALL",
        "product_ids": [],
        "categories": []
      },
      "usage_limits": {
        "global_limit": null, 
        "per_user_limit": 999        // 接近無限次使用（或每月重置）
      }
    },
    "schedule": {
      "start_at": "2026-01-01T00:00:00Z",
      "timezone": "Asia/Taipei"
    }
  }
  },
  {
  "id": "PROMO_2026_RECOVERY_KEY",
  "code": "OPEN_YOUR_CHEST",
  "description": "The treasure you found is still waiting. Here is the key to claim it.",
  "discount": 100, // 固定金額 100 Gold，足以抵銷運費或提供微小甜頭
  "expiresAt": "2026-12-31T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "Key to the Forgotten Treasure Chest",
      "rpg_flavor_text": "You left something behind in the depths of the inventory. Don't let the mimics take it—use this key to secure your loot."
    },
    "effect": {
      "type": "FIXED_AMOUNT", 
      "max_discount_amount": 100,
      "apply_to_shipping": true // 賦予彈性：可用於折抵運費
    },
    "constraints": {
      "min_order_value": 1000, 
      "target_audience": {
        "allowed_ranks": ["RECRUIT", "SILVER", "GOLD", "PLATINUM"], 
        "excluded_users": []
      },
      "target_products": {
        "strategy": "ALL",
        "product_ids": [],
        "categories": []
      },
      "usage_limits": {
        "global_limit": null, 
        "per_user_limit": 1,
        "trigger_event": "ABANDONED_CART_24H" // 觸發條件：購物車遺留 24 小時
      }
    },
    "schedule": {
      "start_at": "2026-01-01T00:00:00Z",
      "timezone": "Asia/Taipei"
    }
  }
  },
  {
  "id": "PROMO_2026_BIRTHDAY_CELEBRATION",
  "code": "WORLD_TREE_GIFT_2026",
  "description": "The stars align on the day of your birth. The World Tree offers its fruits.",
  "discount": 25, // 25% OFF，年度最高規格回饋
  "expiresAt": "2026-12-31T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-02-20T00:00:00Z",
  "updatedAt": "2026-02-20T00:00:00Z",
  
  "rulesMetadata": {
    "display_info": {
      "name": "Invitation to the World Tree’s Jubilee",
      "rpg_flavor_text": "On this day, the mana of the world flows in your favor. Every merchant in the realm has been instructed to honor your presence with their finest offerings."
    },
    "effect": {
      "type": "PERCENTAGE_OFF", 
      "max_discount_amount": 3000, // 高額上限，足以購買整套登山服飾
      "apply_to_shipping": true
    },
    "constraints": {
      "min_order_value": 0, // 無門檻限制
      "target_audience": {
        "allowed_ranks": ["SILVER", "GOLD", "PLATINUM"], 
        "excluded_users": []
      },
      "target_products": {
        "strategy": "ALL",
        "product_ids": [],
        "categories": []
      },
      "usage_limits": {
        "global_limit": null, 
        "per_user_limit": 1,
        "trigger_event": "USER_BIRTH_MONTH" // 觸發條件：冒險者生月
      }
    },
    "schedule": {
      "start_at": "2026-01-01T00:00:00Z",
      "timezone": "Asia/Taipei"
    }
  }
  }
];

async function main() {
  console.log('🌱 [系統初始化] 開始搬運物資與發布任務...');
  
  await prisma.coupon.deleteMany();

  console.log('✅ 資料庫已清空。');
  
  console.log(`🎟️ 正在印製 ${couponsData.length} 張魔法契約 (優惠券)...`);  

  for (const c of couponsData) {
    try {
      await prisma.coupon.create({
        data: {
          id: c.id,
          code: c.code,
          description: c.description,
          discount: c.discount,
          expiresAt: c.expiresAt,
          isActive: c.isActive,
          rulesMetadata: c.rulesMetadata
        }
      });
    } catch (error) {
      console.error(`❌ 印製優惠券 [${c.code}] 失敗:`, error.message);
    }
  }

  console.log('==================================================');
  console.log('🏆 所有公會系統 (裝備/任務/圖書/票券) 運作正常！');
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