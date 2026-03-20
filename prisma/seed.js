const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const faqsData = [
  {
    "id": "FAQ_MEMBERSHIP_001",
    "category": "MEMBERSHIP",
    "question": "如何提升我的冒險者階級 (Membership Rank)？",
    "answer": "您可以透過在公會商店購買裝備（累積消費金額）或參與公會特定任務來獲得『貢獻值』。當貢獻值達到門檻後，系統將在 24 小時內自動為您晉升階級。",
    "isPublished": true,
    "displayOrder": 1,
    "createdAt": "2026-02-21T10:00:00Z",
    "updatedAt": "2026-02-21T10:00:00Z",
    
    "metadata": {
      "rpg_flavor_text": "傳奇並非一日成就。在公會中留下的每一枚金幣、完成的每一次遠征，都會化作您的聲望。當聲望足以震動世界樹時，更高的榮耀將降臨於您。",
      "tags": ["Rank", "Promotion", "Contribution"],
      "icon": "ra-level-up"
    }
  },
  {
    "id": "FAQ_MEMBERSHIP_002",
    "category": "MEMBERSHIP",
    "question": "不同階級的冒險者享有哪些具體特權？",
    "answer": "白金與金牌冒險者享有全站專屬折扣、優先購買權，以及進入『高等攻略庫』的權限。此外，高等級會員在公會慶典期間會收到稀有的物資補給包（專屬禮物）。",
    "isPublished": true,
    "displayOrder": 2,
    "createdAt": "2026-02-21T10:05:00Z",
    "updatedAt": "2026-02-21T10:05:00Z",
    "metadata": {
      "rpg_flavor_text": "在公會中，實力與特權並行。當您佩戴上白金徽章時，即便是在荒野最偏僻的酒館，老闆也會為您留下一張最好的桌子。",
      "tags": ["Privilege", "Rewards", "Exclusive"],
      "icon": "ra-crown"
    }
  },
  {
    "id": "FAQ_LOGISTICS_001",
    "category": "LOGISTICS",
    "question": "我的裝備物資何時會抵達？",
    "answer": "一般地區通常在下單後 1-3 個工作天內送達。若目的地在深山、離島等偏遠地區，則需額外 2-3 個工作天的行軍時間。",
    "isPublished": true,
    "displayOrder": 3,
    "createdAt": "2026-02-21T10:10:00Z",
    "updatedAt": "2026-02-21T10:10:00Z",
    "metadata": {
      "rpg_flavor_text": "公會信使鳥極其迅速，但偶爾會遇到強風或巨龍干擾。請耐心等待，您的戰力補給正在穿越邊境。",
      "tags": ["Shipping", "Delivery Time", "Courier"],
      "icon": "ra-bird-mask"
    }
  },
  {
    "id": "FAQ_LOGISTICS_002",
    "category": "LOGISTICS",
    "question": "如何追蹤我的物資運送進度？",
    "answer": "您可以點擊『我的訂單』中的『追蹤碼』，系統會連接公會的魔法路徑圖，顯示目前物流包裹的具體方位。",
    "isPublished": true,
    "displayOrder": 4,
    "createdAt": "2026-02-21T10:15:00Z",
    "updatedAt": "2026-02-21T10:15:00Z",
    "metadata": {
      "rpg_flavor_text": "每一份物資包都被施加了低階定位術。只要信標尚未熄滅，您就能在世界地圖上看見它朝您前進的軌跡。",
      "tags": ["Tracking", "Order Status"],
      "icon": "ra-radar-dish"
    }
  },
  {
    "id": "FAQ_COUPON_001",
    "category": "COUPON",
    "question": "為什麼我的優惠卷軸無法啟動？",
    "answer": "請檢查卷軸的『生效門檻』。常見原因包括：未達最低金幣門檻、不適用於特定排除裝備、或您的冒險者階級尚未達到卷軸要求的水平。",
    "isPublished": true,
    "displayOrder": 5,
    "createdAt": "2026-02-21T10:20:00Z",
    "updatedAt": "2026-02-21T10:20:00Z",
    "metadata": {
      "rpg_flavor_text": "高等魔法卷軸對使用者有著嚴苛的要求。若您的魔力（消費力）不足，強行發動卷軸可能會導致魔法失敗。",
      "tags": ["Error", "Activation", "Requirements"],
      "icon": "ra-scroll-unfurled"
    }
  },
  {
    "id": "FAQ_COUPON_002",
    "category": "COUPON",
    "question": "我可以在一次交易中使用多張卷軸嗎？",
    "answer": "基於公會的財政穩定性，除非卷軸上明確註明『可共鳴』，否則每次冒險（訂單）僅能激活一張優惠卷軸。",
    "isPublished": true,
    "displayOrder": 6,
    "createdAt": "2026-02-21T10:25:00Z",
    "updatedAt": "2026-02-21T10:25:00Z",
    "metadata": {
      "rpg_flavor_text": "兩道高階咒語若在同一個支付儀式中碰撞，可能會引發不穩定的金幣亂流。為了安全，一次請只使用一張卷軸。",
      "tags": ["Stacking", "Limit", "Usage"],
      "icon": "ra-double-team"
    }
  },
  {
    "id": "FAQ_RETURNS_001",
    "category": "RETURNS",
    "question": "收到的裝備在運送過程中損壞了，該怎麼辦？",
    "answer": "請在收到物資的 7 天內，將損壞的部位拍照並回傳至客服終端。公會將為您啟動『重鑄程序』，免費更換全新的裝備。",
    "isPublished": true,
    "displayOrder": 7,
    "createdAt": "2026-02-21T10:30:00Z",
    "updatedAt": "2026-02-21T10:30:00Z",
    "metadata": {
      "rpg_flavor_text": "即使是精良的護甲，在穿過強盜橫行的邊境時也可能受損。鐵匠鋪已經準備好熔爐，將為您再次打造神兵。",
      "tags": ["Defect", "Damaged", "Reforge"],
      "icon": "ra-broken-shield"
    }
  },
  {
    "id": "FAQ_RETURNS_002",
    "category": "RETURNS",
    "question": "裝備尺寸不合（太大或太小）可以更換嗎？",
    "answer": "沒問題。請保持裝備的原始完整度（標籤未拆、未下水），並於 7 天內提出換貨申請。我們將派信使前往回收並補給正確的尺寸。",
    "isPublished": true,
    "displayOrder": 8,
    "createdAt": "2026-02-21T10:35:00Z",
    "updatedAt": "2026-02-21T10:35:00Z",
    "metadata": {
      "rpg_flavor_text": "合身的防具是生存的第一要務。如果您穿起來像隻掉進麻袋的哥布林，請務必與我們交換合適的尺碼。",
      "tags": ["Size", "Exchange", "Policy"],
      "icon": "ra-vest"
    }
  },
  {
    "id": "FAQ_SECURITY_001",
    "category": "SECURITY",
    "question": "我忘記了我的公會通行密鑰（密碼）？",
    "answer": "請在登入頁面點選『忘記密鑰』，系統會向您的聯繫信箱發送一個暫時性的靈魂連結，引導您重新設定密碼。",
    "isPublished": true,
    "displayOrder": 9,
    "createdAt": "2026-02-21T10:40:00Z",
    "updatedAt": "2026-02-21T10:40:00Z",
    "metadata": {
      "rpg_flavor_text": "記憶被抹減術攻擊了嗎？沒關係，只要您的靈魂本質（信箱）還在，我們就能幫您奪回帳號的掌控權。",
      "tags": ["Password", "Recovery", "Security"],
      "icon": "ra-key-basic"
    }
  },
  {
    "id": "FAQ_GUIDE_001",
    "category": "GUIDE",
    "question": "如何使用攻略文章中提供的 GPX 軌跡文件？",
    "answer": "您可以將該文件匯入 Garmin、PeakVisor 或手機導航 App（如登山客、Gaia GPS）。這將為您的冒險提供精確的路徑指引與預計海拔標高。",
    "isPublished": true,
    "displayOrder": 10,
    "createdAt": "2026-02-21T10:45:00Z",
    "updatedAt": "2026-02-21T10:45:00Z",
    "metadata": {
      "rpg_flavor_text": "這是前代開拓者留下的遺產。將這些魔法標記植入您的地圖器，您便不會在迷霧森林中迷失方向。",
      "tags": ["GPX", "Navigation", "Tutorial"],
      "icon": "ra-compass"
    }
  },
  {
    "id": "FAQ_LOGISTICS_003",
    "category": "LOGISTICS",
    "question": "公會支援離島（澎湖、金門、馬祖）配送嗎？",
    "answer": "是的。我們支援跨海物流，但離島地區將視物資重量加收一筆額外的『船運補貼』金幣，且送達時間約需 5-7 個工作天。",
    "isPublished": true,
    "displayOrder": 11,
    "createdAt": "2026-02-21T10:50:00Z",
    "updatedAt": "2026-02-21T10:50:00Z",
    "metadata": {
      "rpg_flavor_text": "大海的波濤無法阻擋公會的服務。即便是在最遙遠的海之孤島，我們的商船也會準時靠岸。",
      "tags": ["Islands", "Shipping Fee", "Remote"],
      "icon": "ra-anchor"
    }
  },
  {
    "id": "FAQ_MEMBERSHIP_003",
    "category": "MEMBERSHIP",
    "question": "冒險者階級會因為一段時間沒有購買而下降嗎？",
    "answer": "目前的階級具有 12 個月的有效期。若期間內無任何貢獻（購買紀錄），您的階級將會在年度審計後下修一級，但原有的成就與勳章將永久保留。",
    "isPublished": true,
    "displayOrder": 12,
    "createdAt": "2026-02-21T10:55:00Z",
    "updatedAt": "2026-02-21T10:55:00Z",
    "metadata": {
      "rpg_flavor_text": "技能若不磨練便會生鏽。公會需要確保一線冒險者始終保持最佳狀態，但您的榮耀歷史永遠不會被抹滅。",
      "tags": ["Expiration", "Downgrade", "Policy"],
      "icon": "ra-fading-stars"
    }
  }
];

async function main() {
  console.log('🌱 [系統初始化] 開始搬運物資與發布任務...');
  
  await prisma.faq.deleteMany();

  console.log('✅ 資料庫已清空。');
  
console.log(`💬 正在釘上 ${faqsData.length} 則公會指南 (FAQ)...`);
  
  for (const faq of faqsData) {
    try {
      await prisma.faq.create({
        data: {
          id: faq.id,
          category: faq.category,
          question: faq.question,
          answer: faq.answer,
          isPublished: faq.isPublished,
          displayOrder: faq.displayOrder,
          // JSONB 欄位直接塞入
          metadata: faq.metadata
        }
      });
    } catch (error) {
      console.error(`❌ 張貼 FAQ [${faq.id}] 失敗:`, error.message);
    }
  }

  console.log('==================================================');
  console.log('🏆 所有公會系統 (包含新手指南) 運作正常！');
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