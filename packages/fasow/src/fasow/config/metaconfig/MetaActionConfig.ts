import type Action from "../../abm/Action";

export default interface MetaActionConfig {
  readonly id: number;
  name: string;
  probability: number;
  type: typeof Action;
}
