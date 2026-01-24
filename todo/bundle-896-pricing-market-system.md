# Bundle 896 定价市场系统完整架构

> **文档版本**: v1.0  
> **最后更新**: 2026-01-24  
> **Bundle**: `dist/896.fe5726b7.bundle`  
> **模块数量**: 55+  
> **核心功能**: 用户定价、市场类型、订阅续费、用户信息管理

---

## 📋 目录

1. [系统概述](#1-系统概述)
2. [核心架构](#2-核心架构)
3. [定价市场核心](#3-定价市场核心)
4. [订阅续费系统](#4-订阅续费系统)
5. [用户信息管理](#5-用户信息管理)
6. [UI组件](#6-ui组件)

---

## 1. 系统概述

### 1.1 功能定位

**Bundle 896** 是Homestyler的**定价与市场管理模块**，提供：
- 💰 **定价管理** - Pricing Market定价系统
- 🔄 **订阅续费** - Renewal Button续费按钮
- 👤 **用户信息** - User Info用户信息展示
- 📅 **到期时间** - Expire Time过期时间描述
- 🏷️ **市场类型** - Market Type Enum市场类型枚举

### 1.2 Bundle统计

```
总模块数: 55+ modules
核心组件:
- pricingmarket.js (定价市场主模块)
- renewalbutton.js (续费按钮)
- userinfoitem.js (用户信息项)
- expiretimedesc.js (过期时间描述)
- markettypeenum.js (市场类型枚举)
```

---

## 2. 核心架构

### 2.1 主要枚举类型

#### `markettypeenum` - 市场类型枚举
```typescript
// dist/896.fe5726b7.bundle_dewebpack/markettypeenum.js
enum MarketTypeEnum {
  FREE = 0,              // 免费版
  BASIC = 1,             // 基础版
  PRO = 2,               // 专业版
  BUSINESS = 3,          // 商业版
  ENTERPRISE = 4,        // 企业版
  TRIAL = 5              // 试用版
}
```

### 2.2 时间格式化模块

```typescript
// dist/896.fe5726b7.bundle_dewebpack/module_yyyy.js
const YYYY = (date: Date) => date.getFullYear().toString()

// dist/896.fe5726b7.bundle_dewebpack/module_mm.js
const MM = (date: Date) => {
  const month = date.getMonth() + 1
  return month < 10 ? `0${month}` : `${month}`
}

// dist/896.fe5726b7.bundle_dewebpack/module_dd.js
const DD = (date: Date) => {
  const day = date.getDate()
  return day < 10 ? `0${day}` : `${day}`
}
```

---

## 3. 定价市场核心

### 3.1 PricingMarket 主模块

```typescript
// dist/896.fe5726b7.bundle_dewebpack/pricingmarket.js
class PricingMarket {
  private currentPlan: MarketTypeEnum
  private expiryDate: Date
  private features: PlanFeatures
  
  constructor() {
    this.loadUserPlan()
  }
  
  loadUserPlan() {
    // 从服务器加载用户当前订阅计划
    this.currentPlan = this.fetchCurrentPlan()
    this.expiryDate = this.fetchExpiryDate()
    this.features = this.fetchPlanFeatures(this.currentPlan)
  }
  
  getPlanName(planType: MarketTypeEnum): string {
    const planNames = {
      [MarketTypeEnum.FREE]: "Free",
      [MarketTypeEnum.BASIC]: "Basic",
      [MarketTypeEnum.PRO]: "Professional",
      [MarketTypeEnum.BUSINESS]: "Business",
      [MarketTypeEnum.ENTERPRISE]: "Enterprise",
      [MarketTypeEnum.TRIAL]: "Trial"
    }
    return planNames[planType] || "Unknown"
  }
  
  getPlanPrice(planType: MarketTypeEnum, billingCycle: "monthly" | "yearly"): number {
    const pricing = {
      [MarketTypeEnum.FREE]: { monthly: 0, yearly: 0 },
      [MarketTypeEnum.BASIC]: { monthly: 9.99, yearly: 99 },
      [MarketTypeEnum.PRO]: { monthly: 29.99, yearly: 299 },
      [MarketTypeEnum.BUSINESS]: { monthly: 99.99, yearly: 999 },
      [MarketTypeEnum.ENTERPRISE]: { monthly: 299.99, yearly: 2999 },
      [MarketTypeEnum.TRIAL]: { monthly: 0, yearly: 0 }
    }
    
    return pricing[planType][billingCycle]
  }
  
  getPlanFeatures(planType: MarketTypeEnum): PlanFeatures {
    return {
      maxProjects: this.getMaxProjects(planType),
      renderQuality: this.getRenderQuality(planType),
      cloudStorage: this.getCloudStorage(planType),
      collaboration: this.hasCollaboration(planType),
      supportLevel: this.getSupportLevel(planType),
      advancedTools: this.hasAdvancedTools(planType)
    }
  }
  
  private getMaxProjects(planType: MarketTypeEnum): number {
    const limits = {
      [MarketTypeEnum.FREE]: 3,
      [MarketTypeEnum.BASIC]: 10,
      [MarketTypeEnum.PRO]: 50,
      [MarketTypeEnum.BUSINESS]: 200,
      [MarketTypeEnum.ENTERPRISE]: Infinity,
      [MarketTypeEnum.TRIAL]: 5
    }
    return limits[planType]
  }
  
  private getRenderQuality(planType: MarketTypeEnum): string {
    if (planType >= MarketTypeEnum.PRO) return "Ultra HD"
    if (planType >= MarketTypeEnum.BASIC) return "HD"
    return "Standard"
  }
  
  private getCloudStorage(planType: MarketTypeEnum): string {
    const storage = {
      [MarketTypeEnum.FREE]: "1 GB",
      [MarketTypeEnum.BASIC]: "10 GB",
      [MarketTypeEnum.PRO]: "100 GB",
      [MarketTypeEnum.BUSINESS]: "500 GB",
      [MarketTypeEnum.ENTERPRISE]: "Unlimited",
      [MarketTypeEnum.TRIAL]: "5 GB"
    }
    return storage[planType]
  }
  
  canUpgrade(targetPlan: MarketTypeEnum): boolean {
    return targetPlan > this.currentPlan
  }
  
  canDowngrade(targetPlan: MarketTypeEnum): boolean {
    return targetPlan < this.currentPlan && targetPlan !== MarketTypeEnum.FREE
  }
}

interface PlanFeatures {
  maxProjects: number
  renderQuality: string
  cloudStorage: string
  collaboration: boolean
  supportLevel: string
  advancedTools: boolean
}
```

### 3.2 过期时间描述

```typescript
// dist/896.fe5726b7.bundle_dewebpack/expiretimedesc.js
class ExpireTimeDesc {
  private expiryDate: Date
  
  constructor(expiryDate: Date) {
    this.expiryDate = expiryDate
  }
  
  getDescription(): string {
    const now = new Date()
    const diff = this.expiryDate.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days < 0) {
      return "Expired"
    } else if (days === 0) {
      return "Expires today"
    } else if (days === 1) {
      return "Expires tomorrow"
    } else if (days < 7) {
      return `Expires in ${days} days`
    } else if (days < 30) {
      const weeks = Math.floor(days / 7)
      return `Expires in ${weeks} week${weeks > 1 ? 's' : ''}`
    } else if (days < 365) {
      const months = Math.floor(days / 30)
      return `Expires in ${months} month${months > 1 ? 's' : ''}`
    } else {
      const years = Math.floor(days / 365)
      return `Expires in ${years} year${years > 1 ? 's' : ''}`
    }
  }
  
  getFormattedDate(format: string = "YYYY-MM-DD"): string {
    const yyyy = YYYY(this.expiryDate)
    const mm = MM(this.expiryDate)
    const dd = DD(this.expiryDate)
    
    return format
      .replace("YYYY", yyyy)
      .replace("MM", mm)
      .replace("DD", dd)
  }
  
  isExpiringSoon(thresholdDays: number = 7): boolean {
    const now = new Date()
    const diff = this.expiryDate.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    return days >= 0 && days <= thresholdDays
  }
  
  isExpired(): boolean {
    return new Date() > this.expiryDate
  }
}
```

---

## 4. 订阅续费系统

### 4.1 续费按钮组件

```typescript
// dist/896.fe5726b7.bundle_dewebpack/renewalbutton.js
class RenewalButton {
  private container: HTMLElement
  private currentPlan: MarketTypeEnum
  private expiryDate: Date
  private onRenewalClick: () => void
  
  constructor(options: RenewalButtonOptions) {
    this.currentPlan = options.currentPlan
    this.expiryDate = options.expiryDate
    this.onRenewalClick = options.onRenewalClick
    
    this.render()
  }
  
  render() {
    const button = document.createElement("button")
    button.className = "renewal-button"
    
    // 根据过期状态显示不同文本
    const expireDesc = new ExpireTimeDesc(this.expiryDate)
    if (expireDesc.isExpired()) {
      button.textContent = "Renew Now"
      button.classList.add("renewal-button--expired")
    } else if (expireDesc.isExpiringSoon(30)) {
      button.textContent = "Renew Early"
      button.classList.add("renewal-button--expiring-soon")
    } else {
      button.textContent = "Renew Subscription"
      button.classList.add("renewal-button--normal")
    }
    
    button.addEventListener("click", () => {
      this.handleRenewalClick()
    })
    
    this.container.appendChild(button)
  }
  
  handleRenewalClick() {
    // 显示续费对话框
    this.showRenewalDialog()
    
    if (this.onRenewalClick) {
      this.onRenewalClick()
    }
  }
  
  showRenewalDialog() {
    const dialog = new RenewalDialog({
      currentPlan: this.currentPlan,
      expiryDate: this.expiryDate,
      onConfirm: (billingCycle) => {
        this.processRenewal(billingCycle)
      }
    })
    
    dialog.show()
  }
  
  processRenewal(billingCycle: "monthly" | "yearly") {
    const pricingMarket = new PricingMarket()
    const price = pricingMarket.getPlanPrice(this.currentPlan, billingCycle)
    
    // 调用支付API
    this.initiatePayment(price, billingCycle)
  }
  
  initiatePayment(amount: number, billingCycle: string) {
    // 支付流程
    console.log(`Initiating payment: $${amount} for ${billingCycle} billing`)
  }
}

interface RenewalButtonOptions {
  container: HTMLElement
  currentPlan: MarketTypeEnum
  expiryDate: Date
  onRenewalClick?: () => void
}
```

### 4.2 续费对话框

```typescript
class RenewalDialog {
  private currentPlan: MarketTypeEnum
  private expiryDate: Date
  private onConfirm: (billingCycle: "monthly" | "yearly") => void
  private dialog: HTMLElement
  
  constructor(options: RenewalDialogOptions) {
    this.currentPlan = options.currentPlan
    this.expiryDate = options.expiryDate
    this.onConfirm = options.onConfirm
    
    this.createDialog()
  }
  
  createDialog() {
    this.dialog = document.createElement("div")
    this.dialog.className = "renewal-dialog"
    
    const pricingMarket = new PricingMarket()
    const planName = pricingMarket.getPlanName(this.currentPlan)
    const monthlyPrice = pricingMarket.getPlanPrice(this.currentPlan, "monthly")
    const yearlyPrice = pricingMarket.getPlanPrice(this.currentPlan, "yearly")
    const yearlySavings = (monthlyPrice * 12 - yearlyPrice).toFixed(2)
    
    this.dialog.innerHTML = `
      <div class="renewal-dialog__content">
        <h2>Renew ${planName} Plan</h2>
        <p>Current expiry: ${new ExpireTimeDesc(this.expiryDate).getFormattedDate()}</p>
        
        <div class="renewal-options">
          <div class="renewal-option" data-cycle="monthly">
            <h3>Monthly</h3>
            <p class="price">$${monthlyPrice}/month</p>
            <button class="select-btn">Select</button>
          </div>
          
          <div class="renewal-option renewal-option--recommended" data-cycle="yearly">
            <div class="recommended-badge">Recommended</div>
            <h3>Yearly</h3>
            <p class="price">$${yearlyPrice}/year</p>
            <p class="savings">Save $${yearlySavings}</p>
            <button class="select-btn">Select</button>
          </div>
        </div>
        
        <button class="cancel-btn">Cancel</button>
      </div>
    `
    
    this.attachEventListeners()
  }
  
  attachEventListeners() {
    const selectBtns = this.dialog.querySelectorAll(".select-btn")
    selectBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const option = (e.target as HTMLElement).closest(".renewal-option")
        const cycle = option?.getAttribute("data-cycle") as "monthly" | "yearly"
        this.handleConfirm(cycle)
      })
    })
    
    const cancelBtn = this.dialog.querySelector(".cancel-btn")
    cancelBtn?.addEventListener("click", () => {
      this.hide()
    })
  }
  
  handleConfirm(billingCycle: "monthly" | "yearly") {
    this.onConfirm(billingCycle)
    this.hide()
  }
  
  show() {
    document.body.appendChild(this.dialog)
    setTimeout(() => {
      this.dialog.classList.add("renewal-dialog--visible")
    }, 10)
  }
  
  hide() {
    this.dialog.classList.remove("renewal-dialog--visible")
    setTimeout(() => {
      document.body.removeChild(this.dialog)
    }, 300)
  }
}

interface RenewalDialogOptions {
  currentPlan: MarketTypeEnum
  expiryDate: Date
  onConfirm: (billingCycle: "monthly" | "yearly") => void
}
```

---

## 5. 用户信息管理

### 5.1 用户信息项组件

```typescript
// dist/896.fe5726b7.bundle_dewebpack/userinfoitem.js
class UserInfoItem {
  private label: string
  private value: string
  private icon?: string
  private element: HTMLElement
  
  constructor(options: UserInfoItemOptions) {
    this.label = options.label
    this.value = options.value
    this.icon = options.icon
    
    this.render()
  }
  
  render() {
    this.element = document.createElement("div")
    this.element.className = "user-info-item"
    
    let html = ""
    
    if (this.icon) {
      html += `<i class="user-info-item__icon ${this.icon}"></i>`
    }
    
    html += `
      <div class="user-info-item__content">
        <span class="user-info-item__label">${this.label}</span>
        <span class="user-info-item__value">${this.value}</span>
      </div>
    `
    
    this.element.innerHTML = html
  }
  
  updateValue(newValue: string) {
    this.value = newValue
    const valueElement = this.element.querySelector(".user-info-item__value")
    if (valueElement) {
      valueElement.textContent = newValue
    }
  }
  
  getElement(): HTMLElement {
    return this.element
  }
}

interface UserInfoItemOptions {
  label: string
  value: string
  icon?: string
}
```

### 5.2 用户信息面板

```typescript
class UserInfoPanel {
  private container: HTMLElement
  private items: Map<string, UserInfoItem>
  
  constructor(container: HTMLElement) {
    this.container = container
    this.items = new Map()
    
    this.initialize()
  }
  
  initialize() {
    const userData = this.fetchUserData()
    
    this.addItem("username", {
      label: "Username",
      value: userData.username,
      icon: "icon-user"
    })
    
    this.addItem("email", 