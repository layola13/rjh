/**
 * 实体类型联合 - 支持口袋、踢脚板等模型实体
 */
type SupportedEntity = HSCore.Model.Pocket | HSCore.Model.Baseboard;

/**
 * 父实体类型 - 门或洞
 */
type ParentEntity = HSCore.Model.Door | HSCore.Model.Hole;

/**
 * 宿主墙体实体
 */
type HostWall = HSCore.Model.Wall;

/**
 * 线条大小变更事务请求类
 * 
 * 该类用于处理模型实体字段变更的事务请求，特别是针对线条大小的修改。
 * 支持的实体包括口袋(Pocket)和踢脚板(Baseboard)。
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 * 
 * @example
 *