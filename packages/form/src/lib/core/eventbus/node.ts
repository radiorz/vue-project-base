export interface NodeEventBuildOptions {
  name: string;
  type: string;
}
export function buildNodeEvent({ name, type }: NodeEventBuildOptions) {
  return [name, type].join("/");
}
