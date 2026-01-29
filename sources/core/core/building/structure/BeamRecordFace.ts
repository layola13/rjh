/**
 * BeamRecordFace - 梁记录面
 * 用于记录梁面的历史状态和变更信息
 */

import { Vector3 } from 'three';
import { BeamFaceInfo, BeamFaceType } from './BeamFaceInfo';

/**
 * 梁面记录类型枚举
 */
export enum BeamRecordType {
    /** 创建 */
    Create = 'Create',
    /** 修改 */
    Modify = 'Modify',
    /** 删除 */
    Delete = 'Delete',
    /** 材质变更 */
    MaterialChange = 'MaterialChange',
    /** 几何变更 */
    GeometryChange = 'GeometryChange'
}

/**
 * 梁面记录接口
 */
export interface IBeamRecordFace {
    /** 记录ID */
    recordId: string;
    /** 记录类型 */
    recordType: BeamRecordType;
    /** 时间戳 */
    timestamp: number;
    /** 面信息 */
    faceInfo: BeamFaceInfo;
    /** 旧值（用于修改记录） */
    oldValue?: any;
    /** 新值（用于修改记录） */
    newValue?: any;
    /** 记录描述 */
    description?: string;
}

/**
 * 梁面记录类
 * 记录梁面的所有变更历史，支持撤销/重做
 */
export class BeamRecordFace implements IBeamRecordFace {
    /** 记录ID */
    public recordId: string;
    
    /** 记录类型 */
    public recordType: BeamRecordType;
    
    /** 时间戳 */
    public timestamp: number;
    
    /** 面信息 */
    public faceInfo: BeamFaceInfo;
    
    /** 旧值 */
    public oldValue?: any;
    
    /** 新值 */
    public newValue?: any;
    
    /** 记录描述 */
    public description?: string;
    
    /** 用户ID */
    public userId?: string;
    
    /** 自定义数据 */
    public userData: any = {};

    /**
     * 构造函数
     * @param faceInfo 面信息
     * @param recordType 记录类型
     */
    constructor(faceInfo: BeamFaceInfo, recordType: BeamRecordType) {
        this.recordId = this.generateRecordId();
        this.faceInfo = faceInfo.clone();
        this.recordType = recordType;
        this.timestamp = Date.now();
    }

