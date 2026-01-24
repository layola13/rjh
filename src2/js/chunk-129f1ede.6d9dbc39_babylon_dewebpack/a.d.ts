bash
   # 步骤1：美化代码
   npx prettier --write compressed.js
   
   # 步骤2：解压混淆
   npx webcrack compressed.js -o output/
   
   # 步骤3：手动添加类型