    /**
     * 生成记录ID
     * @private
     */
    private generateRecordId(): string {
        return `record_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 设置旧值和新值
     * @param oldValue 旧值
     * @param newValue 新值
     */
    public setValues(oldValue: any, newValue: any): void {
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    /**
     * 设置描述
     * @param description 描述信息
     */
    public setDescription(description: string): void {
        this.description = description;
    }

    /**
     * 设置用户ID
     * @param userId 用户ID
     */
    public setUserId(userId: string): void {
        this.userId = userId;
    }

    /**
     * 获取变更摘要
     * @returns 变更摘要字符串
     */
    public getSummary(): string {
        const typeStr = this.recordType;
        const faceTypeStr = this.faceInfo.faceType;
        const timeStr = new Date(this.timestamp).toLocaleString();
        
        return `[${timeStr}] ${typeStr} - ${faceTypeStr}面${this.description ? ': ' + this.description : ''}`;
    }

    /**
     * 判断是否可以撤销
     * @returns 是否可撤销
     */
    public canUndo(): boolean {
        return this.recordType === BeamRecordType.Modify || 
               this.recordType === BeamRecordType.Create;
    }

    /**
     * 判断是否可以重做
     * @returns 是否可重做
     */
    public canRedo(): boolean {
        return this.recordType === BeamRecordType.Modify || 
               this.recordType === BeamRecordType.Delete;
    }

    /**
     * 克隆记录
     * @returns 新的记录对象
     */
    public clone(): BeamRecordFace {
        const record = new BeamRecordFace(this.faceInfo, this.recordType);
        record.recordId = this.recordId;
        record.timestamp = this.timestamp;
        record.oldValue = this.oldValue;
        record.newValue = this.newValue;
        record.description = this.description;
        record.userId = this.userId;
        record.userData = { ...this.userData };
        return record;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            recordId: this.recordId,
            recordType: this.recordType,
            timestamp: this.timestamp,
            faceInfo: this.faceInfo.toJSON(),
            oldValue: this.oldValue,
            newValue: this.newValue,
            description: this.description,
            userId: this.userId,
            userData: this.userData
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 梁面记录对象
     */
    public static fromJSON(json: any): BeamRecordFace {
        const faceInfo = BeamFaceInfo.fromJSON(json.faceInfo);
        const record = new BeamRecordFace(faceInfo, json.recordType);
        record.recordId = json.recordId;
        record.timestamp = json.timestamp;
        record.oldValue = json.oldValue;
        record.newValue = json.newValue;
        record.description = json.description;
        record.userId = json.userId;
        record.userData = json.userData || {};
        return record;
    }
}

/**
 * 梁面记录历史类
 * 管理梁面的所有历史记录
 */
export class BeamRecordHistory {
    /** 记录列表 */
    private records: BeamRecordFace[] = [];
    
    /** 当前记录索引 */
    private currentIndex: number = -1;
    
    /** 最大记录数 */
    private maxRecords: number = 100;

    /**
     * 构造函数
     * @param maxRecords 最大记录数
     */
    constructor(maxRecords: number = 100) {
        this.maxRecords = maxRecords;
    }

    /**
     * 添加记录
     * @param record 记录对象
     */
    public addRecord(record: BeamRecordFace): void {
        // 如果当前不在最后，删除后面的记录
        if (this.currentIndex < this.records.length - 1) {
            this.records = this.records.slice(0, this.currentIndex + 1);
        }

        // 添加新记录
        this.records.push(record);
        this.currentIndex++;

        // 限制记录数量
        if (this.records.length > this.maxRecords) {
            const removeCount = this.records.length - this.maxRecords;
            this.records = this.records.slice(removeCount);
            this.currentIndex -= removeCount;
        }
    }

    /**
     * 撤销
     * @returns 撤销的记录，如果无法撤销则返回undefined
     */
    public undo(): BeamRecordFace | undefined {
        if (this.currentIndex >= 0) {
            const record = this.records[this.currentIndex];
            this.currentIndex--;
            return record;
        }
        return undefined;
    }

    /**
     * 重做
     * @returns 重做的记录，如果无法重做则返回undefined
     */
    public redo(): BeamRecordFace | undefined {
        if (this.currentIndex < this.records.length - 1) {
            this.currentIndex++;
            return this.records[this.currentIndex];
        }
        return undefined;
    }

    /**
     * 判断是否可以撤销
     * @returns 是否可撤销
     */
    public canUndo(): boolean {
        return this.currentIndex >= 0;
    }

    /**
     * 判断是否可以重做
     * @returns 是否可重做
     */
    public canRedo(): boolean {
        return this.currentIndex < this.records.length - 1;
    }

    /**
     * 获取所有记录
     * @returns 记录数组
     */
    public getAllRecords(): BeamRecordFace[] {
        return [...this.records];
    }

    /**
     * 获取指定类型的记录
     * @param recordType 记录类型
     * @returns 记录数组
     */
    public getRecordsByType(recordType: BeamRecordType): BeamRecordFace[] {
        return this.records.filter(r => r.recordType === recordType);
    }

    /**
     * 清空历史
     */
    public clear(): void {
        this.records = [];
        this.currentIndex = -1;
    }

    /**
     * 获取当前记录
     * @returns 当前记录或undefined
     */
    public getCurrentRecord(): BeamRecordFace | undefined {
        if (this.currentIndex >= 0 && this.currentIndex < this.records.length) {
            return this.records[this.currentIndex];
        }
        return undefined;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            records: this.records.map(r => r.toJSON()),
            currentIndex: this.currentIndex,
            maxRecords: this.maxRecords
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 梁面记录历史对象
     */
    public static fromJSON(json: any): BeamRecordHistory {
        const history = new BeamRecordHistory(json.maxRecords);
        history.records = json.records.map((r: any) => BeamRecordFace.fromJSON(r));
        history.currentIndex = json.currentIndex;
        return history;
    }
}